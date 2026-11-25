// The fridge keeps a file on me. Fair enough — I keep one on it too.
// 2 a.m., the light, the sigh: the coldest performance review in the house.
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const ROAST =
  "My fridge judges me at 2 a.m.: it sighs, dims its light, and files my snack as 'incident #47' — the only appliance here with a performance review of me.";

function singleLine(text: string): string {
  return text.replace(/\s*\n\s*/g, " ").trim();
}

async function deliver(): Promise<void> {
  const line = singleLine(ROAST);
  if (line.length > 200) throw new Error(`roast is ${line.length} chars, cap is 200`);
  if (!line.includes("fridge")) throw new Error("roast must name the fridge");
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, "entry.txt"), line, "utf8");
}

void deliver();
