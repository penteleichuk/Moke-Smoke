import { View } from 'react-native';
import { styles } from './RowStyle';

type RowProps = {
  children: React.ReactNode;
  gap?: number;
};

export const Row = ({ children, gap = 0 }: RowProps) => {
  return <View style={[styles.group, { gap }]}>{children}</View>;
};
