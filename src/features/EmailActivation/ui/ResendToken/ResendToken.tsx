import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorValue, StyleSheet } from 'react-native';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';

interface ResendTokenProps {
  color: ColorValue;
  onPress: () => void;
}

export const ResendToken = memo(({ color, onPress }: ResendTokenProps) => {
  const { t } = useTranslation();

  return (
    <PressableOpacity onPress={onPress}>
      <CustomText size={TextSize.S_LG} style={[styles.resend, { color }]}>
        {t('verify.re')}
      </CustomText>
    </PressableOpacity>
  );
});

export const styles = StyleSheet.create({
  resend: {
    textAlign: 'center',
  },
});
