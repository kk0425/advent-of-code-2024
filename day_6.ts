import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

function parse(input: string): string[] {
  return input.trimEnd().split("\n");
}

function part1(input: string): number {
  const labMap = parse(input);
  let guardRow: number | undefined;
  let guardColumn: number | undefined;

  //find guard's starting position
  outer: for (let row = 0; row < labMap.length; row++) {
    for (let column = 0; column < labMap[row].length; column++) {
      if (labMap[row][column] === "^") {
        guardRow = row;
        guardColumn = column;
        break outer;
      }
    }
  }
  if (guardRow === undefined || guardColumn === undefined) {
    throw new Error("Guard not found.");
  }

  //move guard and step count logic
  const guardMovement = [[-1, 0], [0, 1], [1, 0], [0, -1]]; //up, right, down, left
  const guardUniqueSteps = new Set<string>();

  console.log(labMap[guardRow + guardMovement[3][0]][guardColumn + guardMovement[3][1]]);

  guardUniqueSteps.add(JSON.stringify([guardRow, guardColumn]));

  return guardUniqueSteps.size;
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
  assertEquals(part1(TEST_INPUT), 41);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
