# orcwasmjs

Meet `orcwasmjs`, the "naive" JavaScript module that harnesses the power of WebAssembly and enable you to read orc files from within Javascript. Using the https://github.com/scritchley/orc Go library its purpose is to enable reading ORC files, delivering data as a simplest possible List of Lists object. This adaptable module fits comfortably in both browser and Node.js environments.
While `orcwasmjs` is currently quite adept at the simple act of reading a specific list of columns, it's not yet ventured into the realms of filtering, aggregation, or metadata inspection. 


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

Output:
```bash
$ node main.js
The WebAssembly module has been initialized.
2023/04/10 23:21:52 Received binary data length a: 408522
[
  [ 1 ],  [ 2 ],   [ 3 ],  [ 4 ],  [ 5 ],  [ 6 ],  [ 7 ],
  [ 8 ],  [ 9 ],   [ 10 ], [ 11 ], [ 12 ], [ 13 ], [ 14 ],
  [ 15 ], [ 16 ],  [ 17 ], [ 18 ], [ 19 ], [ 20 ], [ 21 ],
  [ 22 ], [ 23 ],  [ 24 ], [ 25 ], [ 26 ], [ 27 ], [ 28 ],
  [ 29 ], [ 30 ],  [ 31 ], [ 32 ], [ 33 ], [ 34 ], [ 35 ],
  [ 36 ], [ 37 ],  [ 38 ], [ 39 ], [ 40 ], [ 41 ], [ 42 ],
  [ 43 ], [ 44 ],  [ 45 ], [ 46 ], [ 47 ], [ 48 ], [ 49 ],
  [ 50 ], [ 51 ],  [ 52 ], [ 53 ], [ 54 ], [ 55 ], [ 56 ],
  [ 57 ], [ 58 ],  [ 59 ], [ 60 ], [ 61 ], [ 62 ], [ 63 ],
  [ 64 ], [ 65 ],  [ 66 ], [ 67 ], [ 68 ], [ 69 ], [ 70 ],
  [ 71 ], [ 72 ],  [ 73 ], [ 74 ], [ 75 ], [ 76 ], [ 77 ],
  [ 78 ], [ 79 ],  [ 80 ], [ 81 ], [ 82 ], [ 83 ], [ 84 ],
  [ 85 ], [ 86 ],  [ 87 ], [ 88 ], [ 89 ], [ 90 ], [ 91 ],
  [ 92 ], [ 93 ],  [ 94 ], [ 95 ], [ 96 ], [ 97 ], [ 98 ],
  [ 99 ], [ 100 ],
  ... 901 more items
]
```