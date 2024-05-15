import { Observable } from "rxjs";
import { Puzzle } from "core";

export interface PuzzleStorage {
    read: () => Puzzle;
    save: (puzzle: Puzzle) => void;
    watch: () => Observable<Puzzle>;
}