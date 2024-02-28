import {
  BottomSheetBackgroundProps,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { ReactNode, forwardRef } from 'react';
import { Keyboard, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale } from 'shared/config/dimensions';
import { SheetBackdrop } from './../SheetBackdrop/SheetBackdrop';
import { SheetBackground } from './../SheetBackground/SheetBackground';
import { styles } from './SheetStyle';

type DetachedContentProps = {
  children: ReactNode;
  bottomInset?: number;
  name: string;
  detached?: boolean;
  onDismiss?: () => void;
};

const SheetComponent = forwardRef<BottomSheetModal, DetachedContentProps>(
  (props, ref) => {
    const { children, detached = true, bottomInset = 80, ...rest } = props;
    const { bottom: safeBottom } = useSafeAreaInsets();

    const renderBackground = (_props: BottomSheetBackgroundProps) => {
      return <SheetBackground isDetached={detached} {..._props} />;
    };

    return (
      <BottomSheetModal
        ref={ref}
        enablePanDownToClose
        animateOnMount
        enableDynamicSizing
        contentHeight={1}
        backdropComponent={SheetBackdrop}
        backgroundComponent={renderBackground}
        detached={detached}
        keyboardBehavior={'interactive'}
        keyboardBlurBehavior={'restore'}
        bottomInset={bottomInset}
        {...rest}>
        <Pressable onPress={Keyboard.dismiss} style={[styles.content]}>
          <BottomSheetView
            style={{ paddingBottom: safeBottom || moderateScale(10) }}>
            {children}
          </BottomSheetView>
        </Pressable>
      </BottomSheetModal>
    );
  },
);

const Sheet = React.memo(SheetComponent);
Sheet.displayName = 'Sheet';

export default Sheet;
