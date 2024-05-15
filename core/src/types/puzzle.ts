import { Block } from "blockwise";
import { Piece } from "core";

export interface Puzzle {
    block: Block;
    pieces: Piece[];
}