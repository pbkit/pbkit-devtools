import { serve } from "https://deno.land/std@0.146.0/http/mod.ts";
import { port } from "./port.ts";
import {
  disassembleZip,
  serveZipFiles,
} from "https://deno.land/x/zipland@v0.0.3/mod.ts";

const channel = createChannel();

const file = await Deno.open("./webview.zip");
const zip = await disassembleZip(file);

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  switch (pathname) {
    case "/send": {
      channel.sender.postMessage(await req.text());
      return new Response("good", { status: 200 });
    }
    case "/connect": {
      const stream = new ReadableStream({
        start(controller) {
          channel.receiver.onmessage = function (message: MessageEvent) {
            const body = `data: ${message.data}\n\n`;
            controller.enqueue(body);
          };
        },
        cancel() {
          channel.receiver.close();
        },
      });
      return new Response(stream.pipeThrough(new TextEncoderStream()), {
        headers: { "content-type": "text/event-stream" },
      });
    }
  }
  if (!zip) throw new Deno.errors.NotFound();
  return serveZipFiles(req, zip, { fsRoot: "webview" });
}, {
  port,
});

function createChannel() {
  const channel = new MessageChannel();
  channel.port1.start();
  channel.port2.start();
  return { sender: channel.port1, receiver: channel.port2 };
}
