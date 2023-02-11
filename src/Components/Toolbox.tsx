import React from "react";
import ToolboxItem from "./ToolboxItem";
import "./Toolbox.sass";
import { useEditorMode } from "../Contexts/EditorModeContext";
import { EditorMode } from "../EditorMode";

const Toolbox = () => {
	const { setSelectedEditorMode } = useEditorMode();

	return (
		<div className={"toolbox-container"}>
			<ToolboxItem
				itemName="SURFACE"
				onClick={() => setSelectedEditorMode(EditorMode.SURFACE)}
			/>
			<ToolboxItem
				itemName="TOKEN"
				onClick={() => setSelectedEditorMode(EditorMode.TOKEN)}
			/>
			<ToolboxItem itemName="3" />
			<ToolboxItem itemName="4" />
			<ToolboxItem itemName="5" />
		</div>
	);
};

export default Toolbox;
