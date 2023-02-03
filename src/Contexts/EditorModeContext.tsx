import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { EditorMode } from "../EditorMode";

const EditorModeContext = createContext<EditorMode>(EditorMode.SURFACE);

export const EditorModeContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [selectedOption, setSelectedOption] = useState<EditorMode>(
		EditorMode.SURFACE
	);

	return (
		<EditorModeContext.Provider value={selectedOption}>
			{children}
		</EditorModeContext.Provider>
	);
};

export const useEditorMode = () => {
	const currentEditorModeContext = useContext(EditorModeContext);

	if (currentEditorModeContext === undefined) {
		throw new Error(
			"useEditorMode has to be used within <EditorModeContextProvider>"
		);
	}

	return currentEditorModeContext;
};
