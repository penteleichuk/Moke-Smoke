import { getCigaretteSavings } from 'shared/lib/utils/getCigaretteSavings';
import { getEnergy } from 'shared/lib/utils/getEnergy';
import { getHelath } from 'shared/lib/utils/getHelath';
import { getLungs } from 'shared/lib/utils/getLungs';
import { getMoreTime } from 'shared/lib/utils/getMoreTime';
import { getUnsmokedCigarettesCount } from 'shared/lib/utils/getUnsmokedCigarettesCount';
import { parseValidDate } from 'shared/lib/utils/parseValidDate';

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
