import { OpenAIChatStream } from "../../utils/GPTStream";

export const config = {
  runtime: "edge",
};

export default async function handler(req: any) {
  const {
    locale: locale,
    prerequisite: prerequisite,
    wordCount: wordCount,
    title: title,
    headingNumber: headingNumber,
    tagsNumber: tagsNumber,
    tags: tags,
    headings: headingsInfo,
    chapterWordCounts: chapterWordCounts,
  } = await req.json();
  const data = {
    locale: locale,
    prerequisite: prerequisite,
    wordCount: wordCount,
    title: title,
    headingNumber: headingNumber,
    tagsNumber: tagsNumber,
    tags: tags,
    headings: headingsInfo,
    chapterWordCounts: chapterWordCounts,
  };
  let content = "";
  if (data.locale === "en") {
    if (data.prerequisite !== "" && data.prerequisite) {
      content += `Follow the instructions according to the following prerequisites. \n${data.prerequisite}\nThis is the end of the prerequisites.\n`;
    }
    content += `Please write a ${data.wordCount}-word blog post that meets the following criteria.\n`;
    content += `The title is "${data.title}".\n`;
    if (data.headingNumber > 1) {
      content += `There are ${data.headingNumber} headings.`;
    }
    if (data.tagsNumber !== 0) {
      content += `This blog post is tagged with."`;
      for (let i = 0; i < data.tagsNumber; i++) {
        if (i + 1 === data.tagsNumber) {
          content += `${data.tags[i]}`;
        } else {
          content += `${data.tags[i]},`;
        }
      }
      content += `"\n`;
    }
    for (let i = 0; i < data.headingNumber; i++) {
      if (data.headings[i] !== "" && data.headings[i]) {
        content += `The title of ${i + 1} heading is "${data.headings[i]}".\n`;
      }
      if (data.chapterWordCounts[i] !== 0) {
        content += `The number of words in the ${i + 1} heading is ${
          data.chapterWordCounts[i]
        }.\n`;
      }
    }
  } else if (data.locale === "ja") {
    if (data.prerequisite !== "" && data.prerequisite) {
      content += `以下の前提条件に従って指示に従ってください。\n${data.prerequisite}\n前提条件は以上です。\n`;
    }
    content += `${data.wordCount}文字のブログ記事を以下の条件に沿って執筆してください。\n`;
    content += `タイトルは"${data.title}"です。\n`;
    if (data.headingNumber > 1) {
      content += `見出しが${data.headingNumber}個あります。`;
    }
    if (data.tagsNumber !== 0) {
      content += `このブログ記事には次のようなタグが付きます。"`;
      for (let i = 0; i < data.tagsNumber; i++) {
        if (i + 1 === data.tagsNumber) {
          content += `${data.tags[i]}`;
        } else {
          content += `${data.tags[i]},`;
        }
      }
      content += `"\n`;
    }
    for (let i = 0; i < data.headingNumber; i++) {
      if (data.headings[i] !== "" && data.headings[i]) {
        content += `${i + 1}番目の見出しのタイトルは「${
          data.headings[i]
        }」です。\n`;
      }
      if (data.chapterWordCounts[i] !== 0) {
        content += `${i + 1}番目の見出しの文字数は${
          data.chapterWordCounts[i]
        }です。\n`;
      }
    }
  }
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content }],
    stream: true,
  };
  const stream = await OpenAIChatStream(payload);
  return new Response(stream);
}
