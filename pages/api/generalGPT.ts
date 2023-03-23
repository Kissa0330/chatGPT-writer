import { OpenAIChatStream } from "../../utils/GPTStream";

export const config = {
  runtime: "edge",
};

export default async function handler(req: any) {
  const {
	content: content
  } = await req.json();
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: content }],
    stream: true,
  };
  const stream = await OpenAIChatStream(payload);
  return new Response(stream);
}
