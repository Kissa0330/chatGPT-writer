import { NextApiRequest, NextApiResponse } from "next";
import { gptAPI } from "../../api/gpt_API";

function submitGPT(data:any):Promise<string> {
    let content = "";
    if (data.locale === "en") {
      content += `Please write a ${data.wordCount}-word blog post that meets the following criteria\n`;
      content += `The title is "${data.title}"\n`;
    } else if (data.locale === "ja") {
    }
    return gptAPI("user", content, String(process.env.OPENAIAPIKEY));
  }

export default function handler(req:NextApiRequest, res:NextApiResponse) {
	const data = {
		locale: req.query.locale,
		wordCount: req.query.wordCount,
		title: req.query.title
	}
	submitGPT(data).then((gptRes)=>{res.status(200).json({ res:gptRes });});
  }