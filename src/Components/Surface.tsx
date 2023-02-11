import React from "react";
import { Rect } from "react-konva";
import Konva from "konva";
import _ from "lodash";
import RectConfig = Konva.RectConfig;
import { BoardObjectsMouseEventsType } from "../types";

type SurfaceFactoryType = (
	onCreateSurface: (el: JSX.Element) => void,
	updatePreviewSurfaceData: (el: { type: any } & RectConfig) => void
) => BoardObjectsMouseEventsType;

export const SurfaceFactory: SurfaceFactoryType = (
	onCreateSurface,
	updatePreviewSurfaceData
) => {
	let isMouseDown = false;
	let firstCreatePosition = { x: 0, y: 0 };
	let secondCreatePosition = { x: 0, y: 0 };

	const resolution = 50;

	const _getObjectData = () => ({
		x: firstCreatePosition.x,
		y: firstCreatePosition.y,
		width: secondCreatePosition.x - firstCreatePosition.x,
		height: secondCreatePosition.y - firstCreatePosition.y,
	});

	const getSurface = () => <Surface {..._getObjectData()} />;

	const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
		isMouseDown = true;
		firstCreatePosition = {
			x: _.floor(e.evt.clientX / resolution) * resolution,
			y: _.floor(e.evt.clientY / resolution) * resolution,
		};
	};

	const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>): void => {
		secondCreatePosition = {
			x: _.ceil(e.evt.clientX / resolution) * resolution,
			y: _.ceil(e.evt.clientY / resolution) * resolution,
		};
		if (isMouseDown) {
			updatePreviewSurfaceData({
				type: Surface,
				..._getObjectData(),
			});
		}
	};

	const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>): void => {
		if (!isMouseDown) return;
		onCreateSurface(getSurface());
		isMouseDown = false;
	};

	return {
		onMouseDown: onMouseDown,
		onMouseMove: onMouseMove,
		onMouseUp: onMouseUp,
	};
};

const Surface = ({ x, y, width, height }: RectConfig) => {
	return (
		<Rect
			key={`surface-${x},${y}-${width}/${height}`}
			x={x}
			y={y}
			width={width}
			height={height}
			fill={"grey"}
		/>
	);
};

export default Surface;
