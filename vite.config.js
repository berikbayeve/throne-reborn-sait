import { defineConfig } from 'vite';

// Repo is served at https://<user>.github.io/throne-reborn-sait/,
// so all built asset paths need that prefix.
export default defineConfig({
  base: '/throne-reborn-sait/',
});
