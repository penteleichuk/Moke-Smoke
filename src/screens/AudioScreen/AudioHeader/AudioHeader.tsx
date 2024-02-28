import { useTranslation } from 'react-i18next';
import { ColorValue, View } from 'react-native';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './AudioHeaderStyle';

interface AudioHeaderProps {
  titleColor: ColorValue;
  subtitleColor: ColorValue;
}

export const AudioHeader = ({
  titleColor,
  subtitleColor,
}: AudioHeaderProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <CustomText size={TextSize.S_3XL} style={{ color: titleColor }}>
        {t('audio.title')}
      </CustomText>
      <CustomText size={TextSize.S_LG} style={{ color: subtitleColor }}>
        {t('audio.header')}
      </CustomText>
    </View>
  );
};
