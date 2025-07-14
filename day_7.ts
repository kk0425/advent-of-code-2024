import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

function parse(input: string) {
  return input.trimEnd().split("\n");
}

function part1(input: string): number {
  const items = parse(input);

  type Symbol = "+" | "*";
  type Combo = Symbol[];
  function generateAllPossibleOperatorLists(equationLength: number): Combo[] {
    if (equationLength <= 0) return [[]];

    const smaller = generateAllPossibleOperatorLists(equationLength - 1);
    const result: Combo[] = [];

    for (const c of smaller) {
      result.push([...c, "+"]);
      result.push([...c, "*"]);
    }
    return result;
  }

  type Equation = [number, number[]];
  const equations: Equation[] = items.map((item) => {
    const [answer, inputValues] = item.split(": ");
    return [Number(answer), inputValues.split(" ").map(Number)] as Equation;
  })
    .filter((equationLine) => {
      generateAllPossibleOperatorLists(equationLine[1].length - 1);
      return true;
    });

  //console.log(equations);
  //console.log(generateAllPossibleOperatorLists(equations[1][1].length - 1));
  throw new Error("TODO");
}

// function part2(input: string): number {
//   const items = parse(input);
//   throw new Error("TODO");
// }

if (import.meta.main) {
  runPart(2024, 7, 1, part1);
  // runPart(2024, 7, 2, part2);
}

const TEST_INPUT = `\
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 3749);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
