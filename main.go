package main

import (
	"bytes"
	"log"
	"syscall/js"

	"github.com/scritchley/orc"
)

func main() {
	js.Global().Set("loadOrcFromBuffer", js.FuncOf(goCallback))
	select {}
}

func jsValueToStringSlice(jsList js.Value) []string {
	length := jsList.Get("length").Int()
	stringSlice := make([]string, length)

	for i := 0; i < length; i++ {
		stringSlice[i] = jsList.Index(i).String()
	}

	return stringSlice
}

func goCallback(this js.Value, args []js.Value) interface{} {
	jsArrayBuffer := args[0]
	cols := jsValueToStringSlice(args[1])
	byteLength := jsArrayBuffer.Get("byteLength").Int()
	log.Println("Received binary data length a:", byteLength)

	data := make([]byte, byteLength)
	jsUint8Array := js.Global().Get("Uint8Array").New(jsArrayBuffer)
	js.CopyBytesToGo(data, jsUint8Array)

	reader, err := orc.NewReader(bytes.NewReader(data))
	if err != nil {
		log.Fatal("Error creating ORC reader:", err)
		return nil
	}

	c := reader.Select(cols...)
	// count := 0

	result := js.Global().Get("Array").New()

	// outerLoop:
	for c.Stripes() {
		for c.Next() {
			row := c.Row()
			rowResult := js.Global().Get("Array").New()
			for _, value := range row {
				rowResult.Call("push", value)
			}
			result.Call("push", row)
			// count += 1
			// if count > 1000 {
			// break outerLoop
			// }
		}
	}

	if err := c.Err(); err != nil {
		log.Fatal(err)
	}
	return result
}
