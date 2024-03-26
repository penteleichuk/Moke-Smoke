import { yupResolver } from '@hookform/resolvers/yup';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LoginType, fetchAuth } from 'entities/auth';
import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { CustomButton } from 'shared/ui/CustomButton';
import { InputText } from 'shared/ui/InputText';
import { RowGroup } from 'shared/ui/RowGroup';
import { useLogin } from './../model/lib/hooks/useLogin';
import { authValidation } from './../model/validation/auth.validation';

interface LoginProps {
  Header?: ReactElement;
  children?: ReactElement;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, AppNavigation.AUTH>;
  backgroundColor: string[];
}

export const Login = ({
  children,
  Header,
  navigation,
  route,
  backgroundColor,
}: LoginProps) => {
  const { mutate, isLoading, isSuccess, reset, data } = useLogin();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(authValidation),
  });

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      dispatch(
        fetchAuth({
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          user: data.user,
        }),
      );

      if (route.params?.show) {
        navigation.navigate(AppNavigation.SUBS, { show: true });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: AppNavigation.MAIN }],
        });
        resetField('email');
        resetField('password');
      }

      reset();
    }

    return () => {};
  }, [data, isLoading, isSuccess]);

  const onPressLoginHandler = (response: LoginType) => {
    mutate({ ...response });
  };

  return (
    <View>
      {Header}
      {isLoading && <ActivityIndicator size="large" />}
      <RowGroup gap={15}>
        <InputText
          autoCapitalize={'none'}
          autoComplete={'off'}
          autoCorrect={false}
          editable={!isLoading}
          control={control}
          name={'email'}
          placeholder={t('sheet.login.input.mail')}
        />
        <InputText
          editable={!isLoading}
          control={control}
          secureTextEntry={true}
          name={'password'}
          placeholder={t('sheet.login.input.password')}
        />
        {children}
        <CustomButton
          onPress={handleSubmit(onPressLoginHandler)}
          background={backgroundColor}
          radius={10}
          disabled={isLoading}>
          {t('sheet.login.link.fetch')}
        </CustomButton>
      </RowGroup>
    </View>
  );
};
