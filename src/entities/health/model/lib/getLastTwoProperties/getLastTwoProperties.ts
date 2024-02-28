export function getLastProperties(
  obj: { [key: string]: number },
  count: number,
): number[] {
  const sortedKeys = Object.keys(obj).sort();
  const lastValues = sortedKeys.slice(-count).map(key => obj[key]);

  return lastValues;
}
