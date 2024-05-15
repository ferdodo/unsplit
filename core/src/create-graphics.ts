import { Application, Graphics } from 'pixi.js';
import { PuzzleStorage } from "core";

export function createGraphics(
	puzzleStorage: PuzzleStorage,
	application: Application
): Graphics[] {
	const puzzle = puzzleStorage.read();

	return puzzle.pieces.map(function(piece) {
		application.stage.addChild(piece.graphic);
		return piece.graphic;
	});
}