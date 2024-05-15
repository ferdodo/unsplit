import { Puzzle, PuzzleStorage, getPieceFinalPosition, Piece } from "core";
import { Observable, map } from "rxjs";
import { Block, isBlockPositionEqual } from "blockwise";

export function createWinObservable(puzzleStorage: PuzzleStorage): Observable<boolean> {
    return puzzleStorage.watch()
        .pipe(
            map(function(puzzle: Puzzle): boolean {
                return puzzle.pieces.every(function(piece: Piece) {
                    const finalPosition: Block = getPieceFinalPosition(puzzle, piece);
                    return isBlockPositionEqual(piece.block, finalPosition);
                });
            })
        )
}