import React, {useCallback, useMemo, useState} from 'react';
import './App.sass';
import Board from "./Components/Board";
import {Stage} from "react-konva";
import {SurfaceFactory} from "./Components/Surface";
import _ from "lodash";
import {TokenFactory} from "./Components/Token";


type CreationOption = "Token" | "Surface";

const App = () => {
	const resolution = 50;

	const [selectedOption, setSelectedOption] = useState<CreationOption>("Surface");

	const [boardItems, setBoardItems] = useState<JSX.Element[]>([]);
	const [previewCreation, setPreviewCreation] = useState<({type: any, [key: string]: string}) | undefined>();

	const onCreateBoardItem = useCallback(
		(newBoardItem: JSX.Element) => {
			setBoardItems((current) => [...current, newBoardItem]);
		},
		[setBoardItems]
	);

	const creationPreviewInstance = useMemo(() =>
		previewCreation ?
			<previewCreation.type {..._.omit(previewCreation, ["type"])}/> :
			undefined,
		[previewCreation]
	);

	const surfaceMouseEvents = useMemo(() => SurfaceFactory(
		onCreateBoardItem,
		(e) => setPreviewCreation(e)),
		[onCreateBoardItem, setPreviewCreation]
	);

	const tokenMouseEvents = useMemo(() => TokenFactory(
		onCreateBoardItem,
		(e) => setPreviewCreation(e)),
		[onCreateBoardItem, setPreviewCreation]
	);

	return (
		<div className="App">
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseDown={(e) => tokenMouseEvents.onMouseDown(e)}
				onMouseMove={(e) => tokenMouseEvents.onMouseMove(e)}
				onMouseUp={(e) => tokenMouseEvents.onMouseUp(e)}
			>
				<Board
					boardItems={boardItems}
					previewBoardItems={creationPreviewInstance}
					resolution={resolution}
				/>
			</Stage>
		</div>
	);
};

export default App;
