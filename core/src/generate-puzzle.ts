import { randomFloat, randomInteger } from "daily-prng";
import { Puzzle, Piece, config } from "core";
import { calculateBlockDistance, findClosestBlock, isBlockIncluding } from "blockwise";
import { Graphics } from "pixi.js";
import { uid } from "uid";

export function generatePuzzle(): Puzzle {
	const w = randomInteger(config.puzzleMinWidth, config.puzzleMaxWidth + 1);
	const h = randomInteger(config.puzzleMinHeight, config.puzzleMaxHeight + 1);
	const block = { x: 0, y: 0, w, h };
	const margin = 1;

	const blockWithMargin = {
		x: block.x - margin,
		y: block.y - margin,
		w: block.w + margin + margin,
		h: block.h + margin + margin,
	};

	const pieces: Piece[] = [];
	const piecesQty = w * h;
	const minBlockDistance = 0.7;
	let clearInsertAttemps = 0;

	while (pieces.length < piecesQty) {
		const piece = {
			id: uid(),
			graphic: new Graphics(),
			block: {
				x: randomFloat(-0.5 - margin, w - 0.5 + margin),
				y: randomFloat(-0.5 - margin, h - 0.5 + margin),
				//x: pieces.length % w,
				//y: Math.floor(pieces.length / w),
				w: 1,
				h: 1
			}
		};

		if (isBlockIncluding(blockWithMargin, piece.block) && clearInsertAttemps < 5000) {
			clearInsertAttemps++;
			continue;
		}

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
