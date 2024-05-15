import { Application, Graphics } from 'pixi.js';
import { Observable, tap } from "rxjs";
import { Block, mapToView } from "blockwise";

import {
	PuzzleStorage,
	renderGraphics,
	makeGraphicsDraggable,
	createGraphics,
	config,
	screenBlock,
	Puzzle,
	snapToFinalPosition,
	incrementMoveCount
} from "core";

export async function createPixiApplication(puzzleStorage: PuzzleStorage): Promise<Application> {
	const application = new Application();

	await application.init({
		width: config.playgroundWidthPx,
		height: config.playgroundHeightPx,
		antialias: true,
		backgroundColor: 0x1099bb,
	});

	let puzzle = puzzleStorage.read();
	const puzzleGraphic = new Graphics();
	const mappedPuzzleBlock = mapToView(puzzle.block, puzzle.block, screenBlock);
	puzzleGraphic.rect(mappedPuzzleBlock.x, mappedPuzzleBlock.y, mappedPuzzleBlock.w, mappedPuzzleBlock.h);
	puzzleGraphic.fill(0x1099bb);
	puzzleGraphic.stroke({ width: 2, color: 0 });
	application.stage.addChild(puzzleGraphic);

	const graphics = createGraphics(puzzleStorage, application);
	renderGraphics(puzzle);

	const dragEnd$: Observable<[string, Block]> = makeGraphicsDraggable(graphics, application, puzzleStorage);

	dragEnd$.subscribe(function([id, block]) {
		incrementMoveCount();
		const currentPuzzle = puzzleStorage.read();

		const newPuzzle: Puzzle = {
			...currentPuzzle,
			pieces: currentPuzzle.pieces.map(function(piece) {
				if (piece.id === id) {
					return snapToFinalPosition(currentPuzzle, {
						...piece,
						block: {
							...piece.block,
							x: block.x,
							y: block.y
						},
					});
				}

				return piece;
			}),
		};

		puzzleStorage.save(newPuzzle);
	});

	puzzleStorage.watch()
		.pipe(
			tap(p => renderGraphics(p))
		)
		.subscribe();

	return application;
}