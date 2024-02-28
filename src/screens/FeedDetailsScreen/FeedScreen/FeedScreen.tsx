import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { FeedCommentType, FeedType } from 'entities/feeds';
import { FeedCreateComment } from 'features/FeedCreateComment';
import moment from 'moment';
import { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { FeedAuthor } from './../FeedAuthor/FeedAuthor';
import { FeedItem } from './../FeedItem/FeedItem';
import { styles } from './FeedScreenStyle';

type FeedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FEED
>;

export const FeedScreen = memo(({ navigation, route }: FeedScreenProps) => {
  const paramItem = route?.params?.item;
  const userId = route?.params?.userId;

  const [data, setData] = useState<FeedType>(paramItem as FeedType);

  const feedRef = useRef<FlashList<FeedCommentType>>(null);
  const { cn } = useTheme();
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();

  const scrollToEnd = useCallback(() => {
    const timeout = setTimeout(() => {
      if (data.comments.length > 1) {
        feedRef.current?.scrollToEnd({ animated: true });
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [feedRef, data.comments.length]);

  const onPressLoginHandler = () => {
    navigation.navigate(AppNavigation.AUTH);
  };

  return (
    <ScreenContent
      excludeEdges={['top', 'bottom']}
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      navigationOptions={{
        headerTitle: t('feed.comment'),
        headerTintColor: cn('white', 'black'),
        headerStyle: {
          backgroundColor: cn('slate.700', 'slate.300'),
        },
      }}>
      <View style={[styles.continaer, { paddingTop: headerHeight }]}>
        <FlashList
          ref={feedRef}
          estimatedItemSize={160}
          disableAutoLayout={true}
          keyExtractor={(item: FeedCommentType) => {
            return item._id;
          }}
          ListHeaderComponent={
            <>
              <View style={styles.contentContainer} />
              <View style={[styles.listHeader]}>
                <CustomText
                  size={TextSize.S_LG}
                  style={{ color: cn('slate.400', 'slate.600') }}>
                  {moment(paramItem.createdAt).format('lll')}
                </CustomText>
              </View>
              <FeedAuthor item={data} setData={setData} author={data.author} />
            </>
          }
          ListFooterComponent={<View style={[styles.footerContainer]} />}
          onContentSizeChange={scrollToEnd}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          data={data.comments || []}
          renderItem={({ item, index }) => (
            <FeedItem
              key={item._id}
              index={index}
              item={item}
              setData={setData}
              feedId={paramItem._id}
            />
          )}
        />
      </View>
      <FeedCreateComment
        feedId={data._id}
        setData={setData}
        userId={userId}
        scrollToEnd={scrollToEnd}
        onAuthCallBack={onPressLoginHandler}
      />
    </ScreenContent>
  );
});
