import { ANDROID_PROMO_URL, IOS_PROMO_URL } from '@env';
import { getUserIsQuitting, initUserSmoke } from 'entities/user';
import { getIsActivation, setIsActivation } from 'features/passed-activation';
import { useTranslation } from 'react-i18next';
import { Linking } from 'react-native';
import { AppNavigation } from 'shared/config/navigation';
import { isIos } from 'shared/lib/isIos';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';

export const HeaderRight = () => {
  const isActivation = useAppSelector(getIsActivation);
  const isSmoking = useAppSelector(getUserIsQuitting);

  const { cn } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const onPressPromoHandler = () => {
    Linking.openURL(isIos() ? IOS_PROMO_URL : ANDROID_PROMO_URL);
  };

  const onPressNextHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: AppNavigation.MAIN }],
    });

    if (!isSmoking) {
      dispatch(initUserSmoke());
    }

    dispatch(setIsActivation(true));
  };

  return (
    <>
      {isActivation ? (
        <PressableOpacity onPress={onPressPromoHandler}>
          <CustomText
            size={TextSize.S_XL}
            style={{
              color: cn('white', 'black'),
            }}>
            Promo
          </CustomText>
        </PressableOpacity>
      ) : (
        <PressableOpacity onPress={onPressNextHandler}>
          <CustomText
            size={TextSize.S_XL}
            style={{
              color: cn('white', 'black'),
            }}>
            {t('welcome.nav.skip')}
          </CustomText>
        </PressableOpacity>
      )}
    </>
  );
};
