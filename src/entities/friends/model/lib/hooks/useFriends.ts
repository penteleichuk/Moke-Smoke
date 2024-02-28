import { useInfiniteQuery } from '@tanstack/react-query';
import { friendApi } from './../../api/friendApi';

const QUERY_KEY = 'friendLists';

export const useFrinds = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    fetchStatus,
    isLoading,
    isSuccess,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY],
    queryFn: friendApi.get,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _) => lastPage.nextCursor,
    select: el => ({
      pages: [...el.pages],
      pageParams: [...el.pageParams],
    }),
    enabled: false,
  });
  return {
    data,
    isLoading,
    isError: !!error,
    isSuccess,
    isRefetching,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    fetchStatus,
  };
};
