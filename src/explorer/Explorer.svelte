<script lang="ts">
	import Splitpanes from '$lib/Splitpanes.svelte';
	import Pane from '$lib/Pane.svelte';
	import CodeArea from '$comp/extras/CodeArea.svelte';
	

    export let height="600px";
	export let components:App.ComponentMeta[] = [];
	export let selectedComponent:App.ComponentMeta=null;
	
	
	const loadDynamicComponent = async (path: string) => {
		//dynamic import plugin requires a relative path, so we clean the path
		const newPath=path.replace('./src/comp/','');
		try{
			//use the newPath to build a relative path
			//setting "../comp" statically in the import ensure the plugin only preload files in this dir
			const { default: Comp } = await import('../comp/'+newPath);
			DynamicComponent = Comp;
		}catch(error){
			console.error(error)
		}
		
	};

	let DynamicComponent;
	$: selectedComponent && loadDynamicComponent(selectedComponent.path);

	let showCode=false;
</script>

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
					<CodeArea id="{selectedComponent.name}" code={selectedComponent.code} />
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
		border-bottom: 0.1px solid #fff;
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
	background-color:#fff!important;
	overflow-y: auto;
	overflow-x:auto;
	margin-right:10px;
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


//splitpanes themes


.splitpanes.demo-theme {
		>.splitpanes__pane {
			background-color: #f2f2f2;
		}
		>.splitpanes__splitter {
			background-color: #fff;
			box-sizing: border-box;
			position: relative;
			flex-shrink: 0;
			&:before,
			&:after {
				content: '';
				position: absolute;
				top: 50%;
				left: 50%;
				background-color: rgba(0, 0, 0, 0.15);
				transition: background-color 0.3s;
			}
			&:hover:before,
			&:hover:after {
				background-color: rgba(0, 0, 0, 0.25);
			}
			&:first-child {
				cursor: auto;
			}
		}
}
.demo-theme {
		&.splitpanes .splitpanes .splitpanes__splitter {
			z-index: 1;
		}
		&.splitpanes--vertical > .splitpanes__splitter,
		>.splitpanes--vertical > .splitpanes__splitter {
			width: 7px;
			border-left: 1px solid #eee;
			margin-left: -1px;
			cursor: col-resize;
			&:before,
			&:after {
				transform: translateY(-50%);
				width: 1px;
				height: 30px;
			}
			&:before {
				margin-left: -2px;
			}
			&:after {
				margin-left: 1px;
			}
		}
		&.splitpanes--horizontal > .splitpanes__splitter,
		>.splitpanes--horizontal > .splitpanes__splitter {
			height: 7px;
			border-top: 1px solid #eee;
			margin-top: -1px;
			cursor: row-resize;
			&:before,
			&:after {
				transform: translateX(-50%);
				width: 30px;
				height: 1px;
			}
			&:before {
				margin-top: -2px;
			}
			&:after {
				margin-top: 1px;
			}
		}
	}






















</style>
