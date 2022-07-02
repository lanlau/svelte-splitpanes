<script>
	import { Pane, Splitpanes } from '$lib/.';
	import CodeArea from '$comp/extras/CodeArea.svelte';
	import Button from '$comp/extras/Button.svelte';

	function onClick() {
		visible = !visible;
	}

	let visible = true;

	
</script>

<h2>Toggle a pane on/off</h2>

<Button on:click={onClick}>{visible ? 'Hide' : 'Show'}</Button>
<Splitpanes class="default-theme" style="height: 400px">
	<Pane>
		<span>1</span>
	</Pane>
	{#if visible}
		<Pane>
			<span>2</span>
		</Pane>
	{/if}
	<Pane>
		<span>3</span>
	</Pane>
</Splitpanes>

