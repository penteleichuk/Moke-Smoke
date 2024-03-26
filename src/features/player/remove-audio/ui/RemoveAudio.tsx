import { useTranslation } from 'react-i18next';
import { Alert, ColorValue } from 'react-native';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { removeAllTracks } from './../model/services/remove-all-tracks';
import { styles } from './RemoveAudioStyle';

interface RemoveAudioProps {
  textColor: ColorValue;
}

export const RemoveAudio = ({ textColor }: RemoveAudioProps) => {
  const { t } = useTranslation();

  const onPressRemove = () => {
    Alert.alert(t('audio.dialog.title'), t('audio.dialog.description'), [
      { text: t('audio.dialog.btn1') },
      {
        text: t('audio.dialog.btn2'),
        onPress: () => {
          removeAllTracks();
        },
      },
    ]);
  };

  return (
    <PressableOpacity style={styles.text} onPress={onPressRemove}>
      <CustomText style={[styles.text, { color: textColor }]}>
        {t('audio.removeLink')}
      </CustomText>
    </PressableOpacity>
  );
};
