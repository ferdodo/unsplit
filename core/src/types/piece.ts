
import { Graphics } from 'pixi.js';
import { Block } from 'blockwise';

export interface Piece {
    id: string;
    graphic: Graphics;
    block: Block;
}