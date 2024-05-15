import { Puzzle, config, screenBlock, getPieceFinalPosition } from "core";
import { mapToView, Block } from "blockwise";
import Randoma from "randoma";

export function getSeed(): string {
	const today = new Date();
	const date = today.getDate();
	const month = today.getMonth();
	const year = today.getFullYear();
	return date + "-" + month + "-" + year;
}

export function renderGraphics(puzzle: Puzzle) {
	for (const piece of puzzle.pieces) {
        const graphic = piece.graphic;
        graphic.alpha = config.pieceInitialOpacity;
        graphic.clear();
		const mappedBlock = mapToView(piece.block, puzzle.block, screenBlock);

		graphic.x = mappedBlock.x + mappedBlock.w / 2;
		graphic.y = mappedBlock.y + mappedBlock.h / 2;

		const finalPosition: Block = getPieceFinalPosition(puzzle, piece);
		graphic.moveTo(-mappedBlock.w / 2, -mappedBlock.h / 2);

		// --- Draw top line ---
		const isTopRow = finalPosition.y === 0;
		const topKey = `${ getSeed() }-vertical-${finalPosition.x}-${finalPosition.y}`;
		const randomTop = new Randoma({seed: topKey});
		
		if (isTopRow) {
			graphic.lineTo(-mappedBlock.w / 2 + mappedBlock.w, -mappedBlock.h / 2);
		} else {
			const float1 = randomTop.float();
			const float2 = randomTop.float();
			const float3 = randomTop.float();
			const float4 = randomTop.float();

			graphic.bezierCurveTo(
				-mappedBlock.w / 2 + float1 * config.bumpiness,
				-mappedBlock.h / 2 + (float2 - 0.5) * config.bumpiness,
				-mappedBlock.w / 2 + float3 * config.bumpiness,
				-mappedBlock.h / 2 + (float4 - 0.5) * config.bumpiness,
				-mappedBlock.w / 2 + mappedBlock.w,
				-mappedBlock.h / 2
			)
		}
		// --- Draw top line ---

		// --- Draw right line ---
		const isRightColumn = finalPosition.x === puzzle.block.w -1;

		if (isRightColumn) {
			graphic.lineTo(mappedBlock.w / 2, -mappedBlock.h / 2 + mappedBlock.h);
		} else {
			const rightKey = `${ getSeed() }-horizontal-${finalPosition.x+1}-${finalPosition.y}`;
			const randomRight = new Randoma({seed: rightKey});

			const float1 = randomRight.float();
			const float2 = randomRight.float();
			const float3 = randomRight.float();
			const float4 = randomRight.float();

			graphic.bezierCurveTo(
				mappedBlock.w / 2 + (float1-0.5) * config.bumpiness,
				-mappedBlock.h / 2 + float2 * config.bumpiness,
				mappedBlock.w / 2 + (float3-0.5) * config.bumpiness,
				-mappedBlock.h / 2 + float4 * config.bumpiness,
				mappedBlock.w / 2,
				-mappedBlock.h / 2 + mappedBlock.h
			);
		}
		// --- Draw right line ---

		// --- Draw bottom line ---
		const isBottomRow = finalPosition.y === puzzle.block.h - 1;

		if (isBottomRow) {
			graphic.lineTo(-mappedBlock.w / 2, -mappedBlock.h / 2 + mappedBlock.h);
		} else {
			const bottomKey = `${ getSeed() }-vertical-${finalPosition.x}-${finalPosition.y+1}`;
			const randomBottom = new Randoma({seed: bottomKey});
			const float1 = randomBottom.float();
			const float2 = randomBottom.float();
			const float3 = randomBottom.float();
			const float4 = randomBottom.float();

			graphic.bezierCurveTo(
				-mappedBlock.w / 2 + float3 * config.bumpiness,
				mappedBlock.h / 2 + (float4 - 0.5) * config.bumpiness,
				-mappedBlock.w / 2 + float1 * config.bumpiness,
				mappedBlock.h / 2 + (float2 - 0.5) * config.bumpiness,
				-mappedBlock.w / 2,
				-mappedBlock.h / 2 + mappedBlock.h
			);
		}
		// --- Draw bottom line ---

		// --- Draw left line ---
		const isLeftColumn = finalPosition.x === 0;
		
		if (isLeftColumn) {
			graphic.lineTo(-mappedBlock.w / 2, -mappedBlock.h / 2);
		} else {
			const leftKey = `${ getSeed() }-horizontal-${finalPosition.x}-${finalPosition.y}`;
			const randomLeft = new Randoma({seed: leftKey});

			const float1 = randomLeft.float();
			const float2 = randomLeft.float();
			const float3 = randomLeft.float();
			const float4 = randomLeft.float();

			graphic.bezierCurveTo(
				-mappedBlock.w / 2 + (float3-0.5) * config.bumpiness,
				-mappedBlock.h / 2 + float4 * config.bumpiness,
				-mappedBlock.w / 2 + (float1-0.5) * config.bumpiness,
				-mappedBlock.h / 2 + float2 * config.bumpiness,
				-mappedBlock.w / 2,
				-mappedBlock.h / 2
			);
		}
		// --- Draw left line ---

		graphic.fill(0x99bb10);
		graphic.stroke({ width: 2, color: 0 });
	}
}
