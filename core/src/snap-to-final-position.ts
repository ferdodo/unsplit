import { Piece, Puzzle, getPieceFinalPosition, config } from "core";
import { Block, calculateBlockDistance } from "blockwise";

export function snapToFinalPosition(puzzle: Puzzle, piece: Piece): Piece {
    const finalPosition: Block = getPieceFinalPosition(puzzle, piece);
    const blockDistance = calculateBlockDistance(piece.block, finalPosition);
    const puzzleHypothenus = Math.sqrt(Math.pow(puzzle.block.w, 2) + Math.pow(puzzle.block.h, 2));
    const isCloseToFinalPosition = blockDistance < puzzleHypothenus * config.snapDistance;

    if (isCloseToFinalPosition) {
        return {
            ...piece,
            block: finalPosition,
        };
    }

    return piece;
}