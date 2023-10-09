<div class="wrapper">
  <h1>ModuleWorks Recruitment Test</h1>
  <form on:submit={handleSubmit}>
    <div>
      <label for="textInput">Add ToDo Item:</label>
      <input type="text" id="textInput" bind:value={inputValue} />
    </div>
    <div>
      <button type="submit">Add ToDo</button>
      <button type="button" on:click={handleCancel}>Cancel</button>
    </div>
  </form>
  
  <ul>
    {#each toDos as item}
      <li>
        {#if item.completed}
          <p>&#40;&#10003;&#41;</p>
        {:else}
          <p>&#40;&#126;&#41;</p>
        {/if}
        {item.id}&#46;&#160;{item.title}
      </li>
    {/each}
  </ul>
  
  
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


<script lang="ts">
	import { loadData } from "$lib/api";
  import { onMount } from "svelte";

  let toDos: IToDo [] = []
  let inputValue = '';

  $: enteredText = inputValue;
  $: displayTextToEnter = inputValue.length;
  $: newToDoCount = toDos.length + 1;


  onMount(async () => {
    toDos = await loadData ();
    console.log(toDos);
  });

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log('Submitted value:', inputValue);
  }

  function handleCancel() {
    inputValue = '';
  }

</script>

<style>
.wrapper {
  width: 100%;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

li {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 10px;
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
</style>
