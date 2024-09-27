/* eslint-disable prettier/prettier */
export function hasDuplicates(array: any[]) {
  return array.length !== new Set(array).size;
}
