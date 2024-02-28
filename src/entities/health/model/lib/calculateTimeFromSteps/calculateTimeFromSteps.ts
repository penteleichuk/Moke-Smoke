export function calculateTimeFromSteps(steps: number) {
  const averageStepsPerKm = 1300;
  const distanceInKm = steps / averageStepsPerKm;
  const walkingSpeed = 5;
  const timeInHours = distanceInKm / walkingSpeed;
  const timeInMinutes = timeInHours * 60;
  return +timeInMinutes.toFixed();
}
