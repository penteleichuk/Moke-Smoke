import { FeedEvent as FeedEventEnum, FeedEventTypes } from 'entities/feed';
import Lottie from 'lottie-react-native';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './FeedEventStyle';

interface FeedEventProps {
  event: FeedEventTypes;
}

export const FeedEvent = memo(({ event }: FeedEventProps) => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  return (
    <View style={styles.container}>
      {event === FeedEventEnum.SUCCESS && (
        <>
          <CustomText
            size={TextSize.S_3XL}
            weight={TextWeight.MEDIUM}
            style={[styles.title, { color: cn('white', 'black') }]}>
            {t('detached.nosmoke.title')}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            style={[
              styles.description,
              { color: cn('slate.300', 'slate.700') },
            ]}>
            {t('detached.nosmoke.description')}
          </CustomText>
          <Lottie
            style={styles.animation}
            source={Anims.Coin}
            autoPlay
            loop={false}
          />
        </>
      )}
      {event === FeedEventEnum.WRONG && (
        <>
          <CustomText
            size={TextSize.S_3XL}
            weight={TextWeight.MEDIUM}
            style={[styles.title, { color: cn('white') }]}>
            {t('detached.smoke.title')}
          </CustomText>
          <Lottie style={styles.animation} source={Anims.Bad} autoPlay />
          <CustomText
            size={TextSize.S_LG}
            style={[styles.description, { color: cn('slate.300') }]}>
            {t('detached.smoke.description')}
          </CustomText>
        </>
      )}
      {event === FeedEventEnum.DANGER && (
        <>
          <CustomText
            size={TextSize.S_3XL}
            weight={TextWeight.MEDIUM}
            style={[styles.title, { color: cn('white') }]}>
            {t('detached.ghost.title')}
          </CustomText>
          <Lottie style={styles.animation} source={Anims.Want} autoPlay />
          <CustomText
            size={TextSize.S_LG}
            style={[styles.description, { color: cn('slate.300') }]}>
            {t('detached.ghost.description')}
          </CustomText>
        </>
      )}
    </View>
  );
});
