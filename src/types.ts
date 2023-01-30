import Konva from "konva";

export type BoardObjectsMouseEventsType = {
	onMouseDown: (e: Konva.KonvaEventObject<MouseEvent>) => void,
	onMouseMove: (e: Konva.KonvaEventObject<MouseEvent>) => void,
	onMouseUp: (e: Konva.KonvaEventObject<MouseEvent>) => void,
}
