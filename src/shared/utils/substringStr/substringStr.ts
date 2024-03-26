export const substringStr = (str: string, legth: number) => {
  if (!str) {
    return '';
  }

  if (str.length > legth) {
    return str.substring(0, legth - 3) + './...';
  }

  return str;
};
