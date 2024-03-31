import Lottie from 'lottie-react-native';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './ToasterAuthStyle';

export const ToasterAuth = memo(() => {
  const { t } = useTranslation();
  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const onPressAuthHandler = () => {
    navigation.navigate(AppNavigation.AUTH);
  };

  return (
    <View style={styles.container}>
      <Lottie style={styles.animation} source={Anims.NeedAuth} autoPlay loop />
      <CustomText
        size={TextSize.S_LG}
        style={[styles.text, { color: cn('white', 'black') }]}>
        {t('friend.notificationAuth.message')}
        <CustomText
          size={TextSize.S_LG}
          style={{ color: cn('blue.500') }}
          onPress={onPressAuthHandler}>
          {t('friend.notificationAuth.button')}
        </CustomText>
      </CustomText>
    </View>
  );
});
