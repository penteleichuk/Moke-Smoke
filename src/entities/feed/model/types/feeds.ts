import { FeedEvent } from './../const/feeds';

export type FeedEventTypes = FeedEvent;

export type FeedAuthorType = {
  _id: string;
  name: string;
  email: string;
  rating: number;
  avatarUrl?: string;
};

export type FeedLikeType = {
  _id: string;
  eventType: FeedEventTypes;
  author: FeedAuthorType;
  createdAt: Date;
  updatedAt: Date;
};

export type FeedCommentType = {
  _id: string;
  text: string;
  author: FeedAuthorType;
  createdAt: Date;
  updatedAt: Date;
};

export type FeedType = {
  _id: string;
  text: string;
  country: string;
  author: FeedAuthorType;
  likes: FeedLikeType[];
  comments: FeedCommentType[];
  eventType: FeedEventTypes;
  totalLikes: number;
  totalComments: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type FeedsQueryType = {
  pages: {
    data: FeedType[];
    nextCursor?: number;
  }[];
};
