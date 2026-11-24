// Charm the Commuter: Forecast a City That Isn't
// Holds candidate one-line forecasts for invented cities, scores each on the
// five judge criteria (weights 5/4/3/2/1), picks the winner at runtime, writes
// it to /output/entry.txt and validates the gate (UTF-8, 1-140 chars,
// non-blank, exactly one line). Fails loudly on any violation.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

type Candidate = {
  city: string;
  line: string;
  // scores 0..2 per criterion, in judge order:
  // [form, smile, register, detail, economy]
  scores: [number, number, number, number, number];
};

const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    city: "New Umbria",
    line: "New Umbria: rain until eight, sun by nine, and the gulls are already arguing over the best puddle. High 17, low 11.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    city: "Port Sorrow",
    line: "Port Sorrow: fog until nine, then sun strong enough to read the apologies written on the harbour wall. High 19.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    city: "Marrowgate",
    line: "Marrowgate: drizzle till the nine o'clock ferry, then blue sky wide enough to dry every sock in the city. High 16.",
    scores: [2, 2, 2, 1, 1],
  },
  {
    city: "Dunmarra",
    line: "Dunmarra: heavy showers all morning; the river has again applied for planning permission. Flood watch till noon.",
    scores: [2, 2, 1, 2, 1],
  },
  {
    city: "Vessle",
    line: "Vessle: snow flurries over the glass quarter, settling on the roofs of the sleeping trams. Minus 2, feels like Monday.",
    scores: [2, 1, 2, 2, 1],
  },
  {
    city: "Ostwick",
    line: "Ostwick: bright and cold, with gusts strong enough to file the church bells under percussion. High 9.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    city: "Fort Lumen",
    line: "Fort Lumen: clear skies, light winds, and the streetlamps will come on early out of habit. High 21, low 12.",
    scores: [2, 1, 2, 1, 1],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function fail(msg: string): never {
  console.error(`GATE FAIL: ${msg}`);
  process.exit(1);
}

const ranked = [...CANDIDATES].sort((a, b) => total(b) - total(a));
for (const c of ranked) {
  console.log(`${total(c)}/30  ${c.city}  (${[...c.line].length} chars)`);
}
const winner = ranked[0];
console.log(`Winner: ${winner.city} — ${winner.line}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line + "\n", "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
const text = back.replace(/\n$/, "");
if (text.includes("\n")) fail("entry is not exactly one line");
const chars = [...text].length;
if (chars < 1 || chars > 140) fail(`entry is ${chars} chars, outside 1-140`);
if (text.trim().length === 0) fail("entry is blank");
if (text !== winner.line) fail("entry on disk differs from the winning line");
console.log(`GATE PASS: 1 line, ${chars} chars, non-blank -> /output/entry.txt`);
