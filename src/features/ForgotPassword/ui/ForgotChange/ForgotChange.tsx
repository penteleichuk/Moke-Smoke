import { yupResolver } from '@hookform/resolvers/yup';
import {
  changePasswordForgotDto,
  useForgotAccept,
} from 'features/ForgotPassword';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'shared/ui/CustomButton';
import { InputText } from 'shared/ui/InputText';
import { RowGroup } from 'shared/ui/RowGroup';

interface ForgotChangeProps {
  setSubmit: (value: boolean) => void;
  email: string;
  token: string;
  submit: boolean;
  backgroundColor: string[];
  onSuccess: (value: boolean) => void;
}

export const ForgotChange = memo(
  ({
    backgroundColor,
    email,
    token,
    setSubmit,
    submit,
    onSuccess,
  }: ForgotChangeProps) => {
    const { t } = useTranslation();

    const { mutate, isLoading, isSuccess } = useForgotAccept();

    const { control, handleSubmit } = useForm({
      defaultValues: {
        password: '',
        repeatPassword: '',
      },
      resolver: yupResolver(changePasswordForgotDto),
    });

    const onPressPasswordHandler = (data: { password: string }) => {
      mutate({ email, forgotToken: token, password: data.password });
      setSubmit(true);
    };

    useEffect(() => {
      if (!isLoading && submit) {
        onSuccess(isSuccess);
      }
    }, [isLoading, isSuccess, submit]);

    return (
      <RowGroup gap={15}>
        <InputText
          autoCapitalize={'none'}
          autoComplete={'off'}
          autoCorrect={false}
          editable={!isLoading}
          control={control}
          name={'password'}
          placeholder={t('sheet.forgot.input.password')}
        />
        <InputText
          autoCapitalize={'none'}
          autoComplete={'off'}
          autoCorrect={false}
          editable={!isLoading}
          control={control}
          name={'repeatPassword'}
          placeholder={t('sheet.forgot.input.repeatPassword')}
        />
        <CustomButton
          disabled={isLoading}
          background={backgroundColor}
          radius={10}
          onPress={handleSubmit(onPressPasswordHandler)}>
          {t('sheet.forgot.link.change')}
        </CustomButton>
      </RowGroup>
    );
  },
);
