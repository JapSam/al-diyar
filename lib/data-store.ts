import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data-json");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name: string) {
  return path.join(DATA_DIR, `${name}.json`);
}

export function readData<T>(name: string, fallback: T[]): T[] {
  ensureDir();
  const fp = filePath(name);
  if (!fs.existsSync(fp)) {
    fs.writeFileSync(fp, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
  const raw = fs.readFileSync(fp, "utf-8");
  return JSON.parse(raw);
}

export function writeData<T>(name: string, data: T[]) {
  ensureDir();
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf-8");
}
