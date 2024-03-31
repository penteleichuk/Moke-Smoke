import { FeedType } from 'entities/feed';
import { memo, RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorValue, StyleSheet, View } from 'react-native';
import Tooltip from 'rn-tooltip';
import { AppNavigation, AppTabNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { CustomText } from 'shared/ui/CustomText';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { useFeedDelete } from './../model/lib/hooks/useFeedDelete';
import { useReportCreate } from './../model/lib/hooks/useReportCreate';

type FeedPressingProps = {
  userId: string;
  feedId: string;
  postId?: string;
  authorId: string;
  tooltipRef: RefObject<Tooltip>;
  textColor: ColorValue;
  setData: React.Dispatch<React.SetStateAction<FeedType>>;
};

export const FeedPressing = memo((props: FeedPressingProps) => {
  const { userId, authorId, textColor, tooltipRef, feedId, postId, setData } =
    props;
  const { remove } = useFeedDelete();
  const { create } = useReportCreate();
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const onPressRemoveHandler = async () => {
    tooltipRef?.current?.toggleTooltip();

    try {
      const res = await remove(feedId, postId);
      if (res.type === 'feed') {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: AppNavigation.MAIN,
              state: {
                routes: [
                  {
                    name: AppTabNavigation.FEEDS,
                  },
                ],
              },
            },
          ],
        });
      } else if (res.type === 'comment') {
        setData((prevData: FeedType) => {
          return {
            ...prevData,
            comments: [...prevData.comments.filter(el => el._id !== postId)],
          };
        });
      }
    } catch (error) {}
  };

  const onPressReportHandler = async () => {
    tooltipRef?.current?.toggleTooltip();

    const res = await create({ feed: feedId, commentId: postId });
    if (res.status === 'success') {
      DisplayMessage({
        message: t('feed.message.title'),
        description: t('feed.message.success'),
        type: 'success',
      });
    } else {
      if (res.type === 'Not Found') {
        DisplayMessage({
          message: t('feed.message.title'),
          description: t('feed.message.isset'),
          type: 'danger',
        });
      } else {
        DisplayMessage({
          message: t('message.error.network.title'),
          description: t('message.error.network.message'),
          type: 'danger',
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      {userId === authorId ? (
        <PressableOpacity onPress={onPressRemoveHandler}>
          <CustomText style={{ color: textColor }}>
            {t('feed.tooltip.remove')}
          </CustomText>
        </PressableOpacity>
      ) : (
        <PressableOpacity onPress={onPressReportHandler}>
          <CustomText style={{ color: textColor }}>
            {t('feed.tooltip.report')}
          </CustomText>
        </PressableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
