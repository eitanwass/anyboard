import React, {useState} from 'react';
import './App.sass';
import Board from "./Components/Board";


type CreationOption = "Token" | "Surface";

const App = () => {
	const resolution = 50;

	const [selectedOption, setSelectedOption] = useState<CreationOption>("Surface");

	return (
		<div className="App">
			<Board
				resolution={resolution}
			/>
		</div>
	);
};

export default App;
