export const formatSeconds = (time: number) =>
  new Date(time * 1000).toISOString().slice(14, 19);
