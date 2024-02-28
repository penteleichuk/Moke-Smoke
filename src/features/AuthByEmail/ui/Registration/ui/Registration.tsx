import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { resetUserSmoke } from 'entities/user';
import { ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { CustomButton } from 'shared/ui/CustomButton';
import { InputText } from 'shared/ui/InputText';
import { RowGroup } from 'shared/ui/RowGroup';
import { registrationDto } from './../../../model/validations/registration';
import { useLogin } from './../../Login/model/lib/hooks/useLogin';

interface RegistrationProps {
  backgroundColor: string[];
  Header?: ReactElement;
  children?: ReactElement;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

export const Registration = ({
  children,
  backgroundColor,
  Header,
  navigation,
}: RegistrationProps) => {
  const { mutate, isLoading, isSuccess, reset } = useLogin();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(registrationDto),
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      resetField('email');
      resetField('password');
      resetField('repeatPassword');
      dispatch(resetUserSmoke());
      navigation.push(AppNavigation.VERIFY);
    }

    return () => {
      reset();
    };
  }, [isSuccess]);

  return (
    <View>
      {Header}
      {isLoading && <ActivityIndicator size="large" />}
      <RowGroup gap={10}>
        <InputText
          autoCapitalize={'none'}
          autoComplete={'off'}
          autoCorrect={false}
          editable={!isLoading}
          control={control}
          name={'email'}
          placeholder={t('sheet.registration.input.email')}
        />
        <InputText
          editable={!isLoading}
          control={control}
          secureTextEntry={true}
          name={'password'}
          placeholder={t('sheet.registration.input.password')}
        />
        <InputText
          editable={!isLoading}
          control={control}
          secureTextEntry={true}
          name={'repeatPassword'}
          placeholder={t('sheet.registration.input.repeatPassword')}
        />
        {children}
        <CustomButton
          onPress={handleSubmit(args => mutate(args))}
          background={backgroundColor}
          radius={10}
          disabled={isLoading}>
          {t('sheet.registration.link.reg')}
        </CustomButton>
      </RowGroup>
    </View>
  );
};
