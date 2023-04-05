import React, { useState, useRef, useEffect } from 'react'
import { useLocale } from "../hooks/useLocale";
import { Button, Text } from '@nextui-org/react';
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
	const [charCount, setCharCount] = useState(0);
	const editorText = useRef("");
	const locale = useLocale();
	const t = locale.t;
	let textList: any = [];
	useEffect(() => {
		if (isReady) {
			const { text } = query;
			if (typeof text === "string") {
				for (const i of text.split("\\n")) {
					textList.push({
						type: "paragrah",
						children: [{ text: i }]
					});
					editorText.current += i;
				}
			}
			locale.locale === "en" ? setCharCount(countWords()) : setCharCount(editorText.current.length)
		}
	}, [isReady, query])
	if (!isReady) {
		return;
	}
	function countWords() {
		const spaces = editorText.current.match(/\S+/g);
		let words;
		if (spaces) {
			words = spaces.length;
		} else {
			words = 0;
		}
		return words;
	}
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
					<Slate editor={editor} value={textList} onChange={value => {
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
							locale.locale === "en" ? setCharCount(countWords()) : setCharCount(editorText.current.length)
						}
					}}>
						<Editable />
					</Slate>
					<Text className={styles.numberOfCharacters}>{t.top.inputTitle.numberOfCharacters}: {charCount}</Text>
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