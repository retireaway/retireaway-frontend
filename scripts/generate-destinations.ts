import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

import destinations from "../data/destinations.json" with { type: "json" };

const dirname = path.dirname(url.fileURLToPath(import.meta.url));

const sorted = destinations.toSorted((a, b) => {
  const codePointA = a.id.codePointAt(0);
  const codePointB = b.id.codePointAt(0);

  if (codePointA === undefined || codePointB === undefined) {
    return 0;
  }

  return codePointA - codePointB;
});

{
  const relative = "../public/data/destinations";
  const absolute = path.join(dirname, relative);
  const file = path.join(absolute, "/index.json");

  await fs.mkdir(absolute, { recursive: true });
  await fs.writeFile(file, JSON.stringify(destinations));
}

{
  sorted.forEach(async (item) => {
    const relative = `../public/data/destinations/${item.id}`;
    const absolute = path.join(dirname, relative);
    const file = path.join(absolute, "/index.json");

    await fs.mkdir(absolute, { recursive: true });
    await fs.writeFile(file, JSON.stringify(item));
  });
}
