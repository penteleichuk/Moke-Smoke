import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { getUserIsPremium } from 'entities/user';
import Lottie from 'lottie-react-native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { calculateReadingTime } from './../../model/lib/calculateReadingTime';
import { ReadItem } from './../ReadItem/ReadItem';
import { styles } from './ReadScreenStyle';

type CoverType = {
  title: string;
  text: string;
};

type ReadScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.READ
>;

export const ReadScreen = ({ navigation }: ReadScreenProps) => {
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const { cn } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const covers = t('help.course', { returnObjects: true }) as CoverType[];
  const coverTimes = useMemo(() => {
    const times = covers.map(el => calculateReadingTime(el.text));
    const timing = times.reduce((total, time) => total + time, 0);

    return { timing: timing.toString(), times };
  }, [covers]);

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          automaticallyAdjustContentInsets={true}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Lottie
                  style={styles.animation}
                  source={Anims.Book}
                  resizeMode={'cover'}
                  autoSize={true}
                  autoPlay
                />
                <View style={styles.content}>
                  <CustomText
                    size={TextSize.S_2XL}
                    style={{ color: cn('white', 'black') }}>
                    {t('help.header.course.title')}
                  </CustomText>
                  <CustomText
                    size={TextSize.S_LG}
                    style={{ color: cn('slate.200', 'slate.800') }}>
                    {`${coverTimes.timing} ${t('help.header.course.scondary')}`}
                  </CustomText>
                </View>
              </View>
              <CustomText
                style={[styles.info, { color: cn('slate.200', 'slate.800') }]}>
                {t('help.header.course.description')}
              </CustomText>
            </>
          }
          data={covers}
          renderItem={({ item, index }) => (
            <ReadItem
              key={index}
              {...item}
              index={index}
              time={coverTimes.times[index]}
              isPremium={isPremium || isUserPremium}
            />
          )}
        />
      </View>
    </ScreenContent>
  );
};
