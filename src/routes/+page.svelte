<script lang="ts">
	import { loadData } from '$lib/api';
	import { downloadToDoList } from '$lib/utils';
	import { onMount } from 'svelte';
  import ToDoList from '../components/ToDoList.svelte';

	let todoList: IToDo[] = [];
	let inputValue = '';

	$: enteredText = inputValue;
	$: displayTextToEnter = inputValue.length;
	$: newToDoCount = todoList.length + 1;

	onMount(async () => {
		todoList = await loadData();
	});

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (inputValue.length) {
			let updatedList = todoList;

			updatedList.push({
				completed: false,
				id: newToDoCount,
				title: inputValue,
				userId: 1
			});
			todoList = updatedList;

			inputValue = '';
		}
	}

	function handleCancel() {
		inputValue = '';
	}

	function handleDownload() {
		downloadToDoList(todoList);
	}
</script>

<div>
	<h1>ToDo App</h1>
	<p>You can easily add new ToDo item by entering title and pressing Add ToDo button.</p>
	<p>
		By pressing "Download ToDo Items in .txt" button you can download txt file with all updated ToDo
		items.
	</p>

	<form on:submit={handleSubmit}>
		<label for="textInput">Add ToDo Item:</label>
		<input type="text" id="textInput" bind:value={inputValue} />
		<button type="submit">Add ToDo</button>
		<button type="button" on:click={handleCancel}>Cancel</button>
	</form>
	<button on:click={handleDownload}>Download ToDo Items in .txt</button>

	<div class="todo-list">
    <div>
      <ToDoList {todoList}/>
    </div>
    <div class="hide-on-small">
      <ToDoList {todoList}/>
    </div>
	</div>

	{#if displayTextToEnter}
		<div class="text-to-enter">
			<li>
        <p>Adding:</p>
				<p>&#40;&#126;&#41;</p>
				{newToDoCount} &#46;&#160; {enteredText}
			</li>
		</div>
	{/if}
</div>

<style>
	.text-to-enter {
		color: red;
	}

	.todo-list {
		display: flex;
		flex-direction: row;
    gap: 50px;
	}

  form {
		border: 1px silver solid;
		padding: 10px;
		display: flex;
		flex-direction: row;
		gap: 20px;
	}
	form input {
		flex: 1;
	}

	@media (max-width: 920px) {
		.hide-on-small {
			display: none;
		}
	}

  :global(li) {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 10px;
  }

  :global(li p) {
		margin: 0;
  }
</style>
