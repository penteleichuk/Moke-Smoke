import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { ToasterAuth, useFrinds } from 'entities/friends';
import Lottie from 'lottie-react-native';
import { useCallback, useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { Indicator } from 'shared/ui/Indicator';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ToasterNoConnection } from 'shared/ui/ToasterNoConnection';
import { FriendItem } from './../FriendItem/FriendItem';
import { HeaderRight } from './../HeaderRight/HeaderRight';
import { HeaderTitle } from './../HeaderTitle/HeaderTitle';
import { styles } from './FriendScreenStyle';

type FriendScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FRIEND
>;

export const FriendScreen = ({ navigation }: FriendScreenProps) => {
  const isAuth = useAppSelector(getIsAuth);
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchStatus,
    fetchNextPage,
    refetch,
    isError,
  } = useFrinds();

  const { cn } = useTheme();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    if (isAuth) {
      refetch();
    }
  }, [isAuth]);

  const friendCount = useMemo(() => {
    return !!data?.pages[0].data.length;
  }, [data]);

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage]);

  const onRefresh = useCallback(() => {
    if (!isFetchingNextPage) {
      refetch();
    }
  }, [hasNextPage, isFetchingNextPage]);

  const renderHeaderTitle = useCallback(() => {
    return <HeaderTitle />;
  }, []);

  const renderHeaderRight = useCallback(() => {
    return <HeaderRight />;
  }, []);

  return (
    <ScreenContent
      excludeEdges={['top']}
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      navigationOptions={{
        headerTitle: renderHeaderTitle,
        headerRight: renderHeaderRight,
      }}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        <View
          style={[
            styles.content,
            (!isAuth || isError || !friendCount) && styles.loading,
          ]}>
          {fetchStatus !== 'idle' && <Indicator />}

          {!isError && friendCount && isAuth && (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshing={false}
              onRefresh={onRefresh}
              automaticallyAdjustContentInsets={true}
              data={data?.pages.map(page => page.data).flat()}
              keyExtractor={item => item._id}
              onEndReached={onEndReached}
              renderItem={({ item }) => <FriendItem key={item._id} {...item} />}
            />
          )}

          {isAuth && !isError && fetchStatus === 'idle' && !friendCount && (
            <Lottie
              style={styles.animation}
              source={Anims.Empty}
              resizeMode={'cover'}
              autoPlay
              loop
            />
          )}

          {isError && (
            <Lottie
              style={styles.animation}
              source={Anims.NoWifi}
              resizeMode={'cover'}
              autoPlay
              loop
            />
          )}

          {!isAuth && (
            <Lottie
              style={styles.animation}
              source={Anims.DontAuth}
              resizeMode={'cover'}
              autoPlay
              loop
            />
          )}
        </View>

        <View>
          {isError && <ToasterNoConnection refetch={refetch} />}
          {!isAuth && <ToasterAuth />}
        </View>
      </View>
    </ScreenContent>
  );
};
