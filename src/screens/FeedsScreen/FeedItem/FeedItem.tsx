import { getIsAuth } from 'entities/auth';
import { FeedType, feedMoodPalette, isLiked } from 'entities/feeds';
import { getUserId } from 'entities/user';
import { FeedLiked } from 'features/FeedLiked';
import moment from 'moment';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { substringStr } from 'shared/lib/utils/substringStr';
import { Avatar } from 'shared/ui/Avatar';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './FeedItemStyle';

type FeedItemType = {
  myUserId?: string;
  item: FeedType;
};

export const ICON_SIZE = moderateScale(20);

export const FeedItem = memo((props: FeedItemType) => {
  const { item, myUserId } = props;
  const {
    author,
    text,
    likes,
    totalComments,
    totalLikes,
    createdAt,
    eventType,
  } = item;

  const { t } = useTranslation();
  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const userId = useAppSelector(getUserId);
  const isAuth = useAppSelector(getIsAuth);

  const isLikedMemo = useMemo(() => {
    return isLiked(likes, userId);
  }, [likes, userId]);

  const onPressNavigation = () => {
    navigation.navigate(AppNavigation.FEED, { item, myUserId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          size={45}
          name={author?.name || ''}
          avatarUrl={author?.avatarUrl}
          textColor={cn('slate.400', 'slate.200')}
          backgroundColor={cn('slate.700', 'slate.400')}
        />
      </View>
      <View style={styles.rating}>
        <View style={styles.ratingPosition}>
          <Icons.Polygon fill={cn('indigo.500')} width={30} height={30} />
          <CustomText style={[styles.ratingValue, { color: cn('white') }]}>
            {author.rating || 0}
          </CustomText>
        </View>
      </View>
      <View
        style={[
          styles.content,
          { backgroundColor: cn('slate.800', 'slate.300') },
        ]}>
        <View style={styles.section}>
          <View style={styles.header}>
            <CustomText
              size={TextSize.S_LG}
              weight={TextWeight.MEDIUM}
              style={{ color: cn('white', 'black') }}>
              {substringStr(author?.name, 24)}
            </CustomText>
            <View
              style={[
                styles.die,
                {
                  backgroundColor: cn(feedMoodPalette[eventType]),
                },
              ]}>
              <CustomText style={{ color: cn('white') }}>
                {t(`home.charts.${eventType}`)}
              </CustomText>
            </View>
          </View>
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('slate.300', 'slate.700') }}>
            {text}
          </CustomText>
        </View>
        <View style={styles.footer}>
          <CustomText
            weight={TextWeight.BOLD}
            style={{ color: cn('slate.400', 'slate.800') }}>
            {moment(createdAt).format('ll')}
          </CustomText>
          <View style={styles.panel}>
            <PressableOpacity
              onPress={onPressNavigation}
              style={[
                styles.link,
                { backgroundColor: cn('slate.700', 'slate.200') },
              ]}>
              <Icons.Comment
                fill={cn('slate.300', 'slate.600')}
                width={ICON_SIZE}
                height={ICON_SIZE}
              />
              <CustomText style={[{ color: cn('slate.300', 'slate.600') }]}>
                {totalComments}
              </CustomText>
            </PressableOpacity>
            <FeedLiked
              isAuth={isAuth}
              isLiked={isLikedMemo}
              totalLikes={totalLikes}
              item={item}
            />
          </View>
        </View>
      </View>
    </View>
  );
});
