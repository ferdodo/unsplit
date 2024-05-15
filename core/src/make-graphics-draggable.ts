import { Application, Graphics } from 'pixi.js';
import { Observable, Subject, combineLatest, of, merge, map, withLatestFrom } from "rxjs";
import { Block, mapToView } from "blockwise";
import { PuzzleStorage, config, screenBlock, Piece } from "core";

export function makeGraphicsDraggable(
    graphics: Graphics[],
    application: Application,
    puzzleStorage: PuzzleStorage
): Observable<[string, Block]> {
	let dragTarget = null;
	application.stage.eventMode = 'static';
    application.stage.hitArea = application.screen;

	for (const graphic of graphics) {
		graphic.eventMode = 'static';
		graphic.cursor = 'pointer';
		graphic.on('pointerdown', onDragStart, graphic);
	}

	application.stage.on('pointerup', onDragEnd);

	function onDragStart() {
        this.alpha = config.pieceDraggedOpacity;
        dragTarget = this;
        application.stage.setChildIndex(dragTarget, application.stage.children.length - 1);
        application.stage.on('pointermove', onDragMove);
    }

    function onDragMove(event) {
		if (dragTarget) {
            dragTarget.parent.toLocal(event.global, null, dragTarget.position);
        }
    }

	const _dragged$: Subject<Block> = new Subject();

    function onDragEnd() {
        if (dragTarget) {
            application.stage.off('pointermove', onDragMove);
            dragTarget.alpha = config.pieceInitialOpacity;

            const block = {
                x: dragTarget.x - dragTarget.width / 2,
                y: dragTarget.y - dragTarget.height / 2,
                w: 0,
                h: 0,
            }

			_dragged$.next(block);


            dragTarget = null;
        }
    }

    return _dragged$.asObservable()
        .pipe(
            withLatestFrom(
                merge(
                    of(puzzleStorage.read()),
                    puzzleStorage.watch()
                )
            ),
            map(function([dragEndPosition, puzzle]) {
                const draggedPiece = puzzle.pieces.find(p => p.graphic === dragTarget);

                return [
                    draggedPiece.id || "unknown",
                    mapToView(dragEndPosition, screenBlock, puzzle.block)
                ]
            })
        )
}