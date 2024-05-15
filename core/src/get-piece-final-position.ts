import { Piece, Puzzle } from "core";
import { Block } from "blockwise";

const memo = new Map<string, Block>();

export function getPieceFinalPosition(puzzle: Puzzle, piece: Piece): Block {
    const dateOfMonth = new Date().getDate();

    const key = `${piece.id}-${dateOfMonth}`;

    if (memo.has(key)) {
        return memo.get(key);
    }

    const piecePos = puzzle.pieces.findIndex(p => p.id === piece.id);
    const w = piece.block.w;
    const h = piece.block.h;
    const x = piecePos % puzzle.block.w;
    const y = Math.floor(piecePos / puzzle.block.w);
    const block = { x, y, w, h };
    memo.set(key, block);
    return block;
}