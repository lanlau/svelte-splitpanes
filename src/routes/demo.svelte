<script lang="ts">
 import Explorer from "../explorer/Explorer.svelte";
 export let components:App.ComponentMeta[]
</script>
<h2>Demos</h2>
<Explorer {components}/>