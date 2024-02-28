import { useQueryClient } from '@tanstack/react-query';
import { FeedApi, FeedEventTypes } from 'entities/feeds';

const QUERY_KEY_FEED_CREATE = 'QUERY_KEY_FEED_CREATE';

export const useFeedCreate = () => {
  const queryClient = useQueryClient();

  const created = async (
    eventType: FeedEventTypes,
    text: string,
    country: string,
  ) => {
    try {
      const response = await queryClient.fetchQuery({
        queryKey: [QUERY_KEY_FEED_CREATE],
        queryFn: () => FeedApi.createPost({ text, eventType, country }),
      });

      return { status: 'success', response };
    } catch (err) {
      return { status: 'error', response: null };
    }
  };

  return { created };
};
