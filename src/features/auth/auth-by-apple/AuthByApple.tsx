import appleAuth from '@invertase/react-native-apple-authentication';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchAuth } from 'entities/auth';
import { useCallback, useState } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { AuthApi } from './../../../entities/auth/model/api/authApi';

interface AuthByAppleProps {
  country: string;
  backgroundColor: ColorValue;
  color: ColorValue;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<
    RootStackParamList,
    AppNavigation.AUTH | AppNavigation.REGISTRATION
  >;
}

export const AuthByApple = ({
  country,
  backgroundColor,
  color,
  navigation,
  route,
}: AuthByAppleProps) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onAppleButtonPress = useCallback(async () => {
    setLoading(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const user = await AuthApi.apple({
          idToken: appleAuthRequestResponse.identityToken || '',
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
      }
    } catch (err) {}
    setLoading(false);
  }, []);

  return (
    <PressableOpacity disabled={loading} onPress={onAppleButtonPress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: backgroundColor,
          },
        ]}>
        <Icons.Apple width={25} height={25} fill={color} />
      </View>
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(9),
  },
});
