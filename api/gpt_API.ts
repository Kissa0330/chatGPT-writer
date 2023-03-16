const { Configuration, OpenAIApi } = require("openai");
import { dataToStream } from "../utils/toStream";

export const config = {
  runtime: "edge",
};


async function gptAPI(role:string, content:string, API_KEY:string): Promise<any> {
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: role, content: content }],
    stream: true,
  }, { responseType: 'stream' });
  const stream = dataToStream(completion.data);
  return stream;
}

export { gptAPI }