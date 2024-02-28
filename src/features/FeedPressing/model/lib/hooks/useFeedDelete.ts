import { useQueryClient } from '@tanstack/react-query';
import {
  FeedApi,
  FeedsQueryType,
  QUERY_KEY_FEED_ALL,
  QUERY_KEY_FEED_ME,
} from 'entities/feeds';
import { updateFeddStorage } from './../updateFeddStorage/updateFeddStorage';

const QUERY_KEY_FEED_DELETE = 'QUERY_KEY_FEED_DELETE';

export const useFeedDelete = () => {
  const queryClient = useQueryClient();

  const remove = async (feedId: string, commentId?: string) => {
    try {
      const response = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY_FEED_DELETE, commentId],
        queryFn: () =>
          commentId
            ? FeedApi.deleteComment(feedId, commentId)
            : FeedApi.deletePost(feedId),
      });

      if (commentId) {
        queryClient.setQueryData<FeedsQueryType>([QUERY_KEY_FEED_ME], oldData =>
          updateFeddStorage(feedId, commentId, response, oldData),
        );

        queryClient.setQueryData<FeedsQueryType>(
          [QUERY_KEY_FEED_ALL],
          oldData => updateFeddStorage(feedId, commentId, response, oldData),
        );
      }

      return {
        status: 'success',
        response,
        type: commentId ? 'comment' : 'feed',
      };
    } catch (err) {
      return {
        status: 'error',
        response: null,
        type: commentId ? 'comment' : 'feed',
      };
    }
  };

  return { remove };
};
