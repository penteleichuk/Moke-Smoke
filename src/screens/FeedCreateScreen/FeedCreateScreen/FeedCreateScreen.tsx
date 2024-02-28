import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FeedEvent as FeedEventType } from 'entities/feeds';
import { FeedCreatePost } from 'features/FeedCreatePost';
import { memo, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { FeedCarousel } from './../FeedCarousel/FeedCarousel/FeedCarousel';
import { FeedEvent } from './../FeedEvent/FeedEvent';
import { styles } from './FeedCreateScreenStyle';

type FeedCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FEED_CREATE
>;

export const FeedCreateScreen = memo(
  ({ navigation, route }: FeedCreateScreenProps) => {
    const event = route?.params?.event || FeedEventType.SUCCESS;

    const scrollRef = useRef<ScrollView>(null);

    const { cn } = useTheme();
    const { t } = useTranslation();
    const headerHeight = useHeaderHeight();

    const messageExample = useMemo(() => {
      return t(`feed.script.${event}`, {
        returnObjects: true,
      }) as [];
    }, [event]);

    return (
      <ScreenContent
        backgroundColor={cn('slate.900', 'slate.200')}
        navigation={navigation}
        excludeEdges={['top', 'bottom']}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={[styles.container]}>
          <View
            style={[
              styles.header,
              { paddingTop: headerHeight },
              { backgroundColor: cn('slate.800', 'slate.100') },
            ]}>
            <FeedEvent event={event} />
          </View>
          <View style={styles.message}>
            <View style={styles.info}>
              <CustomText
                size={TextSize.S_3XL}
                weight={TextWeight.MEDIUM}
                style={{ color: cn('white', 'black') }}>
                {t('feed.screen.title')}
              </CustomText>
              <CustomText
                size={TextSize.S_LG}
                style={[styles.text, { color: cn('white', 'black') }]}>
                {t('feed.screen.description2')}
              </CustomText>
            </View>
            <FeedCarousel items={messageExample} />
          </View>
        </ScrollView>
        <FeedCreatePost event={event} />
      </ScreenContent>
    );
  },
);
