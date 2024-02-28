import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { getUserIsPremium, getUserIsQuitting } from 'entities/user';
import { CoverIcons, OpenCardProgress } from 'features/OpenCardProgress';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './ProgressScreenStyle';

type ProgressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.PROGRESS
>;

export const ProgressScreen = ({ navigation }: ProgressScreenProps) => {
  const isQuitting = useAppSelector(getUserIsQuitting);
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const { cn } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const quittingDate = useMemo(() => {
    if (!isQuitting) {
      return 0;
    }
    return +moment().diff(isQuitting, 'days');
  }, [isQuitting]);

  const days = new Array(22).fill(null).map((_, index) => ({
    index: index,
    day: t('help.progress.day'),
  }));

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <View style={styles.header}>
              <CustomText
                size={TextSize.S_3XL}
                style={{ color: cn('white', 'black') }}>
                {t('help.header.progress.title')}
              </CustomText>
              <CustomText
                size={TextSize.S_LG}
                style={{ color: cn('slate.200', 'slate.800') }}>
                {t('help.header.progress.description')}
              </CustomText>
            </View>
          }
          data={days}
          numColumns={2}
          renderItem={({ item, index }) => (
            <OpenCardProgress
              key={index}
              {...item}
              Icon={CoverIcons[index]}
              index={index}
              formatData={quittingDate}
              toBegin={isQuitting}
              isPremium={isPremium || isUserPremium}
            />
          )}
        />
      </View>
    </ScreenContent>
  );
};
