#!/usr/bin/env node
import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "design-exports");
const OUTPUT_DIR = join(ROOT, "public", "images", "dashboard");

const IMAGES = [
  { name: "avatar", width: 102, height: 158, fit: "inside" },
  { name: "transaction-avatar", width: 86, height: 86, fit: "outside" },
  { name: "hero-texture", width: 1838, height: 2450, fit: "outside" },
  { name: "hero-globe", width: 779, height: 584, fit: "outside" },
  { name: "balance-card-bg-desktop", width: 890, height: 1334, fit: "outside" },
  {
    name: "balance-card-bg-mobile",
    extract: { left: 78, top: 289, width: 583, height: 452 },
  },
  { name: "prediction-pastor-chris", width: 647, height: 330, fit: "outside" },
  { name: "prediction-tacha", width: 647, height: 330, fit: "outside" },
  { name: "game-arkjet", width: 552, height: 330, fit: "outside" },
  { name: "usd-flag", width: 53, height: 53, fit: "outside" },
];

const AVIF_OPTIONS = { quality: 60, effort: 6 };

async function optimize({ name, width, height, fit, extract }) {
  const input = join(SOURCE_DIR, `${name}.png`);
  const output = join(OUTPUT_DIR, `${name}.avif`);
  const image = extract
    ? sharp(input).extract(extract)
    : sharp(input).resize({ width, height, fit, withoutEnlargement: true });
  const info = await image.avif(AVIF_OPTIONS).toFile(output);
  const { size } = await stat(output);
  return `${output.slice(ROOT.length + 1)} ${info.width}x${info.height} ${size} bytes\n`;
}

await mkdir(OUTPUT_DIR, { recursive: true });
for (const image of IMAGES) {
  process.stdout.write(await optimize(image));
}
