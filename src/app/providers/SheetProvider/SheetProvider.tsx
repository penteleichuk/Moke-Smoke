import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, { FC, createContext, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FLEX } from 'shared/config/dimensions';
import * as Bottom from 'widgets/Sheet';

export type SheetContextType = Record<
  AppSheet,
  React.RefObject<BottomSheetModal> | null
>;

export enum AppSheet {
  PROGRESS = 'progress',
  SMOKE = 'smoke',
  NO_SMOKE = 'no_smoke',
  BANK = 'bank',
  LONGEViTY = 'longevity',
  NO_USE_CIGARETTES = 'no_use_cigarettes',
  HEALTH = 'health',
  ENERGY = 'energy',
  LUNGS = 'lungs',
  MOTIVATE = 'motivate',
  CHARTS_SMOKE = 'charts_smoke',
  REVIEW = 'review',
  NOTIFICATION = 'notification',
}

export const SheetCreateContext = createContext<SheetContextType>(
  {} as SheetContextType,
);

interface SheetProviderProps {
  children: React.ReactNode;
}

export const SheetProvider: FC<SheetProviderProps> = ({ children }) => {
  const initialSheetContext: SheetContextType = {
    [AppSheet.PROGRESS]: useRef<BottomSheetModal>(null),
    [AppSheet.SMOKE]: useRef<BottomSheetModal>(null),
    [AppSheet.NO_SMOKE]: useRef<BottomSheetModal>(null),
    [AppSheet.BANK]: useRef<BottomSheetModal>(null),
    [AppSheet.LONGEViTY]: useRef<BottomSheetModal>(null),
    [AppSheet.NO_USE_CIGARETTES]: useRef<BottomSheetModal>(null),
    [AppSheet.HEALTH]: useRef<BottomSheetModal>(null),
    [AppSheet.ENERGY]: useRef<BottomSheetModal>(null),
    [AppSheet.LUNGS]: useRef<BottomSheetModal>(null),
    [AppSheet.MOTIVATE]: useRef<BottomSheetModal>(null),
    [AppSheet.CHARTS_SMOKE]: useRef<BottomSheetModal>(null),
    [AppSheet.REVIEW]: useRef<BottomSheetModal>(null),
    [AppSheet.NOTIFICATION]: useRef<BottomSheetModal>(null),
  };
  return (
    <SheetCreateContext.Provider value={initialSheetContext}>
      <GestureHandlerRootView style={FLEX}>
        <BottomSheetModalProvider>
          <Bottom.SheetMotivate />
          <Bottom.SheetNoSmoke />
          <Bottom.SheetSmoke />
          <Bottom.SheetDashboardBank />
          <Bottom.SheetDashboardMoreTime />
          <Bottom.SheetDashboardCiggy />
          <Bottom.SheetDashboardHealth />
          <Bottom.SheetDashboardEnergy />
          <Bottom.SheetDashboardLungs />
          <Bottom.SheetProgress />
          <Bottom.SheetCharts />
          <Bottom.SheetReview />
          <Bottom.SheetNotification />
          {children}
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SheetCreateContext.Provider>
  );
};
