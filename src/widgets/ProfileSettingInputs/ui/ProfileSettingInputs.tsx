import { SetCigaretteCount } from 'features/SetCigaretteCount';
import { SetCigaretteDay } from 'features/SetCigaretteDay';
import { SetCigarettePrice } from 'features/SetCigarettePrice';
import { SetHowMuchSmoke } from 'features/SetHowMuchSmoke';
import { SetUserName } from 'features/SetUserName';
import { memo } from 'react';

export const ProfileSettingInputs = memo(() => {
  return (
    <>
      <SetUserName />
      <SetCigarettePrice />
      <SetCigaretteDay />
      <SetCigaretteCount />
      <SetHowMuchSmoke />
    </>
  );
});
