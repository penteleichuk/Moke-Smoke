import { useInfiniteQuery } from '@tanstack/react-query';
import { getLanguage } from 'features/language-picker';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { FeedApi } from './../../api/FeedApi';
import { QUERY_KEY_FEED_ALL, QUERY_KEY_FEED_ME } from './../../const/query-key';

export const useFeeds = (userId?: string) => {
  const locale = useAppSelector(getLanguage);

  const {
    data,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    fetchStatus,
  } = useInfiniteQuery({
    queryKey: [userId ? QUERY_KEY_FEED_ME : QUERY_KEY_FEED_ALL],
    queryFn: userId
      ? FeedApi.getMe
      : ({ pageParam }) => FeedApi.getAll({ pageParam, locale }),
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.nextCursor,
    select: sel => ({
      pages: [...sel.pages],
      pageParams: [...sel.pageParams],
    }),
  });

  return {
    data,
    isError: !!error,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    fetchStatus,
  };
};
