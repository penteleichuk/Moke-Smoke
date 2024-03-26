import { SheetCreateContext } from 'app/providers/SheetProvider';
import { AppSheet } from 'app/providers/SheetProvider/SheetProvider';
import {
  getUserIsQuitting,
  getUserPricePack,
  getUserSmokeEveryDay,
} from 'entities/user';
import { getCurrency } from 'features/currency-picker';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Images from 'shared/assets/images';
import { CONTENT_PADDING } from 'shared/config/dimensions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { Row } from 'shared/ui/Row';
import { getCurrencySymbol } from 'shared/utils/getCurrencySymbol';
import { ProfilePicker } from 'widgets/profile-picker';
import { getDashboardDate } from './../../model/util/getDashboardDate/getDashboardDate';
import { ResultBoardItem } from './../ResultBoardItem/ResultBoardItem';
import { styles } from './ResultBoardStyle';

export const ResultBoard = () => {
  const { t } = useTranslation();

  const isQuitting = useAppSelector(getUserIsQuitting);
  const currency = useAppSelector(getCurrency);

  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);
  const pricePack = useAppSelector(getUserPricePack);

  const result = useMemo(() => {
    return getDashboardDate(isQuitting, smokeEveryDay, pricePack);
  }, [isQuitting, smokeEveryDay, pricePack]);

  const {
    [AppSheet.BANK]: bankRef,
    [AppSheet.LONGEViTY]: longevityRef,
    [AppSheet.NO_USE_CIGARETTES]: noUseRef,
    [AppSheet.HEALTH]: healthRef,
    [AppSheet.ENERGY]: energyRef,
    [AppSheet.LUNGS]: lungsRef,
  } = useContext(SheetCreateContext);

  const currencySymbol = useMemo(() => {
    return getCurrencySymbol(currency);
  }, [currency]);

  const onPressBankHandler = () => {
    isQuitting && bankRef?.current?.present();
  };

  const onPressMoreTimeHandler = () => {
    isQuitting && longevityRef?.current?.present();
  };

  const onPressCiggyHandler = () => {
    isQuitting && noUseRef?.current?.present();
  };

  const onPressHealthHandler = () => {
    isQuitting && healthRef?.current?.present();
  };

  const onPressEnergyHandler = () => {
    isQuitting && energyRef?.current?.present();
  };

  const onPressLungsHandler = () => {
    isQuitting && lungsRef?.current?.present();
  };

  return (
    <View style={[styles.container]}>
      <ProfilePicker />

      <View style={[styles.items]}>
        <Row gap={CONTENT_PADDING}>
          <ResultBoardItem
            onPress={onPressBankHandler}
            sum={result.money}
            value={t('home.dashboard.0.value', {
              value: ' ' + currencySymbol,
            })}
            title={t('home.dashboard.0.name')}
            Icon={Images.MoneyIcon}
          />
          <ResultBoardItem
            onPress={onPressMoreTimeHandler}
            sum={result.times}
            value={t('home.dashboard.1.value', {
              value: '',
            })}
            title={t('home.dashboard.1.name')}
            Icon={Images.TimeIcon}
          />
        </Row>
        <Row gap={CONTENT_PADDING}>
          <ResultBoardItem
            onPress={onPressCiggyHandler}
            sum={result.smoke}
            value={t('home.dashboard.2.value', {
              value: '',
            })}
            title={t('home.dashboard.2.name')}
            Icon={Images.SmokeIcon}
          />
          <ResultBoardItem
            onPress={onPressHealthHandler}
            sum={result.life}
            value={t('home.dashboard.3.value', {
              value: '',
            })}
            title={t('home.dashboard.3.name')}
            Icon={Images.LongIcon}
          />
        </Row>
        <Row gap={CONTENT_PADDING}>
          <ResultBoardItem
            onPress={onPressEnergyHandler}
            sum={result.energy}
            value={t('home.dashboard.4.value', {
              value: '',
            })}
            title={t('home.dashboard.4.name')}
            Icon={Images.EnergyIcon}
          />
          <ResultBoardItem
            onPress={onPressLungsHandler}
            sum={result.lungs}
            value={t('home.dashboard.5.value', {
              value: '',
            })}
            title={t('home.dashboard.5.name')}
            Icon={Images.LungsIcon}
          />
        </Row>
      </View>
    </View>
  );
};
