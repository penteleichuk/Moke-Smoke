import { StatusBar } from 'react-native';
import { useTheme } from 'shared/lib/theme';

export const AppStatusBar = () => {
  const { theme } = useTheme();

  return (
    <StatusBar
      barStyle={`${theme === 'dark' ? 'light' : 'dark'}-content`}
      backgroundColor={'transparent'}
      translucent
    />
  );
};
