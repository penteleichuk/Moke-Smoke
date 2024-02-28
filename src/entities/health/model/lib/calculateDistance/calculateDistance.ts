export function calculateDistance(steps: number, stepLength = 0.85) {
  const distanceInMeters = steps * stepLength;
  const distanceInKm = distanceInMeters / 1000;

  return isNaN(distanceInKm) ? 0 : distanceInKm;
}
