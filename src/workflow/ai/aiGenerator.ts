"use server";

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterGenerationOptions {
  model?: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface AIResponse {
  success: boolean;
  content?: string;
  error?: string;
}

/**
 * Core function to generate content using OpenRouter API
 */
export async function generateContent(options: OpenRouterGenerationOptions): Promise<AIResponse> {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not defined in environment variables');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      // Optional: helps OpenRouter attribute requests to your app correctly
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'Next App AI Workflow',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: options.model || 'openai/gpt-oss-20b:free', // We can change default model
      messages: options.messages,
      temperature: options.temperature,
      max_tokens: options.max_tokens,
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `OpenRouter API error: ${response.status}`;
    try {
      const parsed = JSON.parse(errorBody);
      if (parsed.error?.metadata?.raw) {
        errorMessage = parsed.error.metadata.raw;
      } else if (parsed.error?.message) {
        errorMessage = parsed.error.message;
      }
    } catch (e) {
      errorMessage = errorBody;
    }
    return { success: false, error: errorMessage };
  }

  const data = await response.json();

  // Return the textual content from the generated message
  return { success: true, content: data.choices?.[0]?.message?.content || '' };
}

/**
 * Helper function for simple single-prompt text generation
 */
export async function generateText(prompt: string, model: string = 'openai/gpt-oss-20b:free'): Promise<AIResponse> {
  return generateContent({
    model,
    messages: [
      { role: 'user', content: prompt }
    ]
  });
}
