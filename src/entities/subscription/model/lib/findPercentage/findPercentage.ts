export const findPercentage = (num1: number, num2: number) => {
  return (((num2 - num1) / num2) * 100).toFixed();
};
