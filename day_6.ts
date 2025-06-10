import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

function parse(input: string): string[] {
  return input.trimEnd().split("\n");
}

function part1(input: string): number {
  const items = parse(input);
  let guardRow: number | undefined;
  let guardColumn: number | undefined;
  let guardSteps = 0;

  outer: for (let row = 0; row < items.length; row++) {
    for (let column = 0; column < items[row].length; column++) {
      if (items[row][column] === "^") {
        guardRow = row;
        guardColumn = column;
        break outer;
      }
    }
  }
  if (guardRow === undefined || guardColumn === undefined) {
    throw new Error("Guard not found.");
  }

  return guardSteps;
}

// function part2(input: string): number {
//   const items = parse(input);
//   throw new Error("TODO");
// }

if (import.meta.main) {
  runPart(2024, 6, 1, part1);
  // runPart(2024, 6, 2, part2);
}

const TEST_INPUT = `\
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 11);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
