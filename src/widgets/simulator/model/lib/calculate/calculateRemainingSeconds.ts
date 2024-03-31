import { dateDiffIn } from 'shared/lib/dates/dateDiffIn';
import { parseValidDate } from 'shared/lib/dates/parseValidDate';

export const calculateRemainingSeconds = (date: any, range = 5) => {
  let parseDate = parseValidDate(date);

  parseDate.setMinutes(parseDate.getMinutes() + range);

  const currentDate = new Date();
  if (parseDate > currentDate) {
    return dateDiffIn(parseDate, currentDate, 'seconds');
  }

  return 0;
};
