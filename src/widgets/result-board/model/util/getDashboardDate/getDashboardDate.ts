import { getCigaretteSavings } from 'shared/utils/getCigaretteSavings';
import { parseValidDate } from 'shared/utils/parseValidDate';
import { getEnergy } from 'shared/utils/statistics/getEnergy';
import { getHelath } from 'shared/utils/statistics/getHelath';
import { getLungs } from 'shared/utils/statistics/getLungs';
import { getMoreTime } from 'shared/utils/statistics/getMoreTime';
import { getUnsmokedCigarettesCount } from 'shared/utils/statistics/getUnsmokedCigarettesCount';

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
