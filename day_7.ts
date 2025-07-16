import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

type Equation = [number, number[]];
function parse(input: string) {
  return input.trimEnd().split("\n").map((item) => {
    const [answer, inputValues] = item.split(": ");
    return [Number(answer), inputValues.split(" ").map(Number)] as Equation;
  });
}

type Symbol = "+" | "*" | "||";
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

function generateAllPossibleOperatorListsPart2(equationLength: number): Combo[] {
  if (equationLength <= 0) return [[]];

  const smaller = generateAllPossibleOperatorListsPart2(equationLength - 1);
  const result: Combo[] = [];

  for (const c of smaller) {
    result.push([...c, "+"]);
    result.push([...c, "*"]);
    result.push([...c, "||"]);
  }
  return result;
}

function calculateCombo(numList: number[], opList: Symbol[]): number {
  return opList.reduce(
    (acc, op, i) => (op === "+" ? acc + numList[i + 1] : acc * numList[i + 1]),
    numList[0],
  );
}

function calculateComboPart2(numList: number[], opList: Symbol[]): number {
  return opList.reduce(
    (acc, op, i) => {
      const number = numList[i + 1];
      if (op === "+") {
        return acc + number;
      } else if (op === "*") {
        return acc * number;
      } else {
        return Number("" + acc + number);
      }
    },
    numList[0],
  );
}

function part1(input: string): number {
  const items = parse(input);

  return items.filter(([answer, numbers]) => {
    return generateAllPossibleOperatorLists(numbers.length - 1).some((opCombo) =>
      calculateCombo(numbers, opCombo) === answer
    );
  })
    .reduce((sum, [answer]) => sum + answer, 0);
}

function part2(input: string): number {
  const items = parse(input);

  return items.filter(([answer, numbers]) => {
    return generateAllPossibleOperatorListsPart2(numbers.length - 1).some((opCombo) =>
      calculateComboPart2(numbers, opCombo) === answer
    );
  })
    .reduce((sum, [answer]) => sum + answer, 0);
}

if (import.meta.main) {
  runPart(2024, 7, 1, part1);
  runPart(2024, 7, 2, part2);
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

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 11387);
});
