import { useQueryClient } from '@tanstack/react-query';
import {
  FeedApi,
  FeedCommentType,
  FeedsQueryType,
  QUERY_KEY_FEED_ALL,
  QUERY_KEY_FEED_ME,
} from 'entities/feeds';
import { updateCommentStorage } from './../updateCommentStorage/updateCommentStorage';

export const QUERY_KEY_FEED_COMMENT = 'QUERY_KEY_FEED_COMMENT' as const;

export const useFeedComment = (feedId: string) => {
  const queryClient = useQueryClient();

  const comment = async (text: string) => {
    try {
      const response = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY_FEED_COMMENT, feedId],
        queryFn: () => FeedApi.createComment(feedId, text),
      });

      const lastComment = response.comments[0] as FeedCommentType;

      queryClient.setQueryData<FeedsQueryType>([QUERY_KEY_FEED_ME], oldData =>
        updateCommentStorage(feedId, response, lastComment, oldData),
      );

      queryClient.setQueryData<FeedsQueryType>([QUERY_KEY_FEED_ALL], oldData =>
        updateCommentStorage(feedId, response, lastComment, oldData),
      );

      return { status: 'success', response };
    } catch (err) {
      return { status: 'error', response: null };
    }
  };

  return { comment };
};
