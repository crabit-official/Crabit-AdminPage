/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_HOST: string;
  VITE_S3_IMAGE: string;
  VITE_S3_HOSTNAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
