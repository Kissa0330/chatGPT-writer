import React, { useState, useEffect } from 'react'
import { createEditor, Transforms, Editor } from 'slate'
import { useRouter } from 'next/router';
import { Slate, Editable, withReact } from 'slate-react'
import styles from "../styles/Editor.module.css";

const App = () => {
	const { query } = useRouter()
	const { text } = query;
	const initialValue = [{
		type: "paragrah",
		children: [{ text: text as any }]
	}]
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