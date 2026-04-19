import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const mobileRoot = path.dirname(scriptDir);
const projectRoot = path.dirname(mobileRoot);
const wwwDir = path.join(mobileRoot, "www");

const filesToCopy = ["index.html", "app.js", "styles.css", "icon.png"];

await rm(wwwDir, { recursive: true, force: true });
await mkdir(wwwDir, { recursive: true });

for (const file of filesToCopy) {
  await cp(path.join(projectRoot, file), path.join(wwwDir, file));
}

console.log(`Copied web assets into ${wwwDir}`);