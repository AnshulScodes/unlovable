// Type declarations for external modules

declare module 'openai' {
  export default class OpenAI {
    constructor(options: { apiKey: string; dangerouslyAllowBrowser?: boolean });
    
    chat: {
      completions: {
        create: (options: {
          model: string;
          messages: Array<{
            role: 'system' | 'user' | 'assistant';
            content: string;
          }>;
          temperature?: number;
          max_tokens?: number;
          response_format?: { type: string };
        }) => Promise<{
          choices: Array<{
            message?: {
              content?: string;
            };
          }>;
        }>;
      };
    };
  }
}

declare module 'sonner' {
  export const toast: {
    info: (message: string) => void;
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
  };
} 