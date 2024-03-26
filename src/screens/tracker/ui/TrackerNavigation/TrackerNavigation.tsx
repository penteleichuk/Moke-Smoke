import { useTranslation } from 'react-i18next';
import { ColorValue, View } from 'react-native';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './TrackerNavigationStyle';

type TrackerNavigationProps = {
  isPremium: boolean;
  navigation: number;
  setNavigation: (value: number) => void;
  backgroundColor: ColorValue;
  color: ColorValue;
  colorActive: ColorValue;
  backgroundColorActive: ColorValue;
};

export const TrackerNavigation = ({
  navigation: nav,
  setNavigation,
  isPremium,
  backgroundColor,
  color,
  colorActive,
  backgroundColorActive,
}: TrackerNavigationProps) => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const onPressNav = (value: number) => {
    if (value === 0 && isPremium) {
      navigation.navigate(AppNavigation.SUBS);
      return;
    }

    if (nav !== value) {
      setNavigation(value);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <PressableOpacity
        style={[
          styles.button,
          nav === 0 && { backgroundColor: backgroundColorActive },
        ]}
        onPress={() => onPressNav(0)}>
        <CustomText
          style={[
            {
              color: nav === 0 ? colorActive : color,
            },
          ]}>
          {t('tracker.nav.1')}
        </CustomText>
      </PressableOpacity>
      <PressableOpacity
        style={[
          styles.button,
          nav === 1 && { backgroundColor: backgroundColorActive },
        ]}
        onPress={() => onPressNav(1)}>
        <CustomText
          style={[
            {
              color: nav === 1 ? colorActive : color,
            },
          ]}>
          {t('tracker.nav.2')}
        </CustomText>
      </PressableOpacity>
    </View>
  );
};
