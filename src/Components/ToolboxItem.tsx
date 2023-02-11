import React from "react";
import { Paper } from "@mui/material";
import classNames from "classnames";
import "./ToolboxItem.sass";
import { useEditorMode } from "../Contexts/EditorModeContext";
import { EditorMode } from "../EditorMode";

type ToolboxItemType = {
	itemName: string;
	onClick?: () => void;
};

const ToolboxItem = ({
	itemName,
	onClick = () => {
		console.debug("Clicked");
	},
}: ToolboxItemType) => {
	const { selectedEditorMode } = useEditorMode();

	return (
		<Paper
			className={classNames("toolbox-item", {
				selected: itemName === EditorMode[selectedEditorMode],
			})}
			key={itemName}
			sx={{
				":hover": {
					boxShadow: 10,
				},
			}}
			onClick={onClick}
		>
			{itemName}
		</Paper>
	);
};

export default ToolboxItem;
