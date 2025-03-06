// API Configuration for external services

// Helper function to safely get environment variables
const getEnvVariable = (key: string): string => {
  // For Vite, we need to use import.meta.env
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any)[key] || '';
  }
  // Fallback for other environments
  return '';
};

// OpenAI API configuration
export const OPENAI_CONFIG = {
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  model: 'gpt-4o', // Using GPT-4o as specified in the PRD
  maxTokens: 2048,
  temperature: 0.7,
};

// Google Fonts API
export const GOOGLE_FONTS_API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY || '';
export const GOOGLE_FONTS_API_URL = 'https://www.googleapis.com/webfonts/v1/webfonts';

// Dribbble API for design inspiration (if you have access)
export const DRIBBBLE_API_CONFIG = {
  clientId: import.meta.env.VITE_DRIBBBLE_CLIENT_ID || '',
  clientSecret: import.meta.env.VITE_DRIBBBLE_CLIENT_SECRET || '',
  apiUrl: 'https://api.dribbble.com/v2',
};

// Default configuration for API requests
export const DEFAULT_API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
}; 