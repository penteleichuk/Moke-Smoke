import { getIsAuth } from 'entities/auth';
import { FeedCommentType, FeedType } from 'entities/feed';
import { getUserId } from 'entities/user';
import { FeedPressing } from 'features/feed/feed-pressing';
import moment from 'moment';
import { memo, useRef } from 'react';
import { View } from 'react-native';
import Tooltip from 'rn-tooltip';
import * as Icons from 'shared/assets/icons';
import { truncateWithEllipsis } from 'shared/lib/format/truncateWithEllipsis';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { Avatar } from 'shared/ui/Avatar';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './FeedItemStyle';

type FeedItemProps = {
  index: number;
  feedId: string;
  item: FeedCommentType;
  setData: React.Dispatch<React.SetStateAction<FeedType>>;
};

export const FeedItem = memo((props: FeedItemProps) => {
  const {
    item: { text, author, createdAt, _id },
    feedId,
    setData,
  } = props;

  const { cn } = useTheme();

  const tooltipNavRef = useRef<Tooltip>(null);
  const userId = useAppSelector(getUserId);
  const isAuth = useAppSelector(getIsAuth);

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
              feedId={feedId}
              postId={_id}
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
                {moment(createdAt).fromNow()}
              </CustomText>
            </View>
          </View>
        </Tooltip>
      </View>
    </View>
  );
});
