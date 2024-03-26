import { ThemeProvider } from 'app/providers/ThemeProvider';
import { AuthProvider } from 'entities/auth';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppStatusBar } from 'shared/ui/AppStatusBar';
import { Navigation } from './navigation';
import { InitializedProvider } from './providers/InitializedProvider';
import { LanguageProvider } from './providers/LanguageProvider';
import { PersistProvider } from './providers/PersistProvider';
import { QueryProvider } from './providers/QueryProvider';
import { SheetProvider } from './providers/SheetProvider';
import { StoreProvider } from './providers/StoreProvider';

const App = (): React.JSX.Element => {
  return (
    <StoreProvider>
      <QueryProvider>
        <PersistProvider>
          <ThemeProvider>
            <LanguageProvider>
              <InitializedProvider>
                <AuthProvider>
                  <SafeAreaProvider>
                    <AppStatusBar />
                    <SheetProvider>
                      <Navigation />
                    </SheetProvider>
                    <FlashMessage position="top" />
                  </SafeAreaProvider>
                </AuthProvider>
              </InitializedProvider>
            </LanguageProvider>
          </ThemeProvider>
        </PersistProvider>
      </QueryProvider>
    </StoreProvider>
  );
};

export default App;
