import { Circle, Layer, Stage } from "react-konva";
import React, { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import { SurfaceFactory } from "./Surface";
import { TokenFactory } from "./Token";
import { useEditorMode } from "../Contexts/EditorModeContext";
import { EditorMode } from "../EditorMode";
import { BoardObjectsMouseEventsType } from "../types";

type BoardType = {
	resolution?: number;
};

type GenericPreviewItemData = {
	[key: string]: string;
	type: string;
};

const Board = ({ resolution = 50 }: BoardType) => {
	const editorMode: EditorMode = useEditorMode();

	const [boardItems, setBoardItems] = useState<JSX.Element[]>([]);
	const [previewBoardItemData, setPreviewBoardItemData] = useState<
		GenericPreviewItemData | undefined
	>();

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
				[EditorMode.MOVE]: {
					onMouseDown: () => {},
					onMouseMove: () => {},
					onMouseUp: () => {},
				},
				[EditorMode.SURFACE]: surfaceMouseEvents,
				[EditorMode.TOKEN]: tokenMouseEvents,
			}),
			[surfaceMouseEvents, tokenMouseEvents]
		);

	const backgroundDots = useMemo(() => {
		const dots = [];
		for (let x = 0; x < window.innerWidth; x += resolution) {
			for (let y = 0; y < window.innerWidth; y += resolution) {
				dots.push({ x: x, y: y });
			}
		}
		return dots;
	}, [resolution, window.innerWidth, window.innerHeight]);

	return (
		<Stage
			width={window.innerWidth}
			height={window.innerHeight}
			onMouseDown={(e) => editorModeToEvents[editorMode].onMouseDown(e)}
			onMouseMove={(e) => editorModeToEvents[editorMode].onMouseMove(e)}
			onMouseUp={(e) => editorModeToEvents[editorMode].onMouseUp(e)}
		>
			<Layer name={"background"}>
				{_.map(backgroundDots, (dot) => (
					<Circle x={dot.x} y={dot.y} width={2} height={2} fill={"black"} />
				))}
			</Layer>
			<Layer name={"board-items"}>{boardItems}</Layer>
			<Layer name={"preview-board-items"}>{creationPreviewInstance}</Layer>
		</Stage>
	);
};

export default Board;
