import React, { useState, useEffect } from 'react'
import { createEditor, Transforms, Editor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

type Prop = {
	text: string
}

type initialValue = [{
	type: string,
	children: [{ text: string }]
}]

const App = (props: Prop) => {
	const [initialValue, setInitialValue] = useState<initialValue>();
	const [editor] = useState(() => withReact(createEditor()))
	useEffect(() => {
		setInitialValue([{ type: "paragrah", children: [{ text: props.text }] }])
	}, [props.text])
	return (
		<>
			{initialValue && <Slate editor={editor} value={initialValue}>
				<Editable />
			</Slate>}
		</>
	)
}

export default App