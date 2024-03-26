import { useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppForegroundState() {
  const [foreground, setForeground] = useState<boolean>(false);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        setForeground(true);
      } else {
        setForeground(false);
      }
    };

    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  return foreground;
}
