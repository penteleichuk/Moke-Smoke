import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const useSmoke = (toBegin: Date | null) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(state => state + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatData = useMemo(() => {
    if (!toBegin) {
      return '0';
    }
    const now = moment();
    const duration = moment.duration(now.diff(toBegin));

    let durationString = '';
    if (duration.asDays() > 0) {
      durationString += `${duration.asDays().toFixed()}${t('times.d')} `;
    }
    if (duration.hours() > 0) {
      durationString += `${duration.hours().toString().padStart(2, '0')}${t(
        'times.h',
      )} `;
    }
    if (duration.minutes() > 0) {
      durationString += `${duration.minutes().toString().padStart(2, '0')}${t(
        'times.m',
      )} `;
    }
    if (duration.seconds() >= 0) {
      durationString += `${duration.seconds().toString().padStart(2, '0')}${t(
        'times.s',
      )}`;
    }

    return durationString;
  }, [timer]);

  return formatData;
};
