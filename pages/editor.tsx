import React, { useState, useEffect } from 'react'
import { createEditor, Transforms, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import styles from "../styles/Editor.module.css";
type initialValue = [{
	type: string,
	children: [{ text: string }]
}]

const App = () => {
	const [initialValue, setInitialValue] = useState<initialValue>([{ type: "paragrah", children: [{ text: "test" }] }]);
	const [editor] = useState(() => withReact(createEditor()))
	return (
		<>
			<Slate editor={editor} value={initialValue}>
				<Editable />
			</Slate>
		</>
	)
}

export default App