export const getEnergy = (value: number) => {
  return +(value * 0.02 || 0) < 100 ? +(value * 0.005 || 0).toFixed(2) : 100;
};
