import { config } from "core";
import { Block } from "blockwise";

export const screenBlock: Block = {
    x: config.playgroundWidthPx * config.margin,
    y: config.playgroundHeightPx * config.margin,
    w: config.playgroundWidthPx * (1 - config.margin * 2),
    h: config.playgroundHeightPx * (1 - config.margin * 2)
};
