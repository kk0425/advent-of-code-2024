import { assertEquals } from "@std/assert";
import { runPart } from "@macil/aocd";
import { addVectors, getLocationFromStringGrid, multiplyVector, Vector2 } from "./vector2.ts";

function parse(input: string) {
  return input.trimEnd().split("\n");
}

function part1(input: string): number {
  const rows = parse(input);
  let xmasCount = 0;
  const searchStr = "XMAS";
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < rows[rowIndex].length; columnIndex++) {
      const stepCombos: Vector2[] = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];
      for (const step of stepCombos) {
        let isMatch = true;
        for (let searchIndex = 0; searchIndex < searchStr.length; searchIndex++) {
          const location: Vector2 = [rowIndex, columnIndex];
          if (
            searchStr[searchIndex] !==
              getLocationFromStringGrid(
                rows,
                addVectors(location, multiplyVector(step, searchIndex)),
              )
          ) {
            isMatch = false;
            break;
          }
        }
        if (isMatch) {
          xmasCount++;
        }
      }
    }
  }
  return xmasCount;
}

// function part2(input: string): number {
//   const items = parse(input);
//   throw new Error("TODO");
// }

if (import.meta.main) {
  runPart(2024, 4, 1, part1);
  // runPart(2024, 4, 2, part2);
}

const TEST_INPUT = `\
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 18);
});

// Deno.test("part2", () => {
//   assertEquals(part2(TEST_INPUT), 12);
// });
