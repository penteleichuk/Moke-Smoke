import { getUserIsQuitting } from 'entities/user'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import * as Icons from 'shared/assets/icons'
import { moderateScale } from 'shared/config/dimensions'
import { AppNavigation } from 'shared/config/navigation'
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation'
import { useAppSelector } from 'shared/lib/hooks/useAppSelector'
import { useTheme } from 'shared/lib/theme'
import { CustomText, TextSize } from 'shared/ui/CustomText'
import { PressableOpacity } from 'shared/ui/PressableOpacity'
import { useSmoke } from './../model/lib/hooks/useSmoke/useSmoke'
import { styles } from './ProfilePickerStyle'

export const ProfilePicker = memo(() => {
  const { t } = useTranslation();
  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const isQuitting = useAppSelector(getUserIsQuitting);
  const dateQuitting = useSmoke(isQuitting);

  const onPressNavigationHandler = () => {
    navigation.navigate(AppNavigation.PROFILE);
  };

  return (
    <PressableOpacity onPress={onPressNavigationHandler}>
      <View style={[styles.container]}>
        <View style={styles.content}>
          <CustomText
            size={TextSize.S_2XL}
            style={[{ color: cn('white', 'black') }]}>
            {t('calendar.title', { value: dateQuitting })}
          </CustomText>
        </View>
        <View style={[styles.button, { backgroundColor: cn('indigo.500') }]}>
          <Icons.ArowRight
            width={moderateScale(10)}
            height={moderateScale(10)}
            fill={cn('white')}
          />
        </View>
      </View>
    </PressableOpacity>
  );
});
