import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const wasm_exec = require('./wasm_exec.cjs');

export const Go = wasm_exec.Go;
