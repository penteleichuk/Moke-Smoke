import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomButton } from 'shared/ui/CustomButton';
import { InputText } from 'shared/ui/InputText';
import { RowGroup } from 'shared/ui/RowGroup';
import { ForgotStepType } from './../../model/const/forgot';
import { useForgot } from './../../model/lib/hooks/useForgot/useForgot';
import { emailForgotDto } from './../../model/validations/email';

interface ForgotSendProps {
  setEmail: (value: string) => void;
  setStep: (value: ForgotStepType) => void;
  backgroundColor: string[];
}

export const ForgotSend = memo(
  ({ backgroundColor, setEmail, setStep }: ForgotSendProps) => {
    const { t } = useTranslation();

    const { mutate: mutateSend, isLoading: isLoadingSend } = useForgot();

    const { control, handleSubmit } = useForm({
      defaultValues: {
        email: '',
      },
      resolver: yupResolver(emailForgotDto),
    });

    const onPressHandler = (data: { email: string }) => {
      mutateSend(data.email);
      setEmail(data.email);
      setStep(ForgotStepType.VERIFY);
    };

    return (
      <RowGroup gap={15}>
        <InputText
          autoCapitalize={'none'}
          autoComplete={'off'}
          autoCorrect={false}
          editable={!isLoadingSend}
          control={control}
          name={'email'}
          placeholder={t('sheet.forgot.input.email')}
        />
        <CustomButton
          disabled={isLoadingSend}
          background={backgroundColor}
          radius={10}
          onPress={handleSubmit(onPressHandler)}>
          {t('sheet.forgot.link.submit')}
        </CustomButton>
      </RowGroup>
    );
  },
);
