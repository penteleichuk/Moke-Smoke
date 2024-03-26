import { FeedType, FeedsQueryType } from 'entities/feed';

export const updateLikeStorage = (
  feedId: string,
  response: FeedType,
  oldData?: FeedsQueryType,
) => {
  if (!oldData) {
    return oldData;
  }

  const updatedPages = oldData.pages.map(page => {
    const index = page.data.findIndex(feed => feed._id === feedId);
    if (index === -1) {
      return page;
    }

    const updatedData = [
      ...page.data.slice(0, index),
      {
        ...page.data[index],
        totalLikes: response.totalLikes,
        likes: response.likes,
      },
      ...page.data.slice(index + 1),
    ];

    return {
      ...page,
      data: updatedData,
    };
  });

  const updatedData = {
    ...oldData,
    pages: updatedPages,
  };

  return updatedData;
};
