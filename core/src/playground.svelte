<script lang="ts">
	import { createPuzzleStorage, createPixiApplication, createWinObservable, share } from "core";
	import { onDestroy, onMount } from "svelte";

	const puzzleStorage = createPuzzleStorage();
	const win$ = createWinObservable(puzzleStorage);
	let puzzle = puzzleStorage.read();
	const puzzleObservable = puzzleStorage.watch()
	const sub = puzzleObservable.subscribe(value => puzzle = value);
	let win = false;
	const winSub = win$.subscribe(value => win = value);
	let canvasContainer;

	onMount(async function() {
		const app = await createPixiApplication(puzzleStorage);
		canvasContainer.appendChild(app.canvas);
	});

	onDestroy(() => sub.unsubscribe());
	onDestroy(() => winSub.unsubscribe());
</script>

<cookies-panel panel-title="unsplit">
	<div bind:this={canvasContainer}></div>

	{#if win}
		<cookies-p style="text-align:center">
			🎉 C'est gagné pour aujourd'hui ! 🥳 <br>

			<cookies-button on:click={share} title="Copier dans le presse-papier"> Partager </cookies-button>
		</cookies-p>
	{/if}
</cookies-panel>
