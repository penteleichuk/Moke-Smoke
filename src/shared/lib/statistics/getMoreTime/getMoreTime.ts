export const getMoreTime = (value: number) => {
  return Math.trunc(+((value * 3) / 60)) || 0;
};
