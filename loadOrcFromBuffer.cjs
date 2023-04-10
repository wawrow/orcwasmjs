"use strict";
const fs = require("fs");
const path = require("path");
require("./wasm_exec.cjs");

const go = new Go();
const wasmFilePath = path.join(__dirname, "main.wasm");
const wasmFile = fs.readFileSync(wasmFilePath);

let loadOrcFromBuffer;

WebAssembly.instantiate(wasmFile, go.importObject)
  .then((result) => {
    go.run(result.instance);
    console.debug("The WebAssembly module has been initialized.");
    loadOrcFromBuffer = global.loadOrcFromBuffer;
    console.debug({loadOrcFromBuffer} );
  })
  .catch((err) => {
    console.error("Failed to instantiate the WebAssembly module:", err);
  });

  module.exports = {
    get loadOrcFromBuffer() {
      if (!loadOrcFromBuffer) {
        throw new Error("The WebAssembly module has not been initialized. Please ensure the init() function has been called and completed.");
      }
      return loadOrcFromBuffer;
    },
  };