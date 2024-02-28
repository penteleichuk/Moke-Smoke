import React, { FC, useEffect } from 'react';
import { Appearance } from 'react-native';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { getColorScheme } from './../model/selectors/getColorScheme/getColorScheme';
import { getTheme } from './../model/selectors/getTheme/getTheme';
import { setTheme } from './../model/slice/themeSlice';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useAppSelector(getColorScheme);
  const theme = useAppSelector(getTheme);

  const dispatch = useAppDispatch();

  Appearance.addChangeListener(preferences => {
    if (preferences.colorScheme && colorScheme === 'system') {
      if (theme !== preferences.colorScheme) {
        dispatch(setTheme(preferences.colorScheme));
      }
    }
  });

  useEffect(() => {
    if (colorScheme === 'system') {
      const system = Appearance.getColorScheme() || 'dark';
      if (system !== theme) {
        dispatch(setTheme(system));
      }
    } else {
      if (theme !== colorScheme) {
        dispatch(setTheme(colorScheme));
      }
    }
  }, [colorScheme]);

  return children;
};
