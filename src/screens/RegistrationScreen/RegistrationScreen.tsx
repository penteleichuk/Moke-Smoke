import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthByApple } from 'features/AuthByApple';
import { Registration } from 'features/AuthByEmail';
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
import { styles } from './RegistrationScreenStyle';

type RegistrationScreenType = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.REGISTRATION
>;

const IS_IOS = isIos();
const country = getCountry();

export const RegistrationScreen = ({
  navigation,
  route,
}: RegistrationScreenType) => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  const onPressAuthHandler = () => {
    navigation.navigate(AppNavigation.AUTH, { show: route.params?.show });
  };

  const onPressBackHandler = () => {
    navigation.navigate(AppNavigation.WELCOME_INFO);
  };

  const onPressNextHandler = () => {
    navigation.navigate(AppNavigation.SUBS, { show: true });
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.avoiding}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <Registration
            Header={
              <CustomText
                size={TextSize.S_3XL}
                weight={TextWeight.BOLD}
                style={[styles.title, { color: cn('white', 'black') }]}>
                {t('settings.auth.registration')}
              </CustomText>
            }
            backgroundColor={[cn('indigo.500'), cn('indigo.600')]}
            navigation={navigation}>
            <PrivacyPolice
              color={cn('slate.300', 'slate.700')}
              colorLink={cn('white', 'black')}
            />
          </Registration>
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
                {t('sheet.login.link.ihave')}{' '}
              </CustomText>
              <PressableOpacity onPress={onPressAuthHandler}>
                <CustomText
                  size={TextSize.S_LG}
                  style={{ color: cn('indigo.300', 'indigo.500') }}>
                  {t('settings.auth.login')}
                </CustomText>
              </PressableOpacity>
            </View>
          </View>

          {route.params?.show && (
            <NavigationSplash
              onPressBack={onPressBackHandler}
              onPressNext={onPressNextHandler}
              nextText={t('welcome.nav.skip')}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContent>
  );
};
