/// <reference types="vite/client" />

interface Env {
  readonly VITE_DEFAULT_LANGUAGE: string;
}

interface ImportMetaEnv extends Env {}
