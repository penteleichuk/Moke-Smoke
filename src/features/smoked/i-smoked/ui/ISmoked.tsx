import { StackActions } from '@react-navigation/native';
import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getIsAuth } from 'entities/auth';
import { getSubscriptionIsPremium } from 'entities/subscription';
import {
  addUserCoint,
  addUserRating,
  getUserCoin,
  getUserIsPremium,
  getUserRating,
  resetUserSmoke,
  setUserWeekly,
} from 'entities/user';
import { memo, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { CONTENT_IN_RADIUS } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { getWeekDay } from 'shared/utils/statistics/getWeekDay';

interface ISmokedProps {
  disabled?: boolean;
}

export const ISmoked = memo(({ disabled }: ISmokedProps) => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const { t } = useTranslation();
  const { cn } = useTheme();

  const isAuth = useAppSelector(getIsAuth);
  const userCoin = useAppSelector(getUserCoin);
  const userRating = useAppSelector(getUserRating);
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const { [AppSheet.SMOKE]: smokeRef } = useContext(SheetCreateContext);

  const onPressHandler = useCallback(() => {
    const weekDay = getWeekDay();
    dispatch(
      setUserWeekly({
        weeklyId: weekDay,
        weeklyType: 'danger',
        premium: isPremium,
      }),
    );
    dispatch(resetUserSmoke());

    if (isPremium || isUserPremium) {
      dispatch(addUserCoint(userCoin));
      dispatch(addUserRating(userRating));
    }

    if (isAuth) {
      const pushAction = StackActions.push(AppNavigation.FEED_CREATE, {
        event: 'danger',
      });
      navigation.dispatch(pushAction);
    } else {
      smokeRef?.current?.present();
    }
  }, []);

  return (
    <CustomButton
      onPress={onPressHandler}
      background={[cn('rose.600'), cn('rose.500')]}
      radius={CONTENT_IN_RADIUS}
      disabled={disabled}>
      {t('home.buttons.iSmoked')}
    </CustomButton>
  );
});
