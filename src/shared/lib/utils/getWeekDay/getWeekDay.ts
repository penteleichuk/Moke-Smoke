export const getWeekDay = () => {
  const fixDays = [6, 0, 1, 2, 3, 4, 5];
  return fixDays[new Date().getDay()];
};
