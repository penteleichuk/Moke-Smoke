import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { Animated } from 'react-native';
import { CONTENT_PADDING } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { styles } from './SheetBackgroundStyle';

type SheetBackgroundProps = BottomSheetBackgroundProps & {
  isDetached: boolean;
};

export const SheetBackground: React.FC<SheetBackgroundProps> = ({
  style,
  isDetached,
}) => {
  const { cn } = useTheme();

  const containerStyle = useMemo(
    () => [
      style,
      styles.customBackground,
      {
        backgroundColor: cn('slate.800', 'slate.200'),
        marginHorizontal: isDetached ? CONTENT_PADDING : 0,
      },
    ],
    [style],
  );

  return <Animated.View style={[containerStyle]} />;
};
