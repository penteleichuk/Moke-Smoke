export const calculateAnimation = (
  inputMinutes: number,
  needMinutes: number,
  maxAnimDuration: number,
): number => {
  const temp = +((inputMinutes / needMinutes) * maxAnimDuration).toFixed();
  const res = temp > maxAnimDuration ? maxAnimDuration : temp;

  return res < 10 ? 10 : res;
};
