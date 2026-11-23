import { mkdirSync, writeFileSync } from "node:fs";

// One-line patch note for a bug in real life / human biology.
// Version + body are kept separate so the note stays a terse release-note
// line; the assembled text is validated against the gate (1-160 chars,
// non-blank, single line) before it is written.
const VERSION = "v2.4.0";
const BODY =
  "fixed a bug where the brain replayed the user's most embarrassing moment from 2009 every night at 3 a.m., with no skip button.";

const entry = `${VERSION}: ${BODY}`;

if (entry.length < 1 || entry.length > 160) {
  throw new Error(`entry must be 1-160 characters, got ${entry.length}`);
}
if (!entry.trim() || entry.includes("\n")) {
  throw new Error("entry must be non-blank and a single line");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
const dir = out.slice(0, out.lastIndexOf("/"));
if (dir) mkdirSync(dir, { recursive: true });
writeFileSync(out, entry, "utf8");
