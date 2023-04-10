# orcwasmjs

`orcwasmjs` is a Javascript module using Webassembly built in go, based on https://github.com/scritchley/orc go library. Module that enables you to read ORC files in JavaScript. It is built using Go and can be used both in the browser and in Node.js environments.

## Installation

To install the `orcwasmjs` module, run the following command:

```bash
npm install orcwasmjs
```

## Example Usage

```javascript
import orcwasmjs from 'orcwasmjs'
import fetch from "node-fetch";

fetch("https://raw.githack.com/scritchley/orc/master/examples/demo-11-zlib.orc").then((response) => {
    return response.arrayBuffer();
}).then((buffer) => {
    const orc = orcwasmjs.loadOrcFromBuffer(buffer, ["_col0"]);
    console.log(orc);
}).catch((err) => {
    console.error("Failed to load the orc file:", err);
});
```
