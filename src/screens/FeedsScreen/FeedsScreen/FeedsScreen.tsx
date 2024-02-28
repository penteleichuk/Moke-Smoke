import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { useFeeds } from 'entities/feeds';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import {
  AppNavigation,
  AppTabNavigation,
  RootStackParamList,
} from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { Indicator } from 'shared/ui/Indicator';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ToasterNoConnection } from 'shared/ui/ToasterNoConnection';
import { FeedItem } from './../FeedItem/FeedItem';
import { HeaderLeft } from './../HeaderLeft/HeaderLeft';
import { HeaderRight } from './../HeaderRight/HeaderRight';
import { styles } from './FeedsScreenStyle';

type FeedsScreenType = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FEEDS_ME | AppTabNavigation.FEEDS
>;

export const FeedsScreen = React.memo(
  ({ navigation, route }: FeedsScreenType) => {
    const [feedUpdateAt, setFeedUpdateAt] = useState<Date>(new Date());

    const isAuth = useAppSelector(getIsAuth);
    const userIdParams = route.params?.userId;

    const { cn } = useTheme();
    const { t } = useTranslation();

    const {
      data,
      isError,
      fetchNextPage,
      hasNextPage,
      refetch,
      isFetchingNextPage,
      fetchStatus,
    } = useFeeds(userIdParams);

    useFocusEffect(
      React.useCallback(() => {
        if (userIdParams) {
          return;
        }

        if (!isFetchingNextPage) {
          setFeedUpdateAt(new Date());
          refetch();
        }

        return () => {};
      }, [isFetchingNextPage]),
    );

    useEffect(() => {
      if (!isAuth) {
        navigation.setOptions({ headerLeft: undefined });
      }
    }, [isAuth]);

    const items = useMemo(
      () => data?.pages.map(page => page.data).flat(),
      [data],
    );

    const onEndReached = useCallback(() => {
      if (hasNextPage && !isFetchingNextPage) {
        setFeedUpdateAt(new Date());
        fetchNextPage();
      }
    }, [hasNextPage, isFetchingNextPage]);

    const onRefresh = useCallback(() => {
      if (!isFetchingNextPage) {
        setFeedUpdateAt(new Date());
        refetch();
      }
    }, [isFetchingNextPage]);

    const renderHeaderLeft = () => {
      if (isAuth) {
        return <HeaderLeft />;
      } else {
        return undefined;
      }
    };

    const renderHeaderRight = () => {
      return <HeaderRight />;
    };

    return (
      <ScreenContent
        excludeEdges={['top', 'bottom']}
        backgroundColor={cn('slate.900', 'slate.200')}
        navigation={navigation}
        navigationOptions={{
          headerStyle: {
            backgroundColor: cn('slate.700', 'slate.300'),
          },
          headerTintColor: cn('white', 'black'),
          headerTitle: userIdParams ? t('feed.title') : t('navigation.friends'),
          headerLeft: userIdParams ? undefined : renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}>
        <View style={[styles.content, isError && styles.contenetLoading]}>
          {fetchStatus !== 'idle' && <Indicator />}
          {!isError && items && items.length > 0 && (
            <FlatList
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  <CustomText
                    size={TextSize.S_LG}
                    style={{ color: cn('slate.400', 'slate.600') }}>
                    {moment(feedUpdateAt).format('lll')}
                  </CustomText>
                </View>
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshing={false}
              onRefresh={onRefresh}
              contentContainerStyle={[styles.contentContainer]}
              automaticallyAdjustContentInsets={true}
              data={items}
              onEndReached={onEndReached}
              renderItem={({ item }) => (
                <FeedItem key={item._id} myUserId={userIdParams} item={item} />
              )}
            />
          )}
          {!isError && items && items.length < 1 && (
            <View style={styles.contenetLoading}>
              <Lottie
                style={styles.anims}
                source={Anims.Emptys}
                autoPlay
                loop
              />
              <CustomText>{t('feed.empty')}</CustomText>
            </View>
          )}
          {isError && (
            <Lottie style={styles.anims} source={Anims.NoWifi} autoPlay loop />
          )}
        </View>
        {isError && (
          <View style={styles.footer}>
            <ToasterNoConnection refetch={refetch} />
          </View>
        )}
      </ScreenContent>
    );
  },
);
