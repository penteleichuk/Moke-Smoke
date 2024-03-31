import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import * as Images from 'shared/assets/images';
import { CONTENT_PADDING } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { Row } from 'shared/ui/Row';
import { ButtonWithMotivation } from './../ButtonWithMotivation/ButtonWithMotivation';
import { styles } from './MotivationSectionStyle';

export const MotivationSection = memo(() => {
  const { cn } = useTheme();
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const onPressCourseHandler = useCallback(() => {
    navigation.navigate(AppNavigation.READ);
  }, []);

  const onPressCardsHandler = useCallback(() => {
    navigation.navigate(AppNavigation.CARDS);
  }, []);

  const onPressHypnosisHandler = useCallback(() => {
    navigation.navigate(AppNavigation.AUDIO);
  }, []);

  const onPressPedometerHandler = useCallback(() => {
    navigation.navigate(AppNavigation.TRACKER);
  }, []);

  const onPressTaskHandler = useCallback(() => {
    navigation.navigate(AppNavigation.TASK);
  }, []);

  const onPressEventHandler = useCallback(() => {
    navigation.navigate(AppNavigation.PROGRESS);
  }, []);

  const onPressHelp = () => {
    navigation.navigate(AppNavigation.NAVIGATION_HELP);
  };

  return (
    <>
      <View style={styles.header}>
        <CustomText
          size={TextSize.S_2XL}
          style={{ color: cn('white', 'black') }}>
          {t('home.header.nav.title')}
        </CustomText>
        <PressableOpacity onPress={onPressHelp}>
          <CustomText
            size={TextSize.S_LG}
            style={[{ color: cn('indigo.300', 'indigo.600') }]}>
            {t('navigation.help')}
          </CustomText>
        </PressableOpacity>
      </View>
      <View style={styles.content}>
        <Row gap={CONTENT_PADDING}>
          <ButtonWithMotivation
            title={t('home.header.nav.first')}
            onPressRoute={onPressCourseHandler}
            Icon={Icons.Knowledge}
            backgroundColor={cn('slate.800', 'white')}
          />
          <ButtonWithMotivation
            title={t('home.header.nav.next')}
            onPressRoute={onPressCardsHandler}
            Icon={Icons.Cards}
            backgroundColor={cn('slate.800', 'white')}
          />
        </Row>
        <Row gap={CONTENT_PADDING}>
          <ButtonWithMotivation
            title={t('home.header.nav.saving')}
            onPressRoute={onPressTaskHandler}
            Icon={Icons.Saving}
            backgroundColor={cn('slate.800', 'white')}
          />
          <ButtonWithMotivation
            title={t('help.header.progress.title')}
            onPressRoute={onPressEventHandler}
            Icon={Icons.Cover5}
            backgroundColor={cn('slate.800', 'white')}
          />
        </Row>
        <Row gap={CONTENT_PADDING}>
          <ButtonWithMotivation
            title={t('home.header.nav.hip')}
            onPressRoute={onPressHypnosisHandler}
            Image={Images.Hypnosis}
            backgroundColor={cn('slate.800', 'white')}
          />
          <ButtonWithMotivation
            title={t('home.header.nav.tracker')}
            onPressRoute={onPressPedometerHandler}
            Image={Images.Pedometer}
            backgroundColor={cn('slate.800', 'white')}
          />
        </Row>
      </View>
    </>
  );
});
