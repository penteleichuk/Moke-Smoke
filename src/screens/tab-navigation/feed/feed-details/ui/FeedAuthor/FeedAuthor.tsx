import { getIsAuth } from 'entities/auth';
import {
  FeedAuthorType,
  FeedType,
  feedMoodPalette,
  isLiked,
} from 'entities/feed';
import { getUserId } from 'entities/user';
import { FeedLiked } from 'features/feed/feed-liked';
import { FeedPressing } from 'features/feed/feed-pressing';
import { memo, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Tooltip from 'rn-tooltip';
import * as Icons from 'shared/assets/icons';
import { truncateWithEllipsis } from 'shared/lib/format/truncateWithEllipsis';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarPile } from 'shared/ui/AvatarPile';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './FeedAuthorStyle';

type FeedAuthorProps = {
  item: FeedType;
  author: FeedAuthorType;
  setData: React.Dispatch<React.SetStateAction<FeedType>>;
};

export const FeedAuthor = memo((props: FeedAuthorProps) => {
  const { author, item, setData } = props;

  const { t } = useTranslation();
  const { cn } = useTheme();

  const tooltipNavRef = useRef<Tooltip>(null);

  const userId = useAppSelector(getUserId);
  const isAuth = useAppSelector(getIsAuth);

  const isLikedMemo = useMemo(() => {
    return isLiked(item.likes, userId);
  }, [item.likes, userId]);

  const avatarsMemo = useMemo(() => {
    return item.likes.map((el, index) => ({
      _id: el.author?._id || index,
      name: el.author?.name || 'NN',
      url: el.author?.avatarUrl,
    }));
  }, [item.likes]);

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
      <View style={styles.wrapper}>
        <Tooltip
          ref={tooltipNavRef}
          actionType={isAuth ? 'longPress' : 'none'}
          popover={
            <FeedPressing
              feedId={item._id}
              tooltipRef={tooltipNavRef}
              userId={userId}
              authorId={author._id}
              setData={setData}
              textColor={cn('white')}
            />
          }
          width={230}
          overlayColor={cn('slate.800') + '99'}
          pointerColor={cn('slate.600')}
          backgroundColor={cn('slate.600')}>
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
                  {truncateWithEllipsis(author?.name, 24)}
                </CustomText>
                <View
                  style={[
                    styles.die,
                    {
                      backgroundColor: cn(feedMoodPalette[item.eventType]),
                    },
                  ]}>
                  <CustomText style={{ color: cn('white') }}>
                    {t(`home.charts.${item.eventType}`)}
                  </CustomText>
                </View>
              </View>
              <CustomText
                size={TextSize.S_LG}
                style={{ color: cn('slate.300', 'slate.700') }}>
                {item.text}
              </CustomText>
            </View>
            <View style={styles.footer}>
              <AvatarPile
                avatarCount={3}
                avatars={avatarsMemo}
                textColor={cn('slate.400', 'slate.200')}
                backgroundColor={cn('slate.700', 'slate.400')}
                resultTextColor={cn('white', 'slate.200')}
                resultBackgroundColor={cn('slate.500', 'slate.400')}
              />
              <View style={styles.panel}>
                <FeedLiked
                  setData={setData}
                  isAuth={isAuth}
                  isLiked={isLikedMemo}
                  item={item}
                />
              </View>
            </View>
          </View>
        </Tooltip>
      </View>
    </View>
  );
});
