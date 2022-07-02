<script>
	import { Pane, Splitpanes } from '$lib/.';
	import CodeArea from '$comp/extras/CodeArea.svelte';
	import Button from '$comp/extras/Button.svelte';

	let panesNumber = 3;
</script>

<h2>Adding splitters programmatically</h2>
<div>
	<Button
		on:click={() => {
			if (panesNumber >= 0) panesNumber++;
		}}>+ ADD PANE</Button
	>
	<Button
		disabled={panesNumber <= 0}
		on:click={() => {
			if (panesNumber > 0) panesNumber--;
		}}>- REMOVE PANE</Button
	>
</div>
<Splitpanes class="default-theme" style="height: 400px">
	{#each { length: panesNumber } as _, i}
		<Pane minSize={10}>
			<span>{i + 1}</span>
		</Pane>
	{/each}
</Splitpanes>
