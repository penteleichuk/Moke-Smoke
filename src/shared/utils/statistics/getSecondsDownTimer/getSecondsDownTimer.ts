import { parseValidDate } from 'shared/utils/parseValidDate';
import { dateDiffIn } from './../../dateDiffIn/dateDiffIn';

export const getSecondsDownTimer = (date: any, range = 5) => {
  let parseDate = parseValidDate(date);

  parseDate.setMinutes(parseDate.getMinutes() + range);

  const currentDate = new Date();
  if (parseDate > currentDate) {
    return dateDiffIn(parseDate, currentDate, 'seconds');
  }

  return 0;
};
