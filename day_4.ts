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
      const location: Vector2 = [rowIndex, columnIndex];
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

function part2(input: string): number {
  const rows = parse(input);
  let xmasCount = 0;
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < rows[rowIndex].length; columnIndex++) {
      const location: Vector2 = [rowIndex, columnIndex];
      if (getLocationFromStringGrid(rows, location) !== "A") {
        continue;
      }

      const upLeftNeighbor: Vector2 = [rowIndex - 1, columnIndex - 1];
      const upLeftNeighborValue = getLocationFromStringGrid(rows, upLeftNeighbor);
      if (upLeftNeighborValue !== "M" && upLeftNeighborValue !== "S") {
        continue;
      }

      const downRightNeighbor: Vector2 = [rowIndex + 1, columnIndex + 1];
      const downRightNeighborValue = getLocationFromStringGrid(rows, downRightNeighbor);
      const expectedDownRightNeighborValue = upLeftNeighborValue === "M" ? "S" : "M";
      if (downRightNeighborValue !== expectedDownRightNeighborValue) {
        continue;
      }

      const upRightNeighbor: Vector2 = [rowIndex - 1, columnIndex + 1];
      const upRightNeighborValue = getLocationFromStringGrid(rows, upRightNeighbor);
      if (upRightNeighborValue !== "M" && upRightNeighborValue !== "S") {
        continue;
      }

      const downLeftNeighbor: Vector2 = [rowIndex + 1, columnIndex - 1];
      const downLeftNeighborValue = getLocationFromStringGrid(rows, downLeftNeighbor);
      const expectedDownLeftNeighborValue = upRightNeighborValue === "M" ? "S" : "M";
      if (downLeftNeighborValue !== expectedDownLeftNeighborValue) {
        continue;
      }

      xmasCount++;
    }
  }
  return xmasCount;
}

if (import.meta.main) {
  runPart(2024, 4, 1, part1);
  runPart(2024, 4, 2, part2);
}

const TEST_INPUT = `\
....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX
`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 18);
});

Deno.test("part2", () => {
  assertEquals(
    part2(`\
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
`),
    9,
  );
});
