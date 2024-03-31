import moment from 'moment';

export type BaseType =
  | 'year'
  | 'years'
  | 'y'
  | 'month'
  | 'months'
  | 'M'
  | 'week'
  | 'weeks'
  | 'w'
  | 'day'
  | 'days'
  | 'd'
  | 'hour'
  | 'hours'
  | 'h'
  | 'minute'
  | 'minutes'
  | 'm'
  | 'second'
  | 'seconds'
  | 's'
  | 'millisecond'
  | 'milliseconds'
  | 'ms';

export const dateDiffIn = (a: Date, b: Date, type: BaseType | undefined) => {
  const x = moment(a, 'L');
  const y = moment(b, 'LL');

  return x.diff(y, type);
};
