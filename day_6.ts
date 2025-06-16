import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";

function parse(input: string): string[] {
  return input.trimEnd().split("\n");
}

function part1(input: string): number {
  const labMap = parse(input);
  let guardPosition: [number | undefined, number | undefined] = [0, 0];

  //find guard's starting position
  outer: for (let row = 0; row < labMap.length; row++) {
    for (let column = 0; column < labMap[row].length; column++) {
      if (labMap[row][column] === "^") {
        guardPosition = [row, column];
        break outer;
      }
    }
  }
  if (guardPosition[0] === undefined || guardPosition[1] === undefined) {
    throw new Error("Guard not found.");
  }

  //move guard and step count logic
  const guardMovement = [[-1, 0], [0, 1], [1, 0], [0, -1]]; //up, right, down, left
  let guardDirection = 0;
  const guardUniqueLocations = new Set<string>();

  function addPair(guardPos: [number | undefined, number | undefined], direction: number): [number, number] {
    const guard = [0, 0];
    guard[0] = Number(guardPos[0]);
    guard[1] = Number(guardPos[1]);

    guard[0] += guardMovement[direction][0];
    guard[1] += guardMovement[direction][1];

    return guard as [number, number];
  }

  let guardCheck: [number, number] = addPair(guardPosition, guardDirection);
  let valueAtPosition: string = labMap[guardCheck[0]][guardCheck[1]];

  while (valueAtPosition !== undefined) {
    guardCheck = addPair(guardPosition, guardDirection);
    valueAtPosition = labMap[guardCheck[0]][guardCheck[1]]; //crashing here when getting type after out of bounds

    if (valueAtPosition === "#") {
      if (guardDirection < 3) {
        guardDirection++;
      } else {
        guardDirection = 0;
      }
    } else if (valueAtPosition === "." || valueAtPosition === "^") {
      guardUniqueLocations.add(JSON.stringify([guardPosition]));
      guardPosition = guardCheck;
      console.log("guard step: ", guardUniqueLocations.size); //test
    }
  }

  console.log("Guard final step count: ", guardUniqueLocations.size + 1);
  return guardUniqueLocations.size + 1;
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
