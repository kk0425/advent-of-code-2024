export type Vector2 = [number, number];

export function addVectors(a: Vector2, b: Vector2): Vector2 {
  return [a[0] + b[0], a[1] + b[1]];
}

export function multiplyVector(vector: Vector2, scalar: number): Vector2 {
  return [vector[0] * scalar, vector[1] * scalar];
}

export function getLocationFromStringGrid(grid: string[], location: Vector2): string | undefined {
  if (grid[location[0]] === undefined) {
    return undefined;
  }
  return grid[location[0]][location[1]];
}
