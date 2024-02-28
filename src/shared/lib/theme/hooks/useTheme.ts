import { getColorScheme, getTheme } from 'entities/theme';
import { useCallback } from 'react';
import { useAppSelector } from './../../hooks/useAppSelector';
import { themeMode } from './../util/themeMode/themeMode';

export const useTheme = () => {
  const theme = useAppSelector(getTheme);
  const colorScheme = useAppSelector(getColorScheme);

  const cn = useCallback(themeMode(theme), [theme]);
  return { theme, colorScheme, cn };
};
