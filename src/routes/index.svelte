<script lang="ts">
	import Explorer from "../explorer/Explorer.svelte";

	export let components:App.ComponentMeta[] = [];
</script>

<h1>Svelte-Splitpane demo</h1>

<a href="https://github.com/orefalo/svelte-splitpanes">https://github.com/orefalo/svelte-splitpanes</a>

<h2>Features</h2>

<ul>
	<li>Size is less than 4 kb</li>
	<li>Support both dynamic horizontal and vertical splits</li>
	<li>Support defaults, min and max sizes</li>
	<li>Support multiple splits</li>
	<li>Support lifecyle events</li>
	<li>Support custom divider size or overlay</li>
	<li>Support splitter pane pushing</li>
	<li>Support RTL rendering with auto-detection</li>
	<li>Support first splitter on/off</li>
	<li>Support pane toggle</li>
	<li>Support edge snapping</li>
	<li>Support programmatic resizing</li>
	<li>Support programmatic splitter add/remove</li>
	<li>Support for legacy browser such as IE 11</li>
	<li>Support for touch devices</li>
	<li>Sveltekit & Typescript friendly</li>
</ul>
<h2>Demos</h2>
<Explorer {components} height="600px"/>