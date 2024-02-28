import moment from 'moment';

const getMinusPercent = (value: number, percent: number) => {
  return value - (value * percent) / 100;
};

export const getCigaretteSavings = (
  beginDate: any,
  cigarettesDay = 0,
  percent = 0,
) => {
  const diffHours = moment().diff(beginDate, 'hours');
  const result = (diffHours / getMinusPercent(24, percent)) * cigarettesDay;

  return Math.floor(result);
};
