import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

function parse(input: string): Array<[number, number]> {
  return input.trimEnd().split("\n").map((line) => {
    return line.split(/\s+/).map(Number) as [number, number];
  });
}

function part1(input: string): number {
  const items = parse(input);
  const leftList = items
    .map((item) => item[0])
    .sort((a, b) => a - b);
  const rightList = items
    .map((item) => item[1])
    .sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < items.length; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }
  return totalDistance;
}

function part2(input: string): number {
  const items = parse(input);
  const leftList = items
    .map((item) => item[0]);
  const rightList = items
    .map((item) => item[1]);

  let totalSimilarityScore = 0;
  for (const leftItem of leftList) {
    let count = 0;
    for (const rightItem of rightList) {
      if (rightItem === leftItem) {
        count++;
      }
    }
    totalSimilarityScore += leftItem * count;
  }
  return totalSimilarityScore;
}

if (import.meta.main) {
  runPart(2024, 1, 1, part1);
  runPart(2024, 1, 2, part2);
}

const TEST_INPUT = `\
3   4
4   3
2   5
1   3
3   9
3   3
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 11);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 31);
});
