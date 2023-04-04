import React, { useState, useEffect } from 'react'
import { useLocale } from "../hooks/useLocale";
import { Text } from '@nextui-org/react';
import styles from "../styles/Factcheck.module.css";

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
			content += "以下の文章で事実確認をすべき点を教えてください。\n\""
		}
		else if (locale.locale === "en") {
			content += "Please tell me what should be fact-checked in the following statement.\n\""
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
	},[props.text]);
	return (
		<div>
			<Text h3>
				{t.factcheck.title}
			</Text>
			{gptResponseElements()}
		</div>
	)
}

export default App