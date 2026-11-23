// main.ts — entry program for post-x-promote-make-your-own-bounty-01.
// The competition entry is an X post; this program hands its address to the
// gate by copying POST.json from the bot directory into the output directory.
// Deterministic: no network, no clock, no randomness.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

try {
  if (!existsSync(source)) {
    throw new Error(`POST.json not found in bot dir "${botDir}"`);
  }
  mkdirSync(outputDir, { recursive: true });
  copyFileSync(source, target);
} catch (err) {
  console.error(`error: failed to copy "${source}" to "${target}": ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
