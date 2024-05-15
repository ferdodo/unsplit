import { PuzzleStorage, Puzzle } from "core";
import { generatePuzzle } from "./generate-puzzle";
import { Subject } from "rxjs";


export function createPuzzleStorage(): PuzzleStorage {
    let puzzle: Puzzle = generatePuzzle();
    const _puzzle$: Subject<Puzzle> = new Subject();

    return {
        read: () => ({...puzzle }),
        save: (p: Puzzle) => {
            puzzle = p;
            _puzzle$.next(puzzle);
        },
        watch: () => {
            return _puzzle$.asObservable();
        }
    };
}