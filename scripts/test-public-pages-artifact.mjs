import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";

const root = resolve(process.env.NEXT_BUILD_DIST_DIR ?? "out");
const home = await readFile(resolve(root, "index.html"), "utf8");
assert.match(home, /<meta[^>]+name="viewport"[^>]+content="width=device-width/i);
assert.match(home, /EZY START · \$100 · one-page website/);
assert.doesNotMatch(home, /Under \$5k|\$5k–\$15k|\$15k–\$40k|\$40k\+/);
assert.equal(await exists(resolve(root, "command", "index.html")), false, "private Command Center routes must not ship in the public Pages artifact");
assert.ok(await exists(resolve(root, "vertex", "index.html")), "existing public concept route remains available");

for (const file of await listFiles(root)) {
  if (!file.endsWith(".js")) continue;
  const source = await readFile(file, "utf8");
  assert.doesNotMatch(source, /SUPABASE_SERVICE_ROLE_KEY|SERVICE_ROLE_KEY/, `server-only credential names must not appear in ${relative(root, file)}`);
}
console.log("PASS public Pages artifact: package form is exported, /command is absent, and browser assets contain no service-role credential names");

async function exists(path) {
  try { await readFile(path); return true; } catch { return false; }
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? listFiles(path) : [path];
  }));
  return nested.flat();
}
