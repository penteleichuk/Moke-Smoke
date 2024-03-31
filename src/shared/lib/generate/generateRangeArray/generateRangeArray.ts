export const generateRangeArray = (
  start: number,
  end: number,
): Array<number> => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};
