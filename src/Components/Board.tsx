import {Circle, Layer} from "react-konva";
import React, {useEffect, useState} from "react";
import _ from "lodash";
import Konva from "konva";

type boardType = {
	surfaces: JSX.Element[],
	previewSurface: JSX.Element | undefined,
	resolution?: number,
}

const Board = ({ surfaces, previewSurface, resolution = 50 }: boardType) => {
	const [backgroundDots, setBackgroundDots] = useState<{x: number, y: number}[]>([]);
	useEffect(() => {
		const dots = [];
		for (let x = 0; x < window.innerWidth; x += resolution) {
			for (let y = 0; y < window.innerWidth; y += resolution) {
				dots.push({x: x, y: y});
			}
		}
		setBackgroundDots(dots);
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
			<Layer name={"objects"}>
				{surfaces}
			</Layer>
			<Layer name={"preview-objects"}>
				{previewSurface}
			</Layer>
		</>
	);
};

export default Board;
