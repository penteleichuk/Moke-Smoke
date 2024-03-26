import { yupResolver } from '@hookform/resolvers/yup';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ColorValue, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { InputCode } from 'shared/ui/InputCode';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { RowGroup } from 'shared/ui/RowGroup';
import { codeDto } from 'shared/validations/code';
import { ForgotStepType } from './../../model/const/forgot';
import { useForgot } from './../../model/lib/hooks/useForgot/useForgot';

interface ForgotVerifyProps {
  setToken: (value: string) => void;
  setStep: (value: ForgotStepType) => void;
  setIsSendToken: (value: boolean) => void;
  email: string;
  isSendToken: boolean;
  color: ColorValue;
}

export const ForgotVerify = memo(
  ({
    color,
    setToken,
    setStep,
    email,
    isSendToken,
    setIsSendToken,
  }: ForgotVerifyProps) => {
    const { t } = useTranslation();

    const { mutate } = useForgot();

    const { control } = useForm({
      defaultValues: {
        code: '',
      },
      resolver: yupResolver(codeDto),
    });

    const onPressResendHandler = () => {
      if (!isSendToken) {
        setIsSendToken(true);
        mutate(email);
      }
    };

    const onSubmitCodeHandler = async (value: string) => {
      setToken(value);
      setStep(ForgotStepType.CHNAGE);
    };

    return (
      <RowGroup gap={15}>
        <InputCode
          cellCount={5}
          control={control}
          name={'code'}
          placeholder=" "
          onSubmit={onSubmitCodeHandler}
        />
        {!isSendToken && (
          <PressableOpacity onPress={onPressResendHandler}>
            <CustomText size={TextSize.S_LG} style={[styles.link, { color }]}>
              {t('verify.re')}
            </CustomText>
          </PressableOpacity>
        )}
      </RowGroup>
    );
  },
);

export const styles = StyleSheet.create({
  link: {
    textAlign: 'center',
    marginTop: moderateScale(10),
  },
});
