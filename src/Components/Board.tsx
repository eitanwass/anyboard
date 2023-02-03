import { Circle, Layer, Stage } from "react-konva";
import Konva from "konva";
import React, { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import { SurfaceFactory } from "./Surface";
import { TokenFactory } from "./Token";
import { useEditorMode } from "../Contexts/EditorModeContext";
import { EditorMode } from "../EditorMode";
import { BoardObjectsMouseEventsType } from "../types";
import { Vector2d } from "konva/lib/types";

type BoardType = {
	resolution: number;
};

type GenericPreviewItemData = {
	[key: string]: string;
	type: string;
};

Konva.dragButtons = [1];
Konva.dragDistance = 1;

const Board = ({ resolution }: BoardType) => {
	const editorMode: EditorMode = useEditorMode();

	const [stagePosition, setStagePosition] = useState<Vector2d>({ x: 0, y: 0 });

	const [boardItems, setBoardItems] = useState<JSX.Element[]>([]);
	const [previewBoardItemData, setPreviewBoardItemData] = useState<
		GenericPreviewItemData | undefined
	>();

	// useEffect(() => {
	// 	window.addEventListener("scroll", (e) => {
	// 		console.debug(e);
	// 	});
	// }, []);

	const onCreateBoardItem = useCallback(
		(newBoardItem: JSX.Element) => {
			setBoardItems((current) => [...current, newBoardItem]);
		},
		[setBoardItems]
	);

	const creationPreviewInstance = useMemo(
		() =>
			previewBoardItemData ? (
				<previewBoardItemData.type
					{..._.omit(previewBoardItemData, ["type"])}
				/>
			) : undefined,
		[previewBoardItemData]
	);

	const surfaceMouseEvents = useMemo(
		() => SurfaceFactory(onCreateBoardItem, (e) => setPreviewBoardItemData(e)),
		[onCreateBoardItem, setPreviewBoardItemData]
	);

	const tokenMouseEvents = useMemo(
		() => TokenFactory(onCreateBoardItem, (e) => setPreviewBoardItemData(e)),
		[onCreateBoardItem, setPreviewBoardItemData]
	);

	const editorModeToEvents: Record<EditorMode, BoardObjectsMouseEventsType> =
		useMemo(
			() => ({
				[EditorMode.SURFACE]: surfaceMouseEvents,
				[EditorMode.TOKEN]: tokenMouseEvents,
			}),
			[surfaceMouseEvents, tokenMouseEvents]
		);

	const backgroundDots = useMemo(() => {
		const dots = [];
		const dotRadius = 2;
		const dotColor = "rgba(0, 0, 0, 0.2)";
		const firstDot = {
			x: Math.ceil(-stagePosition.x / resolution) * resolution,
			y: Math.ceil(-stagePosition.y / resolution) * resolution,
		};
		const lastDot = {
			x: firstDot.x + window.innerWidth,
			y: firstDot.y + window.innerHeight,
		};

		for (let y = firstDot.y; y < lastDot.y; y += resolution) {
			for (let x = firstDot.x; x < lastDot.x; x += resolution) {
				dots.push(
					<Circle
						key={x + lastDot.x * y}
						x={x}
						y={y}
						radius={dotRadius}
						fill={dotColor}
					/>
				);
			}
		}
		return dots;
	}, [resolution, window.innerWidth, window.innerHeight, stagePosition]);

	return (
		<Stage
			container={"board-container"}
			width={window.innerWidth}
			height={window.innerHeight}
			// onMouseDown={(e) => editorModeToEvents[editorMode].onMouseDown(e)}
			// onMouseMove={(e) => editorModeToEvents[editorMode].onMouseMove(e)}
			// onMouseUp={(e) => editorModeToEvents[editorMode].onMouseUp(e)}
			draggable
			onDragMove={({ currentTarget }) => {
				setStagePosition(currentTarget.absolutePosition());
			}}
			onWheel={({ evt, currentTarget }) => {
				const scrollSize = evt.deltaY / 4;
				const delta = evt.shiftKey
					? { x: scrollSize, y: 0 }
					: { x: 0, y: scrollSize };
				currentTarget.setAbsolutePosition({
					x: currentTarget.absolutePosition().x - delta.x,
					y: currentTarget.absolutePosition().y - delta.y,
				});
				setStagePosition(currentTarget.absolutePosition());
			}}
		>
			<Layer name={"background"}>{backgroundDots}</Layer>
			<Layer name={"board-items"}>{boardItems}</Layer>
			<Layer name={"preview-board-items"}>{creationPreviewInstance}</Layer>
		</Stage>
	);
};

export default Board;
