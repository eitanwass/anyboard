import {Circle, Layer} from "react-konva";
import React, {useMemo} from "react";
import _ from "lodash";

type boardType = {
	boardItems: JSX.Element[],
	previewBoardItems: JSX.Element | undefined,
	resolution?: number,
}

const Board = ({ boardItems, previewBoardItems, resolution = 50 }: boardType) => {
	const backgroundDots = useMemo(() => {
		const dots = [];
		for (let x = 0; x < window.innerWidth; x += resolution) {
			for (let y = 0; y < window.innerWidth; y += resolution) {
				dots.push({x: x, y: y});
			}
		}
		return dots;
	}, [resolution, window.innerWidth, window.innerHeight]);

	return (
		<>
			<Layer name={"background"}>
				{
					_.map(
						backgroundDots, (dot) =>
						<Circle x={dot.x} y={dot.y} width={2} height={2} fill={"black"}/>
					)
				}
			</Layer>
			<Layer name={"board-items"}>
				{boardItems}
			</Layer>
			<Layer name={"preview-board-items"}>
				{previewBoardItems}
			</Layer>
		</>
	);
};

export default Board;
