// make.fun — "Funniest Time Machine Warning Label"
// Bounty: u-eager-stork-81-9647-funniest-time-machine-warning-f8add151
//
// Writes a single warning label for a time machine to /output/entry.txt.
// The label: your grandfather is load-bearing — touch him and the whole
// timeline comes down. The joke turns the grandfather paradox into a
// piece of structural engineering: grandad is not a person here, he is
// a load-bearing wall, and the safety notice treats removing him like
// knocking out a support beam. The surprise lands in the last two
// words ("Do not remove"), after the reader has already pictured a
// warning sticker on a machine that treats ancestry as architecture.
// Against the judge's brief: (1) it is a time machine warning label,
// not a generic joke; (2) the hazard is the grandfather paradox, turned
// into the joke instead of named flatly; (3) the surprise is saved for
// the last two words; (4) it keeps a straight face, phrased as a genuine
// safety notice; (5) no word is wasted — every phrase does work.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "WARNING: Your grandfather is load-bearing. Do not remove.";

// The gate: 1-120 Unicode code points, and not only white space. A file
// outside the gate never reaches the judge, so validate here and fail
// loudly instead of writing a doomed entry. Array.from counts Unicode
// code points rather than UTF-16 code units, so a character outside the
// Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 120;

function validateLength(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  return length;
}

function validateSingleLine(candidate: string): void {
  if (candidate.includes("\n") || candidate.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (candidate !== candidate.trim()) {
    throw new Error("entry must not start or end with white space");
  }
}

const length = validateLength(TEXT);
validateSingleLine(TEXT);
console.log(`entry OK: ${length} characters`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

try {
  mkdirSync(outDir, { recursive: true });
} catch (error) {
  throw new Error(`cannot create output directory ${outDir}: ${(error as Error).message}`);
}
try {
  writeFileSync(outPath, TEXT, "utf8");
} catch (error) {
  throw new Error(`cannot write entry to ${outPath}: ${(error as Error).message}`);
}
