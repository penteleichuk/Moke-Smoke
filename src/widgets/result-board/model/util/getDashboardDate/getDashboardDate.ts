import { parseValidDate } from 'shared/lib/dates/parseValidDate';
import { getCigaretteSavings } from 'shared/lib/statistics/getCigaretteSavings';
import { getEnergy } from 'shared/lib/statistics/getEnergy';
import { getHelath } from 'shared/lib/statistics/getHelath';
import { getLungs } from 'shared/lib/statistics/getLungs';
import { getMoreTime } from 'shared/lib/statistics/getMoreTime';
import { getUnsmokedCigarettesCount } from 'shared/lib/statistics/getUnsmokedCigarettesCount';

export const getDashboardDate = (
  toBeginDate: any,
  cigarettesDay: number,
  pricePackSmoking: number,
  percent: number = 0,
) => {
  const beginDate = parseValidDate(toBeginDate) || 0;
  const smokeSum = getCigaretteSavings(beginDate, cigarettesDay, percent);

  const money = getUnsmokedCigarettesCount(
    smokeSum,
    pricePackSmoking,
    cigarettesDay,
  );

  const times = getMoreTime(smokeSum);
  const smoke = smokeSum || 0;
  const life = getHelath(smokeSum);
  const energy = getEnergy(smokeSum);
  const lungs = getLungs(smokeSum);

  return { money, times, smoke, life, energy, lungs };
};
