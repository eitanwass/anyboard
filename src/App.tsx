import React from "react";
import "./App.sass";
import Board from "./Components/Board";
import { EditorModeContextProvider } from "./Contexts/EditorModeContext";

const App = () => {
	const resolution = 50;

	return (
		<div className="App">
			<EditorModeContextProvider>
				<div id={"board-container"}>
					<Board resolution={resolution} />
				</div>
			</EditorModeContextProvider>
		</div>
	);
};

export default App;
