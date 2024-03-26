import { RemoveAudio } from 'features/player/remove-audio';
import { useTranslation } from 'react-i18next';
import { ColorValue } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from 'shared/ui/CustomText';
import { styles } from './AudioFooterStyle';

interface AudioFooterProps {
  textColor: ColorValue;
  linkColor: ColorValue;
}

export const AudioFooter = ({ textColor, linkColor }: AudioFooterProps) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <CustomText style={[styles.text, { color: textColor }]}>
        {t('audio.footer')}
      </CustomText>
      <RemoveAudio textColor={linkColor} />
    </SafeAreaView>
  );
};
