import { useInfiniteQuery } from '@tanstack/react-query';
import { PeopleApi } from './../../../api/peopleApi';

export const usePeople = () => {
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
    queryKey: ['peopleLists'],
    queryFn: PeopleApi.get,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _) => lastPage.nextCursor,
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
