import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const langchainLLM = new ChatGoogleGenerativeAI({ apiKey:  });

export async function generateAiContext(message) {
  try {
    // Change this {history} according to the context, you want to generate your content
    const history = "Create a well written paragramph on the topic of :";
    const langchainTextResponse = await langchainLLM.invoke([['human', history + message]]);
    const langchainOutput = langchainTextResponse.content;
    return langchainOutput;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while generating AI context.');
  }
}