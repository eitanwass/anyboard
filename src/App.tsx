import React from "react";
import "./App.sass";
import Board from "./Components/Board";
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
			{/* Insert user controls here (invites, new map, etc...) */}
		</div>
	);
};

export default App;
