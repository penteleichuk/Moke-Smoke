import { getSubscriptionIsPremium } from 'entities/subscription';
import {
  getUserAvatarUrl,
  getUserData,
  getUserIsPremium,
  getUserName,
} from 'entities/user';
import moment from 'moment';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { Purchase } from 'widgets/MarketPurchase';
import { MarketProfile } from './../MarketProfile/MarketProfile';
import { MarketStatistics } from './../MarketStatistics/MarketStatistics';
import { styles } from './MarketScreenStyle';

export const MarketScreen = () => {
  const { toBegin, coin, rating } = useAppSelector(getUserData);
  const name = useAppSelector(getUserName) || 'No Name';
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);
  const avatarUrl = useAppSelector(getUserAvatarUrl);

  const { cn } = useTheme();

  const lastActivity = useMemo(() => {
    return toBegin ? moment(toBegin).format('lll') : '';
  }, [toBegin]);

  return (
    <ScreenContent backgroundColor={cn('slate.900', 'slate.200')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <MarketProfile
              name={name}
              avatarUrl={avatarUrl}
              lastActivity={lastActivity}
            />

            <MarketStatistics
              isPremium={isPremium || isUserPremium}
              coin={coin}
              rating={rating}
            />
          </View>
          <Purchase />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
