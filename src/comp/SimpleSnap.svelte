<script>
	import { Pane, Splitpanes } from '$lib/.';
	import CodeArea from '$comp/extras/CodeArea.svelte';

</script>

<h2>Simple snap</h2>
<p>Using snapSize on a pane makes it snap to his adjacent splitters and borders.</p>

<Splitpanes style="height: 400px">
	<Pane snapSize={10}>
		<span style="font-size: 20px;"> I have a snap size of 10% </span>
	</Pane>

	<Pane />

	<Pane />
</Splitpanes>
