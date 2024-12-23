/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string,
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
