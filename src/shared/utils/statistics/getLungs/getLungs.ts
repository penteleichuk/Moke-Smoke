export const getLungs = (value: number) => {
  return +(value * 0.001 || 0) < 100 ? +(value * 0.001 || 0).toFixed(2) : 100;
};
