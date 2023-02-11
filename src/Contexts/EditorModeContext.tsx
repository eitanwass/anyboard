import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { EditorMode } from "../EditorMode";

type EditorModeContextType = {
	selectedEditorMode: EditorMode;
	setSelectedEditorMode: React.Dispatch<React.SetStateAction<EditorMode>>;
};

const EditorModeContext = createContext<EditorModeContextType>({
	selectedEditorMode: EditorMode.SURFACE,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setSelectedEditorMode: () => {},
});

export const EditorModeContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [selectedEditorMode, setSelectedEditorMode] = useState<EditorMode>(
		EditorMode.SURFACE
	);

	return (
		<EditorModeContext.Provider
			value={{
				selectedEditorMode: selectedEditorMode,
				setSelectedEditorMode: setSelectedEditorMode,
			}}
		>
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
