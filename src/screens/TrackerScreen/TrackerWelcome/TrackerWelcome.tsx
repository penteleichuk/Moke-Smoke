import { TrackerInitial } from 'features/TrackerInitial';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import * as Icons from 'shared/assets/icons';
import { useTheme } from 'shared/lib/theme';
import { isIos } from 'shared/lib/utils/isIos';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { PrivacyPolice } from 'widgets/PrivacyPolice';
import { styles } from './TrackerWelcomeStyle';

const IS_IOS = isIos();

export const TrackerWelcome = () => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.animation}>
        <Lottie source={Anims.Walks} loop autoPlay />
      </View>
      <View style={styles.content}>
        <CustomText
          size={TextSize.S_3XL}
          weight={TextWeight.BOLD}
          style={{ color: cn('white', 'black') }}>
          {t('home.header.nav.tracker')}
        </CustomText>
        <CustomText
          style={[styles.text, { color: cn('slate.300', 'slate.700') }]}>
          {t('tracker.description')}
        </CustomText>
      </View>
      <View
        style={[
          styles.info,
          { backgroundColor: cn('slate.800', 'slate.100') },
        ]}>
        <PrivacyPolice
          color={cn('slate.300', 'slate.700')}
          colorLink={cn('white', 'black')}
        />
        {IS_IOS ? (
          <TrackerInitial
            backgroundColor={cn('indigo.500')}
            color={cn('white')}
            text={t('welcome.button')}
          />
        ) : (
          <TrackerInitial
            backgroundColor={cn('indigo.500')}
            color={cn('white')}
            Icon={Icons.Fit}
            text={'Google Fit'}
          />
        )}
      </View>
    </View>
  );
};
