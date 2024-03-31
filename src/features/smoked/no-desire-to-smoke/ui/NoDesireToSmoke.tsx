import { StackActions } from '@react-navigation/native';
import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getIsAuth } from 'entities/auth';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { setUserWeekly } from 'entities/user';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTENT_IN_RADIUS } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { getWeekDay } from 'shared/lib/statistics/getWeekDay';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';

interface NoDesireToSmokeProps {
  disabled?: boolean;
}

export const NoDesireToSmoke = ({ disabled }: NoDesireToSmokeProps) => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const isAuth = useAppSelector(getIsAuth);
  const isPremium = useAppSelector(getSubscriptionIsPremium);

  const { [AppSheet.NO_SMOKE]: noSmokeRef } = useContext(SheetCreateContext);

  const onPressHandler = () => {
    const weekDay = getWeekDay();

    dispatch(
      setUserWeekly({
        weeklyId: weekDay,
        weeklyType: 'success',
        premium: isPremium,
      }),
    );

    if (isAuth) {
      const pushAction = StackActions.push(AppNavigation.FEED_CREATE, {
        event: 'success',
      });
      navigation.dispatch(pushAction);
    } else {
      noSmokeRef?.current?.present();
    }
  };

  return (
    <CustomButton
      onPress={onPressHandler}
      background={[cn('emerald.700'), cn('emerald.600')]}
      radius={CONTENT_IN_RADIUS}
      disabled={disabled}>
      {t('home.buttons.iDontWant')}
    </CustomButton>
  );
};
