<script lang="ts">
	import Splitpanes from '$lib/Splitpanes.svelte';
	import Pane from '$lib/Pane.svelte';
	import { HighlightSvelte } from 'svelte-highlight';
	

    export let height="600px";
	export let components:App.ComponentMeta[] = [];
	export let selectedComponent:App.ComponentMeta=null;
let newPathBefore;
let newPath;
	const loadDynamicComponent = async (path: string) => {
		newPathBefore=path
		newPath=path.replace('./src/comp/','');
		
		console.log('newPath',{newPath}) 
		const { default: Comp } = await import('../comp/'+newPath);
		DynamicComponent = Comp;
	};

	let DynamicComponent;
	$: selectedComponent && loadDynamicComponent(selectedComponent.path);

	let showCode=false;
</script>
{newPathBefore}
{newPath}
<Splitpanes id="demo" theme='demo-theme'  horizontal={false} style="height:{height}">
	<Pane size={25} snapSize={10} class="component-list">
		<ul>
			{#if components}
				{#each components as component}
					<li class:active={component === selectedComponent} on:click={() => (selectedComponent = component)}>
						{component.name}
					</li>
				{/each}
			{/if}
		</ul>
	</Pane>
	<Pane size={75} class="component-detail">
		{#if selectedComponent}
		<Splitpanes theme="demo-theme" horizontal={true}>
			<Pane size={70} class="component-demo">
				{#if selectedComponent && DynamicComponent}
					
				<label class="toggle">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
						<input type="checkbox" bind:checked={showCode} />
						<span>{showCode ? 'Hide' :'Show'} code</span>
					</label>
					<svelte:component this={DynamicComponent} />
				{/if}
			</Pane>
			{#if showCode}
			<Pane size={30} class="component-code">
				{#if selectedComponent}
					<HighlightSvelte code={selectedComponent.code} />
				{/if}
			</Pane>
			{/if}
		</Splitpanes>
		{:else}
			<h2>&lt;-- Pick a demo on the left</h2>
		{/if}
	</Pane>
</Splitpanes>

<style global lang="scss">
.component-list{
	ul {
		position: relative;
		top:1px;
		bottom:1px;
		width: 100%;
		height: 100%;
		font-size: 0.8rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		
	}
	li {
		list-style: none;
		padding: 10px;
		border-bottom: 0.1px solid #eee;
		cursor: pointer;
		color:rgba(116, 103, 103);

		&:hover{
			background-color: #838de7;
			color: #fff;
		}
		&.active {
			background-color:  rgb(74, 64, 212);
			color: #fff;
	}	
	}

}

.component-detail,.component-demo {
	display: flex;
	flex-direction: column;
	position:relative;
	width:100%;
	height:100%;
	justify-content: flex-start;
	align-items: flex-start;
	
	overflow-y: auto;
	padding-left:5px;
	padding-right:10px;
	font-size: 1rem;

	.toggle{
		position:relative;
		cursor:pointer;
		display:flex;
		justify-content: center;
		align-items:center;
		font-size:0.8rem;
		span{
			padding-left:5px;
		}
		input{
			display:none;
		}		
		&:hover{
			color:rgb(74, 64, 212)
		}
	}

	h2{
		margin-top:5px;
		margin-bottom:10px;
		padding:0;
		color:rgb(74, 64, 212)
		
	}
	p{
		padding:5px;
		margin:10px 0 10px 0;	
	}	

			
}
.component-code {
	font-size: 0.8rem;
	overflow-y: auto;
	pre {
		width: 100%;
		height: 100%;
	}
}	


//splitpanes themes

#demo.splitpanes.demo-theme{
	border:0.1px solid #eee;
}
.splitpanes.demo-theme {
		>.splitpanes__pane {
			
			background-color: #fff;
		}
		>.splitpanes__splitter {
			background-color: #eee;
			position: relative;
			min-width:0.5px;
			min-height:0.5px;
			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				transition: opacity 0.2s;
				background-color: rgb(74, 64, 212);
				opacity: 0;
				z-index: 1;
			}
			&:hover:before {
				opacity: 1;
			}
		}
}
.demo-theme {
		&.splitpanes--vertical > .splitpanes__splitter:before {
			left: 0;
			right: -1px;
			height: 100%;
			cursor: col-resize;
		}
		&.splitpanes--horizontal > .splitpanes__splitter:before {
			top: 0;
			bottom: -1px;
			width: 100%;
			cursor: row-resize;
		}
}


</style>
