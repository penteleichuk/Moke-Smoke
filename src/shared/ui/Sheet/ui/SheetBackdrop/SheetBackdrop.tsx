import { BottomSheetBackdrop, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import { BlurView } from '@react-native-community/blur';
import React, { memo } from 'react';
import { styles } from './SheetBackdropStyle';

type SheetBackdropProps = JSX.IntrinsicAttributes &
  BottomSheetDefaultBackdropProps;

export const SheetBackdrop = memo((props: SheetBackdropProps) => {
  const { dismissAll } = useBottomSheetModal();

  return (
    <BottomSheetBackdrop
      {...props}
      opacity={1.5}
      appearsOnIndex={1}
      disappearsOnIndex={-1}
      enableTouchThrough={false}
      onPress={dismissAll}>
      <BlurView
        style={styles.blur}
        blurType="dark"
        blurAmount={20}
        reducedTransparencyFallbackColor={'dark'}
      />
    </BottomSheetBackdrop>
  );
});
