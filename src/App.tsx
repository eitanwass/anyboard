import React from "react";
import "./App.sass";
import Board from "./Components/Board";
import { EditorModeContextProvider } from "./Contexts/EditorModeContext";

const App = () => {
	const resolution = 50;

	return (
		<div className="App">
			<EditorModeContextProvider>
				<Board resolution={resolution} />
			</EditorModeContextProvider>
		</div>
	);
};

export default App;
