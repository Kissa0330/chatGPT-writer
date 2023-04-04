import React, { useState } from 'react'
import { Text } from '@nextui-org/react';
import { createEditor } from 'slate'
import Head from "next/head";
import { useRouter } from 'next/router';
import { Slate, Editable, withReact } from 'slate-react'
import styles from "../styles/Editor.module.css";
// import Evaluation from "../components/evaluation"
// import FactCheck from "../components/factcheck"

const App = () => {
	const { query, isReady } = useRouter()
	const [editor] = useState(() => withReact(createEditor()))
	if (!isReady) {
		return;
	}
	const { text } = query;
	let textList = [];
	if (typeof text === "string") {
		for (const i of text.split("_")) {
			textList.push({
				type: "paragrah",
				children: [{ text: i }]
			});
		}
		console.log(textList);
	}
	const initialValue = textList
	return (
		<>
			<Head>
				<title>Blog post editor</title>
				<meta
					name="description"
					content="You can edit the generated blog posts.
					ChatGPT will evaluate the consistency of the edited articles.
					ChatGPT will suggest fact-checking suggestions for your article."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Text h1 className={styles.title}>Editor</Text>
			<div className={styles.editor_wrapper}>
				<Slate editor={editor} value={initialValue}>
					<Editable />
				</Slate>
			</div>
		</>
	)
}

export default App