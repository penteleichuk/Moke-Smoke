import { useQuery } from '@tanstack/react-query';
import { friendApi } from './../../api/friendApi';

const QUERY_KEY = 'addfriend';

export const useAddFriend = () => {
  let friendId: string = '';

  const setFriendId = (id: string) => {
    friendId = id;
  };

  const { data, isLoading, isError, refetch, fetchStatus } = useQuery({
    queryKey: [QUERY_KEY, friendId],
    queryFn: () => friendApi.add(friendId),
    enabled: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 0,
  });

  return { data, isLoading, isError, setFriendId, refetch, fetchStatus };
};
