import { FeedType, FeedsQueryType } from 'entities/feed';

export const updateFeddStorage = (
  feedId: string,
  commentId: string,
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
        totalComments: response.totalComments,
        likes: response.likes,
        comments: page.data[index].comments.filter(el => el._id !== commentId),
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
