import { randomUUID } from 'node:crypto';

/**
 * Generate a new object with the same keys as the input object, but with random UUIDs as values.
 * @param obj The object to generate a new object from.
 * @returns object with the same keys as the input object, but with random UUIDs as values.
 * @example
 * const seedNames = { name1: '', name2: '' };
 * const newObj = generateUUID(obj); // { name1: 'a1b2c3d4-...', name2: 'e5f6g7h8-...' }
 */
export function generateUUID<T extends Record<string, string>>(obj: T): T {
  const newObj = { ...obj };
  for (const key in newObj) {
    newObj[key] = randomUUID() as T[Extract<keyof T, string>];
  }
  return newObj;
}
