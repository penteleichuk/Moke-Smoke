import { ColorValue, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { PaginationItem } from './../PaginationItem/PaginationItem';
import { styles } from './PaginationStyle';

interface PaginationProps {
  progressValue: SharedValue<number>;
  quantity: number;
  backgroundColor: ColorValue;
  backgroundColorNot: ColorValue;
  backgroundColorActive: ColorValue;
}

export const Pagination = ({
  progressValue,
  quantity,
  backgroundColor,
  backgroundColorNot,
  backgroundColorActive,
}: PaginationProps) => {
  return (
    <View
      style={[
        styles.pagination,
        {
          backgroundColor,
        },
      ]}>
      {[...Array(quantity).keys()].map((_, index) => (
        <PaginationItem
          backgroundColor={backgroundColorActive}
          backgroundColorNot={backgroundColorNot}
          animValue={progressValue}
          index={index}
          key={index}
          isRotate={false}
          length={quantity}
        />
      ))}
    </View>
  );
};
