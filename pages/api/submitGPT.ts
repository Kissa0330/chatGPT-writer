import { triggerAsyncId } from "async_hooks";
import { NextApiRequest, NextApiResponse } from "next";
import { gptAPI } from "../../api/gpt_API";

function submitGPT(content: string): Promise<string> {
  return gptAPI("user", content, String(process.env.OPENAIAPIKEY));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    locale: req.query.locale,
    wordCount: req.query.wordCount,
    title: req.query.title,
    headingNumber: Number(req.query.headingNumber),
    tagsNumber: Number(req.query.tagsNumber),
    tags: String(req.query.tags).split("/"),
    headings: String(req.query.headingsInfo).split("/")
  };
  data.headings.pop();
  let content = "";
  if (data.locale === "en") {
    content += `Please write a ${data.wordCount}-word blog post that meets the following criteria.\n`;
    content += `The title is "${data.title}".\n`;
    if (data.headingNumber > 1) {
      content += `There are ${data.headingNumber} headings.`;
    }
    if (data.tagsNumber !== null) {
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
    for (let i = 0; i < data.headings.length; i++) {
      let heading = data.headings[i].split("*");
      if (heading[1] !== "" && heading[1] !== "undefined" && heading[1])
      {
        content += `The title of ${i + 1} heading is "${heading[1]}".\n`
      }
      if (Number(heading[0]) !== 0 && heading[0])
      {
        content += `The number of words in the ${i + 1} heading is ${heading[0]}.\n`
      }
    }
  } else if (data.locale === "ja") {
    content += `${data.wordCount}文字のブログ記事を以下の条件に沿って執筆してください。\n`;
    content += `タイトルは"${data.title}"です。\n`;
    if (data.headingNumber > 1) {
      content += `見出しが${data.headingNumber}個あります。`;
    }
    if (data.tagsNumber !== null) {
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
    for (let i = 0; i < data.headings.length; i++) {
      let heading = data.headings[i].split("*");
      if (heading[1] !== "")
      {
        content += `${i + 1}番目の見出しのタイトルは「${heading[1]}」です。\n`
      }
      if (Number(heading[0]) !== 0 && heading[0])
      {
        content += `${i + 1}番目の見出しの文字数は${heading[0]}です。\n`
      }
    }
  }
  submitGPT(content).then((gptRes) => {
    res.status(200).json({ res: gptRes, content: content, data:data });
  });
}
