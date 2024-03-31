import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { FeedEvent } from 'entities/feed';
import { getNotificationIsEnabled } from 'entities/notification';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { setUserWeekly } from 'entities/user';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { getWeekDay } from 'shared/lib/statistics/getWeekDay';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { useSmokeNotifications } from './../../model/lib/notification/useSmokeNotifications';
import { styles } from './MindfulnessScreenStyle';

type MindfulnessScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.MINDFULNESS
>;

export const MindfulnessScreen = ({ navigation }: MindfulnessScreenProps) => {
  const isNotification = useAppSelector(getNotificationIsEnabled);
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isAuth = useAppSelector(getIsAuth);

  const dispatch = useAppDispatch();
  const headerHeight = useHeaderHeight();
  const { t } = useTranslation();
  const { cn } = useTheme();
  const { notification } = useSmokeNotifications();

  const onPressNextHandler = () => {
    isNotification && notification();

    dispatch(
      setUserWeekly({
        weeklyId: getWeekDay(),
        weeklyType: FeedEvent.WRONG,
        premium: isPremium,
      }),
    );

    if (isAuth) {
      navigation.push(AppNavigation.FEED_CREATE, { event: FeedEvent.WRONG });
    } else {
      navigation.push(AppNavigation.MAIN);
    }
  };

  const onPressBacktHandler = () => {
    navigation.navigate(AppNavigation.HAPPY);
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <ScrollView
        automaticallyAdjustContentInsets={true}
        bounces={false}
        bouncesZoom={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingTop: headerHeight },
        ]}>
        <View style={styles.header}>
          <CustomText
            size={TextSize.S_3XL}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'black') }}>
            {t('breathe.5.title')}
          </CustomText>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('green.500', 'green.600') }}>
            {t('breathe.5.description')}
          </CustomText>
        </View>
        <View style={[styles.content]}>
          <Lottie
            style={[styles.animation]}
            resizeMode={'cover'}
            source={Anims.Mindful}
            loop={true}
            autoPlay={true}
          />
          <CustomText
            size={TextSize.S_LG}
            style={[styles.text, { color: cn('slate.200', 'slate.800') }]}>
            {t('breathe.5.info')}
          </CustomText>
        </View>

        <View style={styles.footer}>
          <NavigationSplash
            onPressBack={onPressBacktHandler}
            onPressNext={onPressNextHandler}
          />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
