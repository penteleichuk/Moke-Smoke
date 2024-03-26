import {
  FeedEvent,
  FeedEventTypes,
  FeedIconEmotion,
  FeedType,
} from 'entities/feed';
import { addUserCoint } from 'entities/user';
import { useFeedLiked } from 'features/feed/feed-liked';
import { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, View } from 'react-native';
import Tooltip from 'rn-tooltip';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { LikeTooltip } from './../LikeTooltip/LikeTooltip';
import { styles } from './FeedLikedStyle';

type FeedLikedProps = {
  isAuth: boolean;
  isLiked: FeedEvent | null;
  item: FeedType;
  totalLikes?: number;
  setData?: (value: FeedType) => void;
};

export const ICON_SIZE = moderateScale(20);

export const FeedLiked = memo((props: FeedLikedProps) => {
  const { isAuth, isLiked, totalLikes, item, setData } = props;
  const { cn } = useTheme();
  const { t } = useTranslation();
  const { liked } = useFeedLiked();
  const dispatch = useAppDispatch();

  const tooltipRef = useRef<Tooltip>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [isLike, setIsLike] = useState(isLiked);

  useEffect(() => {
    if (isLiked && isLiked !== isLike) {
      Animated.spring(scaleAnim, {
        toValue: 3,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [isLiked, isLike]);

  const handlePress = async (eventType: FeedEventTypes, id: string) => {
    const res = await liked(eventType, id);

    if (res.status === 'error') {
      DisplayMessage({
        message: t('message.error.network.title'),
        description: t('message.error.network.message'),
        type: 'danger',
      });
    } else {
      dispatch(addUserCoint(1));
      res.response && setData && setData(res.response);
      setIsLike(isLiked);
    }
  };

  return (
    <Tooltip
      ref={tooltipRef}
      actionType={isAuth && !isLiked ? 'press' : 'none'}
      popover={
        <LikeTooltip
          onLikedHandler={handlePress}
          id={item._id}
          tooltipRef={tooltipRef}
        />
      }
      overlayColor={cn('slate.800') + '99'}
      pointerColor={cn('slate.600')}
      backgroundColor={cn('slate.600')}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: !isLiked
              ? cn('slate.700', 'slate.100')
              : cn('slate.600', 'slate.200'),
          },
        ]}>
        {item.likes[0]?.eventType ? (
          <Animated.Image
            source={FeedIconEmotion[item.likes[0]?.eventType]}
            style={[styles.image, { transform: [{ scale: scaleAnim }] }]}
          />
        ) : (
          <Icons.Like
            fill={cn('slate.300', 'slate.500')}
            width={ICON_SIZE}
            height={ICON_SIZE}
          />
        )}
        {totalLikes !== undefined && (
          <CustomText style={{ color: cn('slate.300', 'slate.500') }}>
            {totalLikes}
          </CustomText>
        )}
      </View>
    </Tooltip>
  );
});
