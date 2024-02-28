export const getSecondsToDate = (date?: Date) => {
  if (!date) {
    return 0;
  }

  const now = new Date();
  return parseFloat(
    ((new Date(date).getTime() - now.getTime()) / 1000).toFixed(),
  );
};
