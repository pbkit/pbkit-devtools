import { open } from "https://deno.land/x/pbkit@v0.0.49/cli/pollapo/misc/browser.ts";
import { port } from "./port.ts";

new Worker(new URL("./server.ts", import.meta.url).href, {
  type: "module",
});

open(`http://localhost:${port}/index.html`);
