export const getUnsmokedCigarettesCount = (
  smokeSum: number,
  pricePackSmoking: number,
  cigarettesDay: number,
) => {
  return Math.trunc(+(smokeSum * (pricePackSmoking / cigarettesDay))) || 0;
};
