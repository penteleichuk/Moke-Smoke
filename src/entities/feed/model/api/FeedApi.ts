import { authInstance } from 'shared/api';
import { getLocalize } from 'shared/lib/intl/getLocalize';
import { FeedEventTypes, FeedType } from './../types/feeds';

export const FeedApi = {
  async getAll({ pageParam = 0, populate = 1, locale = 'en' }) {
    return authInstance
      .get<FeedsResponseType>(`/messages?&country=${locale}`, {
        params: { limit: 10, cursor: pageParam, populate },
      })
      .then(response => {
        return response.data;
      });
  },

  async getMe({ pageParam = 0, populate = 1 }) {
    return authInstance
      .get<FeedsResponseType>('/messages/me', {
        params: { limit: 10, cursor: pageParam, populate },
      })
      .then(response => {
        return response.data;
      });
  },

  async getById(idPost = 0, populate = 1) {
    return authInstance
      .get<FeedResponseType>(`/messages/${idPost}?&populate=${populate}`)
      .then(response => {
        return response.data;
      });
  },

  async createPost(data: CreatePostType, populate = 1) {
    return authInstance
      .post<FeedResponseType>(`/messages?&populate=${populate}`, data)
      .then(res => res.data);
  },

  async deletePost(feedId: string) {
    return authInstance
      .delete<FeedType>('/messages', { data: { feedId } })
      .then(res => res.data);
  },

  async createComment(idPost: string, text: string, populate = 1) {
    return authInstance
      .post<FeedType>(`/messages/${idPost}/comments?&populate=${populate}`, {
        text,
      })
      .then(res => res.data);
  },

  async deleteComment(idPost: string, idComment: string, populate = 1) {
    const localize = getLocalize();

    return authInstance
      .delete<FeedType>(
        `/messages/${idPost}/${idComment}/comment?&populate=${populate}&counrty=${localize}`,
      )
      .then(res => res.data);
  },

  async likePost(idPost: string, likeType: string, populate = 1) {
    const localize = getLocalize();

    return authInstance
      .post<FeedType>(
        `/messages/${idPost}/likes?&populate=${populate}&counrty=${localize}`,
        {
          likeType,
        },
      )
      .then(res => res.data);
  },
};

type CreatePostType = {
  text: string;
  eventType: FeedEventTypes;
  country: string;
};

export type FeedsResponseType = {
  data: FeedType[];
  nextCursor?: number;
};

export type FeedResponseType = {
  data: FeedType;
};
