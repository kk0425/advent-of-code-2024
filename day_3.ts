import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

function part1(input: string): number {
  const regex = /mul\((\d+),(\d+)\)/g;
  const matches = input.matchAll(regex);
  let totalSum = 0;
  for (const match of matches) {
    totalSum += Number(match[1]) * Number(match[2]);
  }
  return totalSum;
}

function part2(input: string): number {
  const regex = /mul\((\d+),(\d+)\)|don't\(\)|do\(\)/g;
  const matches = input.matchAll(regex);
  let totalSum = 0;
  let multEnabled = true;
  for (const match of matches) {
    if (match[0] === "don't()") {
      multEnabled = false;
    } else if (match[0] === "do()") {
      multEnabled = true;
    } else if (multEnabled) {
      totalSum += Number(match[1]) * Number(match[2]);
    }
  }
  return totalSum;
}

if (import.meta.main) {
  runPart(2024, 3, 1, part1);
  runPart(2024, 3, 2, part2);
}

const TEST_INPUT = `\
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 161);
});

Deno.test("part2", () => {
  assertEquals(
    part2(
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
    ),
    48,
  );
});
