export const calculateReadingTime = (
  text: string,
  wordsPerMinute: number = 50,
) => {
  const numberOfWords = text.split(' ').length;
  const time = numberOfWords / wordsPerMinute;
  return Math.ceil(time);
};
