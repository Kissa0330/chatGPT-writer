const { Configuration, OpenAIApi } = require("openai");

async function gptAPI(role:string, content:string, API_KEY:string): Promise<string> {
  const configuration = new Configuration({
    apiKey: API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: role, content: content }],
  });
  if (completion.status !== 200) {
    throw new Error(`Request failed with status ${completion.status}`);
  }
  return completion.data.choices[0].message
}

export { gptAPI }