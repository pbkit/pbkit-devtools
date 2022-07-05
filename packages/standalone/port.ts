import { parse } from "https://deno.land/std@0.146.0/flags/mod.ts";

const args = parse(Deno.args);
export const port = args.port ?? 8099;
