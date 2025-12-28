import fs from "fs";

import path from "path";

export function injesting(filePath) {
  const __dirname = import.meta.dirname;
  const rootDir = path.resolve(__dirname, "..");
  const vueDir = path.join(rootDir, "docs", filePath);
  const content = fs.readFileSync(vueDir, "utf-8");
  return content;
}
