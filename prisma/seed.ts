import { kv } from "@vercel/kv";

kv.keys("*").then(console.log)