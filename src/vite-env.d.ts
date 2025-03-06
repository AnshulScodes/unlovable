/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_GOOGLE_FONTS_API_KEY: string;
  readonly VITE_DRIBBBLE_CLIENT_ID: string;
  readonly VITE_DRIBBBLE_CLIENT_SECRET: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
