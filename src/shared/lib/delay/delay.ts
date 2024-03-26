export const delay = (ms: number | undefined) =>
  new Promise(res => setTimeout(res, ms));
