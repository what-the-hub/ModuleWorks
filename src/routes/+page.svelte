<script lang="ts">
	import { loadData } from '$lib/api';
	import { downloadToDoList } from '$lib/utils';
	import { onMount } from 'svelte';

	let toDos: IToDo[] = [];
	let inputValue = '';

	$: enteredText = inputValue;
	$: displayTextToEnter = inputValue.length;
	$: newToDoCount = toDos.length + 1;

	onMount(async () => {
		toDos = await loadData();
		console.log(toDos);
	});

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (inputValue.length) {
			let updatedList = toDos;

			updatedList.push({
				completed: false,
				id: newToDoCount,
				title: inputValue,
				userId: 111
			});
			toDos = updatedList;

			inputValue = '';
		}
	}

	function handleCancel() {
		inputValue = '';
	}

	function handleDownload() {
		downloadToDoList(toDos);
	}
</script>

<div class="wrapper">
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
		<ul>
			{#each toDos as item}
				<li>
					{#if item.completed}
						<p>&#40;&#10003;&#41;</p>
						<!-- (✓) completed symbol-->
					{:else}
						<p>&#40;&#126;&#41;</p>
						<!-- (~) not completed symbol-->
					{/if}
					{item.id}&#46;&#160;{item.title}
					<!-- just dot & space [. ] -->
				</li>
			{/each}
		</ul>
		<ul class="hide-on-small">
			{#each toDos as item}
				<li>
					{#if item.completed}
						<p>&#40;&#10003;&#41;</p>
						<!-- (✓) completed symbol-->
					{:else}
						<p>&#40;&#126;&#41;</p>
						<!-- (~) not completed symbol-->
					{/if}
					{item.id}&#46;&#160;{item.title}
					<!-- just dot & space [. ] -->
				</li>
			{/each}
		</ul>
	</div>

	{#if displayTextToEnter}
		<div class="text-to-enter">
			<p>You will add:</p>
			<li>
				<p>&#40;&#126;&#41;</p>
				{newToDoCount} &#46;&#160; {enteredText}
			</li>
		</div>
	{/if}
</div>

<style>
	.wrapper {
		width: 100%;
	}

	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 5px;
		min-width: 50%;
	}

	li {
		display: flex;
		flex-direction: row;
		align-items: baseline;
		gap: 10px;
	}
	li p {
		margin: 0;
	}

	.text-to-enter {
		width: 100%;
		padding: 5px;
		position: fixed;
		bottom: 0;
		border: 1px solid grey;
		background-color: azure;
		z-index: 10;
		color: red;
	}

	.todo-list {
		display: flex;
		flex-direction: row;
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
</style>
