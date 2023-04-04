import React, { useState, useEffect } from 'react'
import { useLocale } from "../hooks/useLocale";
import { Text } from '@nextui-org/react';
import styles from "../styles/Evaluation.module.css";

type Prop = {
	text: string
}


const App = (props: Prop) => {
	const [gptRes, setGptRes] = useState<string>("");
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const locale = useLocale();
	const t = locale.t;

	async function submitGPT() {
		setGptRes("");
		let content = "";
		if (locale.locale === "ja") {
			content += "以下の文章の一貫性を100点満点で評価してください。点数と評価を出力してください。点数は数字のみ出力してください。\n\""
		}
		else if (locale.locale === "en") {
			content += "Please rate the consistency of the following sentences on a 100-point scale. Please output the score and the evaluation. Please output only numbers for the score.\n\""
		}
		content += props.text;
		content += "\""
		const body = JSON.stringify({
			content: content
		});
		const response = await fetch("/api/generalGPT", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: body,
		});
		setIsLoaded(true);
		const data = response.body;
		if (!data) {
			return;
		}
		const reader = data.getReader();
		const decoder = new TextDecoder();
		let done = false;

		while (!done) {
			const { value, done: doneReading } = await reader.read();
			done = doneReading;
			const chunkValue = decoder.decode(value);
			setGptRes((prev) => prev + chunkValue);
		}
		setIsLoaded(false);
	}
	function gptResponseElements() {
		const gptResArr = gptRes.split("\n");
		const texts = gptResArr.map((item, index) => {
			return (
				<Text className={styles.res_text} key={index}>
					{item}
					<br/>
				</Text>
			);
		});
		return <div className={styles.gptRes}>{texts}</div>;
	}
	useEffect(() => {
		submitGPT();
	},[]);
	return (
		<div>
			<Text h3>
				{t.evaluation.title}
			</Text>
			{gptResponseElements()}
		</div>
	)
}

export default App