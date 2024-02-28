import { useQueryClient } from '@tanstack/react-query';
import {
  FeedApi,
  FeedEventTypes,
  FeedsQueryType,
  QUERY_KEY_FEED_ALL,
  QUERY_KEY_FEED_ME,
} from 'entities/feeds';
import { updateLikeStorage } from './../../updateLikeStorage/updateLikeStorage';
export const QUERY_KEY_FEED_LIKE = 'QUERY_KEY_FEED_LIK' as const;

export const useFeedLiked = () => {
  const queryClient = useQueryClient();

  const liked = async (eventType: FeedEventTypes, feedId: string) => {
    try {
      const response = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY_FEED_LIKE, feedId],
        queryFn: () => FeedApi.likePost(feedId, eventType),
      });

      queryClient.setQueryData<FeedsQueryType>([QUERY_KEY_FEED_ME], oldData =>
        updateLikeStorage(feedId, response, oldData),
      );

      queryClient.setQueryData<FeedsQueryType>([QUERY_KEY_FEED_ALL], oldData =>
        updateLikeStorage(feedId, response, oldData),
      );

      return { status: 'success', response };
    } catch (err) {
      return { status: 'error', response: null };
    }
  };

  return { liked };
};
