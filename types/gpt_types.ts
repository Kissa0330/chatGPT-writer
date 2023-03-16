export type Message = {
  role: string;
  content: string;
};

export interface OpenAIStreamPayload {
  model: string;
  messages: Message[];
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  max_tokens?: number;
  stream: boolean;
  n?: number;
}

export interface ChatResponseData {
  id: string;
  object: string;
  created: string;
  model: string;
  choices: { delta: Partial<Message> }[];
}