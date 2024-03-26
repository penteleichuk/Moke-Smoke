export const parseValidDate = (time: any) => {
  if (!time) {
    return new Date();
  }

  const isValidDate = new Date(time as string);

  if (dateIsValid(isValidDate)) {
    return isValidDate;
  } else {
    return new Date(JSON.parse(time as string));
  }
};

export const dateIsValid = (date: any) => {
  return (
    Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
  );
};
