const { Configuration, OpenAIApi } = require("openai");
import { Readable } from "stream";

async function gptAPI(role:string, content:string, API_KEY:string): Promise<Readable> {
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: role, content: content }],
    stream: true,
  }, { responseType: 'stream' });
  const stream = completion.data as any as Readable;
  return stream;
}

export { gptAPI }