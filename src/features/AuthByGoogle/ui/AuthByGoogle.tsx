import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchAuth } from 'entities/auth';
import { AuthApi } from 'entities/auth/model/api/authApi';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorValue, Platform, View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './AuthByGoogleStyle';

interface AuthByGoogleProps {
  country: string;
  backgroundColor: ColorValue;
  color: ColorValue;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<
    RootStackParamList,
    AppNavigation.AUTH | AppNavigation.REGISTRATION
  >;
}

export const AuthByGoogle = memo(
  ({
    backgroundColor,
    color,
    country,
    navigation,
    route,
  }: AuthByGoogleProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const [loading, setLoading] = useState<boolean>(false);

    const onGoogleButtonPress = useCallback(async () => {
      setLoading(true);
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const user = await AuthApi.google({
          idToken: userInfo.idToken || '',
          country: country,
        });

        if (user) {
          dispatch(fetchAuth(user));
          if (route.params?.show) {
            navigation.navigate(AppNavigation.SUBS, { show: true });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: AppNavigation.MAIN }],
            });
          }
        }
      } catch (err) {}
      setLoading(false);
    }, []);

    return (
      <>
        {Platform.OS === 'ios' ? (
          <PressableOpacity disabled={loading} onPress={onGoogleButtonPress}>
            <View
              style={[
                styles.button,
                {
                  backgroundColor: backgroundColor,
                },
              ]}>
              <Icons.Google width={30} height={30} />
            </View>
          </PressableOpacity>
        ) : (
          <PressableOpacity disabled={loading} onPress={onGoogleButtonPress}>
            <View
              style={[
                styles.buttonGoogle,
                {
                  backgroundColor: backgroundColor,
                },
              ]}>
              <Icons.Fit width={30} height={30} />
              <CustomText style={{ color: color }}>
                {t('settings.auth.button', { param: 'Google Fit' })}
              </CustomText>
            </View>
          </PressableOpacity>
        )}
      </>
    );
  },
);
