import { calculateTimeFromSteps, useFitnessAuthorize } from 'entities/health';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { getUserIsPremium } from 'entities/user';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { Indicator } from 'shared/ui/Indicator';
import { HealthSpeedometer } from 'widgets/health-speedometer';
import { TrackerHeader } from './../TrackerHeader/TrackerHeader';
import { TrackerNavigation } from './../TrackerNavigation/TrackerNavigation';
import { styles } from './TrackerAviableStyle';

export const TrackerAviable = () => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const [navigation, setNavigation] = useState(1);

  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const { isLoading, isError, step, distance } = useFitnessAuthorize();

  const timeInMinutes = useMemo(() => {
    return calculateTimeFromSteps(step[navigation] || 0);
  }, [step, navigation]);

  return (
    <>
      {isLoading && <Indicator />}
      {!isLoading && !isError && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <TrackerHeader
              titleColor={cn('white', 'black')}
              subtitleColor={cn('indigo.500')}
              step={step ? step[navigation] : 0}
              distance={distance ? distance[navigation] : 0}
              minutes={+timeInMinutes}
            />
            <View
              style={[
                styles.info,
                { backgroundColor: cn('slate.800', 'slate.100') },
              ]}>
              <CustomText style={[{ color: cn('white', 'black') }]}>
                {t('tracker.description')}
              </CustomText>
            </View>
            <View style={styles.wrapper}>
              <HealthSpeedometer
                isLoading={isLoading}
                step={step}
                timeInMinutes={timeInMinutes}
                navigation={navigation}
                color={cn('white', 'black')}
                backgroundColor={cn('slate.800', 'slate.200')}
              />
              <TrackerNavigation
                color={cn('white', 'black')}
                colorActive={cn('slate.300', 'slate.700')}
                backgroundColor={cn('slate.800', 'slate.100')}
                backgroundColorActive={cn('slate.700', 'slate.200')}
                navigation={navigation}
                setNavigation={setNavigation}
                isPremium={!isPremium && !isUserPremium}
              />
            </View>
          </View>
        </ScrollView>
      )}
      {isError && (
        <View
          style={[
            styles.info,
            { backgroundColor: cn('slate.800', 'slate.100') },
          ]}>
          <CustomText style={{ color: cn('white', 'black') }}>
            {t('tracker.error')}
          </CustomText>
        </View>
      )}
    </>
  );
};
