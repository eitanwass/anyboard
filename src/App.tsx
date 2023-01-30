import React, {useCallback, useMemo, useState} from 'react';
import './App.sass';
import Board from "./Components/Board";
import {Stage} from "react-konva";
import {SurfaceFactory} from "./Components/Surface";
import _ from "lodash";


type CreationOption = "Token" | "Surface";

const App = () => {
	const resolution = 50;

	const [selectedOption, setSelectedOption] = useState<CreationOption>("Surface");

	const [previewCreation, setPreviewCreation] = useState<({type: any, [key: string]: string}) | undefined>();
	const [surfaces, setSurfaces] = useState<JSX.Element[]>([]);

	const onCreateSurface = useCallback(
		(newSurface: JSX.Element) => {
			setSurfaces((current) => [...current, newSurface]);
		},
		[setSurfaces]
	);

	const previewCreationObject = useMemo(() =>
		previewCreation ?
			<previewCreation.type {..._.omit(previewCreation, ["type"])}/> :
			undefined,
		[previewCreation]
	);

	const [mouseEvents] = useMemo(() => SurfaceFactory(
		onCreateSurface,
		(e) => setPreviewCreation(e)),
		[onCreateSurface, setPreviewCreation]
	);

	return (
		<div className="App">
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseDown={(e) => mouseEvents.onMouseDown(e)}
				onMouseMove={(e) => mouseEvents.onMouseMove(e)}
				onMouseUp={(e) => mouseEvents.onMouseUp(e)}
			>
				<Board
					surfaces={surfaces}
					previewSurface={previewCreationObject}
					resolution={resolution}
				/>
			</Stage>
		</div>
	);
};

export default App;
