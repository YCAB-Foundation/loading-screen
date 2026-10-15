import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const dist = join(root, "dist");
const read = (path) => readFileSync(join(src, path), "utf8");

const MIME = { ".webp": "image/webp", ".png": "image/png", ".svg": "image/svg+xml" };
const assets = Object.fromEntries(
  readdirSync(join(src, "assets"))
    .filter((f) => MIME[extname(f)])
    .map((f) => [
      basename(f, extname(f)),
      `data:${MIME[extname(f)]};base64,${readFileSync(join(src, "assets", f)).toString("base64")}`,
    ])
);

const variants = readdirSync(join(src, "variants"))
  .filter((f) => f.endsWith(".js"))
  .sort()
  .map((f) => read(`variants/${f}`));

const body = [read("shared.js").replace("__ASSETS__", JSON.stringify(assets)), ...variants, read("core.js")].join("\n");

const { name, version } = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const banner = `/*! ${name} v${version} */\n`;

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, "ycab-loader.js"), `${banner}(function () {\n${body}\n})();\n`);
writeFileSync(join(dist, "ycab-loader.mjs"), `${banner}${body}\nexport { show, hide, wrap };\nexport default YCABLoader;\n`);
writeFileSync(join(dist, "ycab-loader.d.ts"), read("ycab-loader.d.ts"));

console.log(`Built dist/ycab-loader.{js,mjs,d.ts} with variants: ${Object.keys(assets).length} assets, ${variants.length} variants`);
