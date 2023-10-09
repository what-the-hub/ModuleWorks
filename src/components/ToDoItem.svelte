<li>
  {#if item.completed}
    <p>&#40;&#10003;&#41;</p> <!-- (✓) completed symbol-->
  {:else}
    <p>&#40;&#126;&#41;</p> <!-- (~) not completed symbol-->
  {/if}

  {item.id}&#46;&#160;{item.title} <!-- just dot & space [. ] -->
</li>

<script lang="ts">
  export let item: IToDo;
</script>
