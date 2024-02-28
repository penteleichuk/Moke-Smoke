import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Lottie from 'lottie-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import * as Icons from 'shared/assets/icons';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText/ui/CustomText';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './WelcomeScreenStyle';

type WelcomeScreenType = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.WELCOME
>;

export const WelcomeScreen = React.memo(({ navigation }: WelcomeScreenType) => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const onPressNextHandler = () => {
    navigation.navigate(AppNavigation.WELCOME_INFO);
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Lottie source={Anims.Fire} autoPlay resizeMode={'cover'} />
          </View>
          <Icons.LogoName style={styles.logoName} />
        </View>
        <View style={styles.content}>
          <CustomText
            size={TextSize.S_LG}
            style={[styles.message, { color: cn('white', 'black') }]}>
            {t('welcome.message')}
          </CustomText>
        </View>
        <NavigationSplash
          onPressNext={onPressNextHandler}
          nextText={t('welcome.nav.start')}
        />
      </ScrollView>
    </ScreenContent>
  );
});
