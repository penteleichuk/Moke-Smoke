import { usePeople } from 'entities/people';
import Lottie from 'lottie-react-native';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useTheme } from 'shared/lib/theme';
import { Indicator } from 'shared/ui/Indicator';
import { ScreenContentWithHeader } from 'shared/ui/ScreenContentWithHeader';
import { ToasterNoConnection } from 'shared/ui/ToasterNoConnection';
import { LeaderboardHeader } from 'widgets/LeaderboardHeader';
import { LeaderboardItem } from './../LeaderboardItem/LeaderboardItem';
import { styles } from './LeaderboardScreenStyle';

export const LeaderboardScreen = React.memo(() => {
  const [isVisible, setIsVisible] = useState(true);

  const {
    data,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    fetchStatus,
  } = usePeople();

  const { cn } = useTheme();

  const onEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = () => {
    if (!isFetchingNextPage) {
      refetch();
    }
  };

  const peoples = useMemo(() => {
    const temp = data?.pages.map(page => page.data).flat();

    const main = temp?.slice(0, 3) || [];
    const rest = temp?.slice(3) || [];

    return { main, rest };
  }, [data]);

  const onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (event.nativeEvent.contentOffset.y > 50) {
      setIsVisible(false);
    } else if (event.nativeEvent.contentOffset.y < 50) {
      setIsVisible(true);
    }
  };

  return (
    <ScreenContentWithHeader
      edges={['top']}
      headerTintColor={cn('slate.800', 'slate.200')}
      backgroundColor={cn('slate.900', 'slate.300')}
      contentHeader={
        <LeaderboardHeader
          isError={isError}
          isIsset={peoples.main.length > 0}
          isVisible={isVisible}
          items={peoples.main}
        />
      }>
      <View style={[styles.container, isError && styles.loading]}>
        {fetchStatus !== 'idle' && <Indicator />}
        {!isError && (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onScroll={onScrollHandler}
            scrollEventThrottle={3}
            refreshing={false}
            onRefresh={onRefresh}
            automaticallyAdjustContentInsets={true}
            data={peoples.rest}
            onEndReached={peoples.rest.length < 98 ? onEndReached : undefined}
            renderItem={({ item, index }) => (
              <LeaderboardItem key={item._id} index={index} {...item} />
            )}
          />
        )}
        {isError && (
          <Lottie
            style={styles.animation}
            source={Anims.NoWifi}
            autoPlay
            loop
          />
        )}
      </View>
      <View style={styles.toaster}>
        {isError && <ToasterNoConnection refetch={refetch} />}
      </View>
    </ScreenContentWithHeader>
  );
});
