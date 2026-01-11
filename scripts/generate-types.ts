import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import { compileFromFile } from "json-schema-to-typescript";

function makeReadonly(sourceCode: string): string {
  return sourceCode
    .replace(/^(\s+)([a-zA-Z0-9_"?-]+)(\??:)/gm, "$1readonly $2$3")
    .replace(/^(\s+)(\[k: string\]:)/gm, "$1readonly $2");
}

async function generate(): Promise<void> {
  const dirname = path.dirname(url.fileURLToPath(import.meta.url));

  const directory = path.join(dirname, "../src/schemas");
  const contents = await fs.readdir(directory, { recursive: true });

  return contents.forEach(async (item) => {
    if (!item.endsWith("schema.json")) return;

    const name = item.split("/")[0]!;
    const file = path.join(dirname, "../src/schemas", item);
    const output = path.join(dirname, `../src/types/${name}.d.ts`);

    const compiled = await compileFromFile(file).then(makeReadonly);
    await fs.writeFile(output, compiled);
  });
}

generate();
