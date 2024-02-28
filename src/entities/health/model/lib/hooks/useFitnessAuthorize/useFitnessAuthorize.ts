import {
  AuthorizationPermissions,
  FitnessDataType,
  FitnessTracker,
  GoogleFitDataType,
  HealthKitDataType,
} from '@kilohealth/rn-fitness-tracker';
import { useEffect, useState } from 'react';
import { getLastProperties } from './../../getLastTwoProperties/getLastTwoProperties';

const permissions: AuthorizationPermissions = {
  healthReadPermissions: [
    HealthKitDataType.StepCount,
    HealthKitDataType.DistanceWalkingRunning,
  ],
  googleFitReadPermissions: [
    GoogleFitDataType.Steps,
    GoogleFitDataType.Distance,
  ],
};

export const useFitnessAuthorize = () => {
  const [step, setStep] = useState<number[]>([0, 0]);
  const [distance, setDistance] = useState<number[]>([0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const authorized = await FitnessTracker.authorize(permissions);

        if (!authorized) {
          setIsError(true);
          setIsLoading(false);
          return;
        }

        try {
          const stepsToday = await FitnessTracker.getStatisticWeekDaily(
            FitnessDataType.Steps,
          );

          if (stepsToday) {
            const res = getLastProperties(stepsToday, 2);
            setStep(res);
          }
        } catch (errStep) {}

        try {
          const distanceToday = await FitnessTracker.getStatisticWeekDaily(
            FitnessDataType.Distance,
          );

          if (distanceToday) {
            const res = getLastProperties(distanceToday, 2);
            setDistance(res);
          }
        } catch (errDist) {}

        setIsLoading(false);
      } catch (err) {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, []);

  return { step, distance, isLoading, isError };
};
