import React, { useState, useRef } from 'react'
import { useLocale } from "../hooks/useLocale";
import { Button } from '@nextui-org/react';
import { createEditor } from 'slate'
import Head from "next/head";
import { useRouter } from 'next/router';
import { Slate, Editable, withReact } from 'slate-react'
import styles from "../styles/Editor.module.css";
import Evaluation from "../components/evaluation"
import FactCheck from "../components/factcheck"

const App = () => {
	const { query, isReady } = useRouter()
	const [editor] = useState(() => withReact(createEditor()))
	const [evaluationText, setEvaluationText] = useState("");
	const [isEvaluation, setIsEvaluation] = useState(false);
	const [factCheckText, setFactCheckText] = useState("");
	const [isFactCheck, setIsFactCheck] = useState(false);
	const editorText = useRef("");
	const locale = useLocale();
	const t = locale.t;

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
			editorText.current += i;
		}
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
			<div className={styles.flex_wrapper}>
				<div className={styles.editor_wrapper}>
					<Slate editor={editor} value={initialValue} onChange={value => {
						const isAstChange = editor.operations.some(
							op => 'set_selection' !== op.type
						)
						if (isAstChange) {
							editorText.current = "";
							for (let i of value) {
								for (let j of i.children) {
									editorText.current += j.text;
								}
							}
						}
					}}>
						<Editable />
					</Slate>
				</div>
				<div className={styles.flex_left}>
					<div className={styles.flex_left_wrapper}>
						{isEvaluation && <Evaluation text={evaluationText} />}
						<Button className={styles.flex_left_button}
							onClick={() => {
							setIsEvaluation(true);
							setEvaluationText(editorText.current)
						}}>{t.evaluation.title}</Button>
					</div>
					<div className={styles.flex_left_wrapper}>
						{isFactCheck && <FactCheck text={factCheckText} />}
						<Button className={styles.flex_left_button} onClick={() => {
							setIsFactCheck(true);
							setFactCheckText(editorText.current)
						}}>{t.factcheck.title}</Button>
					</div>
				</div>
			</div>
		</>
	)
}

export default App