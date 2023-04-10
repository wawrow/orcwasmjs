const fs = require("fs");
const wasm_exec = require("./wasm_exec");

const go = new wasm_exec.Go();

const wasmFile = fs.readFileSync("main.wasm");

WebAssembly.instantiate(wasmFile, go.importObject)
  .then((result) => {
    go.run(result.instance);
  })
  .catch((err) => {
    console.error("Failed to instantiate the WebAssembly module:", err);
  });

module.exports = {
  loadOrcFromBuffer
}