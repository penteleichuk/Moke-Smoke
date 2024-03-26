import { authInstance } from 'shared/api';
import { FriendSchema } from './../types/friends';

export const friendApi = {
  async get({ pageParam = 0 }) {
    return authInstance
      .get<FriendResponseType>('/friend/get', {
        params: { limit: 6, cursor: pageParam },
      })
      .then(response => {
        return response.data;
      });
  },

  async getFriendById(friendId: string) {
    return authInstance
      .post<{ friendId: string }, { data: FriendSchema }>('/friend/by-id', {
        friendId,
      })
      .then(response => response.data);
  },

  async add(friendId: string) {
    return authInstance
      .post('/friend/add', { friendId })
      .then(response => response.data);
  },

  async motivate(friendId: string, body: string) {
    return authInstance
      .post('/friend/motivate', {
        friendId: friendId,
        toCurrentTime: new Date(),
        body: body,
      })
      .then(response => response.data);
  },
};

export type FriendResponseType = {
  data: FriendSchema[];
  nextCursor?: number;
};
