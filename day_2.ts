import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

function parse(input: string): Array<Array<number>> {
  return input
    .trimEnd()
    .split("\n")
    .map((line) => line.split(/\s+/).map(Number));
}

function checkReport(report: Array<number>): boolean {
  let allIncreasing = true;
  let allDecreasing = true;

  for (let i = 0; i < report.length - 1; i++) {
    if (report[i] >= report[i + 1]) {
      allIncreasing = false;
    }

    if (report[i] <= report[i + 1]) {
      allDecreasing = false;
    }

    const diff = Math.abs(report[i] - report[i + 1]);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }
  return allIncreasing || allDecreasing;
}

function part1(input: string): number {
  const reports = parse(input);
  const safeReports = reports.filter(checkReport);
  return safeReports.length;
}

// function part2(input: string): number {
//   const reports = parse(input);
//   throw new Error("TODO");
// }

if (import.meta.main) {
  runPart(2024, 2, 1, part1);
  // runPart(2024, 2, 2, part2);
}

const TEST_INPUT = `\
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 2);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
