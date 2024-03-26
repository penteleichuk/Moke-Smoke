import { SetCigaretteCount } from 'features/setting/set-cigarette-count';
import { SetCigaretteDay } from 'features/setting/set-cigarette-day';
import { SetCigarettePrice } from 'features/setting/set-cigarette-price';
import { SetHowMuchSmoke } from 'features/setting/set-how-much-smoke';
import { SetUserName } from 'features/setting/set-user-name';
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
