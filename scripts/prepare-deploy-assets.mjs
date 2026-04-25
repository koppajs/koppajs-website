import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const source = path.resolve("src/.htaccess");
const targetDirectory = path.resolve("dist");
const target = path.join(targetDirectory, ".htaccess");

if (!existsSync(source)) {
  console.error("Missing deploy rewrite file: src/.htaccess");
  process.exit(1);
}

if (!existsSync(targetDirectory)) {
  console.error(
    "Missing dist directory. Run npm run build before deploy:prepare.",
  );
  process.exit(1);
}

mkdirSync(targetDirectory, { recursive: true });
copyFileSync(source, target);

console.log("Copied src/.htaccess to dist/.htaccess.");
