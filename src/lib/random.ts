export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number, decimals = 2): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

export function pick<T>(items: readonly T[]): T {
  return items[randomInt(0, items.length - 1)];
}

export function shuffledSample<T>(items: readonly T[], count: number): T[] {
  const pool = [...items];
  const result: T[] = [];
  while (result.length < count && pool.length > 0) {
    const index = randomInt(0, pool.length - 1);
    result.push(pool.splice(index, 1)[0]);
  }
  return result;
}

export const FIRST_NAMES = [
  "Ali",
  "Mohamed",
  "Meriem",
  "Sofienne",
  "Lyna",
  "Fatma",
  "Fedi",
  "Rayen",
  "Yemen",
  "Rim",
  "Rana",
  "Azouz",
  "Nour",
  "Amine",
] as const;

/** Strictly increasing sorted array, for binary-search-style exercises. */
export function randomSortedInts(length: number, min: number, max: number): number[] {
  const values = new Set<number>();
  while (values.size < length) {
    values.add(randomInt(min, max));
  }
  return [...values].sort((a, b) => a - b);
}
