export const clockify = (secondsLeft: number) => {
  const hours = Math.floor(secondsLeft / 60 / 60);
  const mins = Math.floor((secondsLeft / 60) % 60);
  const seconds = Math.floor(secondsLeft % 60);
  const displayHours = hours < 10 ? `0${hours}` : hours;
  const displayMins = mins < 10 ? `0${mins}` : mins;
  const displaySecs = seconds < 10 ? `0${seconds}` : seconds;
  return {
    displayHours,
    displayMins,
    displaySecs,
  };
};
