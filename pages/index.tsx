import type { NextPage } from "next";
import { ReactElement, useState } from "react";
import { useLocale } from "../hooks/useLocale";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Button, Text, Input, Textarea } from '@nextui-org/react';
// import { GoogleAdsense } from "../components/adsense";

const Home: NextPage = () => {
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(1000);
  const [headingNumber, setHeadingNumber] = useState<number>(1);
  const [headings, setHeadings] = useState<string[]>([""]);
  const [chapterWordCounts, setChapterWordCounts] = useState<number[]>([0]);
  const [gptRes, setGptRes] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [prerequisite, setPrerequisite] = useState<string>("");
  const locale = useLocale();
  const t = locale.t;

  function validation(): boolean {
    if (title === "") {
      alert(t.error.titleNotExist)
      return false;
    }
    if (isLoaded) {
      alert(t.error.nowLoading)
      return false;
    }
    return true;
  }
  async function submitGPT() {
    if (!validation()) {
      return;
    };
    setGptRes("");
    const body = JSON.stringify({
      locale: locale.locale,
      wordCount: wordCount,
      title: title,
      headingNumber: headingNumber,
      tagsNumber: tags.length,
      tags: tags,
      headings: headings,
      chapterWordCounts: chapterWordCounts
    });
    const response = await fetch("/api/submitGPT", {
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
    const gptResArr = gptRes.split("\n\n");
    const texts = gptResArr.map((item, index) => {
      if (index + 1 !== gptResArr.length && item.length < 50) {
        return (
          <Text className={styles.res_text} h2 key={index}>
            {item}
          </Text>
        );
      }
      return (
        <Text className={styles.res_text} key={index}>
          {item}
        </Text>
      );
    });
    return <div className={styles.gptRes}>{texts}</div>;
  }
  function headingTitleInput(): ReactElement {
    let list = [];
    for (let i = 0; i < headingNumber; i++) {
      list.push(
        <li className={styles.form_bot_li} key={i}>
          <div className={styles.form_bot_ele}>
            <Input
              label={`${t.top.inputTitle.heading} ${i + 1}`}
              size="xs"
              id="headingNumber-input"
              name="headings"
              type="text"
              value={headings[i]}
              onChange={(e) => {
                setHeadings(
                  headings.map((heading, index) =>
                    index === i ? e.target.value : heading
                  )
                );
              }}
            />
          </div>
          <div className={styles.form_bot_ele}>
            <Input
              size="xs"
              label={t.top.inputTitle.numberOfCharacters}
              id="headingNumber-input"
              name="chapterWordCounts"
              type="number"
              value={chapterWordCounts[i]}
              onChange={(e) => {
                setChapterWordCounts(
                  chapterWordCounts.map((count, index) =>
                    index === i ? Number(e.target.value) : count
                  )
                );
              }}
            />
          </div>
        </li>
      );
    }
    return <ul>{list}</ul>;
  }
  function contentsKeywords() {
    let list = [];
    for (let i = 0; i < tags.length; i++) {
      list.push(
        <li className={styles.delete_li} key={i}>
          <Text>{tags[i]}</Text>
          <Button
            size="xs"
            type="button"
            className={styles.delete_button}
            onClick={() => {
              setTags(tags.filter((t, index) => i !== index));
            }}>
            {t.top.inputTitle.delete}
          </Button>
        </li>
      );
    }
    return <ul className={styles.delete_ul}>{list}</ul>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>GPT Writer</title>
        <meta
          name="description"
          content="Generate blog posts using ChatGPT. You can decide the title, heading and number of headings. It helps with copy-and-paste checking and fact-checking."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Text h1>GPT Writer</Text>
        <Text>{t.description}</Text>
        <div className={styles.form_top}>
          <div className={styles.form_top_header}>
            <Input
              type="text"
              size="sm"
              label={t.top.inputTitle.contentsKeywords}
              className={styles.top_add_input}
              id="tag-input"
              name="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <Button type="button"
              size="xs"
              className={styles.top_add_button}
              onClick={() => {
                if (tag === "") {
                  return;
                }
                setTag("");
                setTags([...tags, tag]);
              }}>{t.top.inputTitle.add}</Button>
            <Textarea className={styles.top_text_area} minRows={3} maxRows={3}
              width="300px"
              value={prerequisite}
              onChange={(e) => setPrerequisite(e.target.value)}
              label={t.top.inputTitle.Prerequisite} />
          </div>
          {contentsKeywords()}
        </div>
        <div className={styles.form_medium}>
          <div className={styles.form_medium_ele}>
            <Input
              label={t.top.inputTitle.title}
              size="sm"
              type="text"
              id="title-input"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.form_medium_ele}>
            <Input
              size="sm"
              type="number"
              label={t.top.inputTitle.numberOfCharacters}
              id="wordCount-input"
              name="wordCount"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
            />
          </div>
          <div className={styles.form_medium_ele}>
            <Input
              size="sm"
              label={t.top.inputTitle.headingNumber}
              id="headingNumber-input"
              type="number"
              name="title"
              value={headingNumber}
              onChange={(e) => {
                setHeadingNumber(Number(e.target.value));
                setHeadings([...headings, ""]);
                setChapterWordCounts([...chapterWordCounts, 0]);
              }}
            />
          </div>
        </div>
        {headingTitleInput()}
        <Button type="button" className={styles.generate_button} onClick={submitGPT}>{t.top.generate}</Button>
        {gptResponseElements()}
        {/* <GoogleAdsense
          slot="8056836806"
          style={{ display: 'block' }}
          format="auto"
          responsive="true"
        /> */}
      </main >
    </div >
  );
};

export default Home;
