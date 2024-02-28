import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthByApple } from 'features/AuthByApple';
import { Login } from 'features/AuthByEmail';
import { AuthByGoogle } from 'features/AuthByGoogle';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { getCountry } from 'shared/lib/utils/getCountry';
import { isIos } from 'shared/lib/utils/isIos';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { PrivacyPolice } from 'widgets/PrivacyPolice';
import { styles } from './AuthScreenStyle';

type AuthScreenType = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.AUTH
>;

const IS_IOS = isIos();
const country = getCountry();

export const AuthScreen = ({ navigation, route }: AuthScreenType) => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  const onPressNavigationRegistration = () => {
    navigation.navigate(AppNavigation.REGISTRATION, {
      show: route.params?.show,
    });
  };

  const onPressNavigationForgot = () => {
    navigation.navigate(AppNavigation.FORGOT, { show: route.params?.show });
  };

  const onPressNavigationPreview = () => {
    navigation.navigate(AppNavigation.WELCOME_INFO);
  };

  const onPressNavigationNext = () => {
    navigation.navigate(AppNavigation.SUBS, { show: true });
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.avoiding}
        behavior={IS_IOS ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Login
            backgroundColor={[cn('indigo.500'), cn('indigo.600')]}
            Header={
              <CustomText
                size={TextSize.S_3XL}
                weight={TextWeight.BOLD}
                style={[styles.title, { color: cn('white', 'black') }]}>
                {t('settings.auth.info')}
              </CustomText>
            }
            navigation={navigation}
            route={route}>
            <View>
              <PressableOpacity
                style={styles.link}
                onPress={onPressNavigationForgot}>
                <CustomText
                  size={TextSize.S_LG}
                  style={[{ color: cn('indigo.300', 'indigo.500') }]}>
                  {t('sheet.login.link.forgot')}
                </CustomText>
              </PressableOpacity>
              <PrivacyPolice
                color={cn('slate.300', 'slate.700')}
                colorLink={cn('white', 'black')}
              />
            </View>
          </Login>
          <View>
            <CustomText
              size={TextSize.S_LG}
              style={[styles.or, { color: cn('slate.300', 'slate.700') }]}>
              {t('settings.auth.or')}
            </CustomText>

            <View style={styles.socials}>
              {IS_IOS && (
                <AuthByApple
                  backgroundColor={cn('slate.800', 'slate.300')}
                  color={cn('white', 'black')}
                  country={country}
                  navigation={navigation}
                  route={route}
                />
              )}
              <AuthByGoogle
                backgroundColor={cn('slate.800', 'slate.300')}
                color={cn('white', 'black')}
                country={country}
                navigation={navigation}
                route={route}
              />
            </View>

            <View style={styles.have}>
              <CustomText
                size={TextSize.S_LG}
                style={{ color: cn('slate.300', 'slate.700') }}>
                {t('sheet.login.link.have')}{' '}
              </CustomText>
              <PressableOpacity onPress={onPressNavigationRegistration}>
                <CustomText
                  size={TextSize.S_LG}
                  style={{ color: cn('indigo.300', 'indigo.500') }}>
                  {t('settings.auth.registration')}
                </CustomText>
              </PressableOpacity>
            </View>
          </View>

          {route.params?.show && (
            <NavigationSplash
              onPressBack={onPressNavigationPreview}
              onPressNext={onPressNavigationNext}
              nextText={t('welcome.nav.skip')}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContent>
  );
};
