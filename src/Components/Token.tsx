import {Circle} from "react-konva";
import Konva from "konva";
import CircleConfig = Konva.CircleConfig;
import {BoardObjectsMouseEventsType} from "../types";
import _ from "lodash";


type TokenFactoryType = (
	onCreateSurface: (el: JSX.Element) => void,
	updatePreviewSurfaceData: (el: {type: any} & CircleConfig) => void
) => BoardObjectsMouseEventsType


export const TokenFactory: TokenFactoryType = (onCreateSurface, updatePreviewSurfaceData) => {
	let isMouseDown = false;
	let createPosition = {x: 0, y: 0};

	const resolution = 50;

	const _getObjectData = () => ({
		x: createPosition.x + resolution / 2,
		y: createPosition.y + resolution / 2,
		radius: resolution / 2,
	});

	const getToken = () => <Token
		{..._getObjectData()}
	/>

	const onMouseDown = (e: Konva.KonvaEventObject<MouseEvent>): void => {
		isMouseDown = true;
		createPosition = {
			x: _.floor(e.evt.clientX / resolution) * resolution,
			y: _.floor(e.evt.clientY / resolution) * resolution,
		};
	};

	const onMouseMove = (e: Konva.KonvaEventObject<MouseEvent>): void => {
		createPosition = {
			x: _.floor(e.evt.clientX / resolution) * resolution,
			y: _.floor(e.evt.clientY / resolution) * resolution,
		};
		if (isMouseDown) {
			updatePreviewSurfaceData({
				type: Token,
				..._getObjectData(),
			});
		}
	};

	const onMouseUp = (e: Konva.KonvaEventObject<MouseEvent>): void => {
		onCreateSurface(getToken());
		isMouseDown = false;
	};

	return {
		onMouseDown: onMouseDown,
		onMouseMove: onMouseMove,
		onMouseUp: onMouseUp,
	}
};

const Token = ({x, y, radius}: CircleConfig) => {
	return (
		<Circle x={x} y={y} radius={radius} fill={"grey"}/>
	);
};

export default Token;