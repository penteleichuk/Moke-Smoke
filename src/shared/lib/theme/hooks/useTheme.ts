import { getColorScheme, getTheme } from 'app/providers/ThemeProvider';
import { useCallback } from 'react';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { themeMode } from './../util/themeMode/themeMode';

export const useTheme = () => {
  const theme = useAppSelector(getTheme);
  const colorScheme = useAppSelector(getColorScheme);

  const cn = useCallback(themeMode(theme), [theme]);
  return { theme, colorScheme, cn };
};
