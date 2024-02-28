import React from 'react';
import { View } from 'react-native';
import { CONTAINER_PADDING } from 'shared/config/dimensions';

interface RowGroupProps {
  children: React.ReactNode;
  gap?: number;
  marginTop?: number;
}

export const RowGroup = React.memo(
  ({ children, gap = 0, marginTop = CONTAINER_PADDING }: RowGroupProps) => {
    return <View style={{ gap, marginTop }}>{children}</View>;
  },
);
