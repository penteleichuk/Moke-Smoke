import { FeedLikeType } from './../../types/feeds';

export const isLiked = (likes: FeedLikeType[], userId: string) => {
  if (likes.length > 0) {
    const index = likes.findIndex(el => el.author._id === userId);

    if (index > -1) {
      return likes[index].eventType;
    }
  }

  return null;
};
