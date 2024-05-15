import { randomFloat } from "daily-prng";
import { Puzzle, Piece, config } from "core";
import { calculateBlockDistance, findClosestBlock } from "blockwise";
import { Graphics } from "pixi.js";
import { uid } from "uid";

export function generatePuzzle(): Puzzle {
	const w = config.puzzleWidth;
	const h = config.puzzleHeight;
	const block = { x: 0, y: 0, w, h };
	const pieces: Piece[] = [];
	const piecesQty = w * h;
	const minBlockDistance = 0.25;

	while (pieces.length < piecesQty) {
		const piece = {
			id: uid(),
			graphic: new Graphics(),
			block: {
				x: randomFloat(-0.5, w - 0.5),
				y: randomFloat(-0.5, h - 0.5),
				w: 1,
				h: 1
			}
		};

		if (pieces.length) {
			const blocks = pieces.map(p => p.block);
			const closestPiece = findClosestBlock(blocks, piece.block);
			const distance = calculateBlockDistance(closestPiece, piece.block);

			if (distance < minBlockDistance) {
				continue;
			}
		}

		pieces.push(piece);
	}

	return { block, pieces };
}