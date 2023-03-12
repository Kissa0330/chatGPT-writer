import type { NextPage } from "next";
import { ReactElement, useState } from "react";
import { useLocale } from "../hooks/useLocale";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [wordCount, setWordCount] = useState<number>(1000);
  const [headingNumber, setHeadingNumber] = useState<number>(1);
  const [headings, setHeadings] = useState<string[]>([]);
  const [chapterWordCounts, setChapterWordCounts] = useState<number[]>([]);
  const t = useLocale().t;

  function headingTitleInput(): ReactElement {
    let list = [];
    for (let i = 0; i < headingNumber; i++) {
      list.push(
        <li key={i}>
          <label>
            {t.top.inputTitle.heading} {i + 1}
          </label>
          <input
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
          <label>{t.top.inputTitle.numberOfCharacters}</label>
          <input
            id="headingNumber-input"
            name="chapterWordCounts"
            type="number"
            value={chapterWordCounts[i]}
            onChange={(e) => {
              setChapterWordCounts(
                chapterWordCounts.map((count, index) =>
                  index === i ? e.target.value : count
                )
              );
            }}
          />
        </li>
      );
    }
    return <ul>{list}</ul>;
  }
  function contentsKeywords() {
    let list = [];
    for (let i = 0; i < tags.length; i++) {
      list.push(
        <li key={i}>
          {tags[i]}{" "}
          <button
            type="button"
            onClick={() => {
              setTags(tags.filter((t, index) => i !== index));
            }}
          >
            {t.top.inputTitle.delete}
          </button>
        </li>
      );
    }
    return <ul>{list}</ul>;
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
        <h1>GPT Writer</h1>
        <form>
          <div>
            <label>{t.top.inputTitle.contentsKeywords}</label>
            <input
              id="tag-input"
              name="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                if (tag === "") {
                  return;
                }
                setTags([...tags, tag]);
              }}
            >
              {t.top.inputTitle.add}
            </button>
            {contentsKeywords()}
          </div>
          <label>{t.top.inputTitle.title}</label>
          <input
            id="title-input"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>{t.top.inputTitle.numberOfCharacters}</label>
          <input
            id="wordCount-input"
            name="wordCount"
            value={wordCount}
            onChange={(e) => setWordCount(Number(e.target.value))}
          />
          <label>{t.top.inputTitle.headingNumber}</label>
          <input
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
          {headingTitleInput()}
          <button type="submit">{t.top.generate}</button>
        </form>
      </main>
    </div>
  );
};

export default Home;
