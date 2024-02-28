import { yupResolver } from '@hookform/resolvers/yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChangePasswordDto } from 'entities/user';
import {
  changePasswordValidation,
  useChangePassword,
} from 'features/ChangePassword';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { InputText } from 'shared/ui/InputText';
import { RowGroup } from 'shared/ui/RowGroup';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './ChangePasswordScreenStyle';

type ChangePasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.CHANGE_PASSWORD
>;

export const ChangePasswordScreen = ({
  navigation,
}: ChangePasswordScreenProps) => {
  const { mutate, isLoading } = useChangePassword();
  const { t } = useTranslation();
  const { cn } = useTheme();

  const { control, handleSubmit, resetField } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      repeatPassword: '',
    },
    resolver: yupResolver(changePasswordValidation),
  });

  const onPressChangePassword = (data: ChangePasswordDto) => {
    mutate({ ...data });
    resetField('password');
    resetField('newPassword');
    resetField('repeatPassword');
    navigation.goBack();
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View>
          <CustomText
            size={TextSize.S_4XL}
            style={[styles.title, { color: cn('white', 'black') }]}>
            {t('settings.auth.change')}
          </CustomText>
          <View style={styles.form}>
            <RowGroup gap={20}>
              <InputText
                placeholder={t('sheet.registration.input.password')}
                control={control}
                name={'password'}
                editable={!isLoading}
              />
              <InputText
                placeholder={t('sheet.registration.input.newPassword')}
                control={control}
                name={'newPassword'}
                editable={!isLoading}
              />
              <InputText
                placeholder={t('sheet.registration.input.repeatPassword')}
                control={control}
                name={'repeatPassword'}
                editable={!isLoading}
              />
              {isLoading && <ActivityIndicator size="large" />}
            </RowGroup>
            <CustomButton
              disabled={isLoading}
              onPress={handleSubmit(onPressChangePassword)}
              background={[cn('indigo.500'), cn('indigo.600')]}
              radius={10}>
              {t('sheet.registration.link.change')}
            </CustomButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScreenContent>
  );
};
