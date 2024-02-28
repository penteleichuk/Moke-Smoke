export enum BreatheStatus {
  IDLE = 'idle',
  START = 'start',
  STOP = 'stop',
}

export enum BreatheProcess {
  IDLE = 'idle',
  START = 'start',
  INHALE = 'inhale',
  EXHALE = 'exhale',
  HOLD = 'hold',
}

export const BreatheTiming: Record<BreatheProcess, number> = {
  [BreatheProcess.IDLE]: 0,
  [BreatheProcess.START]: 3,
  [BreatheProcess.INHALE]: 4,
  [BreatheProcess.EXHALE]: 4,
  [BreatheProcess.HOLD]: 6,
};

export const EXERCISE_COUNT = 15;
export const EXERCISE_NEED = 3;
