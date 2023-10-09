<script lang="ts">
	import ToDoItem from './ToDoItem.svelte';
	export let todoList: IToDo[];
</script>

<ul>
	{#each todoList as item}
		<ToDoItem {item} />
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 5px;
		min-width: 50%;
	}
</style>
