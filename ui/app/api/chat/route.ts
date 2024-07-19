import { createOpenAI, openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
const maxDuration = 30;

export async function POST(req: Request) {
  const env = process.env;
  const { messages } = await req.json();
  const provider = createOpenAI({
    baseURL: env.OPENAI_API_URL,
    apiKey: env.OPENAI_API_KEY,
  });
  const model = provider.chat(env.MODEL_ID ?? 'gpt-3.5-turbo');

  const result = await streamText({
    model: model,
    messages,
  });

  return result.toAIStreamResponse();
}
