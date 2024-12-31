import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

interface Rule {
  x: number;
  y: number;
}

interface Input {
  pageOrderingRules: Array<Rule>;
  pagesUpdate: Array<Array<number>>;
}

function parse(input: string): Input {
  const [rulesStr, pagesStr] = input.trimEnd().split("\n\n");
  return {
    pageOrderingRules: rulesStr.split("\n").map((rule) => {
      const [x, y] = rule.split("|");
      return { x: Number(x), y: Number(y) };
    }),
    pagesUpdate: pagesStr.split("\n").map((pages) => {
      return pages.split(",").map(Number);
    }),
  };
}

function checkRules(rules: Array<Rule>, update: Array<number>): boolean {
  for (const rule of rules) {
    const xIndex = update.indexOf(rule.x);
    const yIndex = update.indexOf(rule.y);

    if (xIndex === -1 || yIndex === -1) {
      continue;
    }

    if (xIndex > yIndex) {
      return false;
    }
  }
  return true;
}

function part1(inputStr: string): number {
  const input = parse(inputStr);
  let result = 0;
  for (const update of input.pagesUpdate) {
    if (checkRules(input.pageOrderingRules, update)) {
      const middleIndex = Math.floor(update.length / 2);
      const middlePage = update[middleIndex];
      result += middlePage;
    }
  }
  return result;
}

// function part2(input: string): number {
//   const items = parse(input);
//   throw new Error("TODO");
// }

if (import.meta.main) {
  runPart(2024, 5, 1, part1);
  // runPart(2024, 5, 2, part2);
}

const TEST_INPUT = `\
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 143);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
