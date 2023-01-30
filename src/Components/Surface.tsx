import {Rect} from "react-konva";
import Konva from "konva";
import _ from "lodash";
import RectConfig = Konva.RectConfig;

type SurfaceFactoryType = (
	onCreateSurface: (el: JSX.Element) => void,
	updatePreviewSurfaceData: (el: {type: any} & RectConfig) => void
) => [
	{
		onMouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void,
		onMouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void,
		onMouseUp: (e: Konva.KonvaEventObject<MouseEvent>) => void,
	},
]

export const SurfaceFactory: SurfaceFactoryType = (onCreateSurface, updatePreviewSurfaceData) => {
	let isMouseDown = false;
	let firstCreatePosition = {x: 0, y: 0};
	let secondCreatePosition = {x: 0, y: 0};

	const resolution = 50;

	const getSurface = () => <Surface
		x={firstCreatePosition.x}
		y={firstCreatePosition.y}
		width={secondCreatePosition.x - firstCreatePosition.x}
		height={secondCreatePosition.y - firstCreatePosition.y}
	/>

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
				x: firstCreatePosition.x,
				y: firstCreatePosition.y,
				width: secondCreatePosition.x - firstCreatePosition.x,
				height: secondCreatePosition.y - firstCreatePosition.y,
				type: Surface
			});
		}
	};

	const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>): void => {
		onCreateSurface(getSurface());
		isMouseDown = false;
	};

	return [
		{
			onMouseDown: onMouseDown,
			onMouseMove: onMouseMove,
			onMouseUp: onMouseUp,
		},
	]
};

type SurfaceType = {
	x: number,
	y: number,
	width: number,
	height: number,
}

const Surface = ({x, y, width, height}: SurfaceType) => {
	return (
		<Rect x={x} y={y} width={width} height={height} fill={"grey"}/>
	);
};

export default Surface;
