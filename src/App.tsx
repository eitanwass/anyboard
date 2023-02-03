import React from "react";
import "./App.sass";
import Board from "./Components/Board";
import MetaActionsPanel from "./Components/MetaActionsPanel";
import Toolbox from "./Components/Toolbox";
import { EditorModeContextProvider } from "./Contexts/EditorModeContext";

const App = () => {
	const resolution = 50;

	return (
		<div className="App">
			<Toolbox />
			<EditorModeContextProvider>
				<Board resolution={resolution} />
			</EditorModeContextProvider>
			<MetaActionsPanel />
		</div>
	);
};

export default App;
