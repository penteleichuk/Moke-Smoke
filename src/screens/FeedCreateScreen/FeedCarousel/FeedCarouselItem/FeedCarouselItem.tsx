import { useMemo } from 'react';
import { Image, View } from 'react-native';
import * as Images from 'shared/assets/images';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './FeedCarouselItemStyle';

export interface FeedCarouselItemProps {
  title: string;
  index: number;
}

const ImageStock = [
  Images.Avatar_1,
  Images.Avatar_2,
  Images.Avatar_3,
  Images.Avatar_4,
  Images.Avatar_5,
];

const NameStock = [
  'William A.',
  'Emma A.',
  'Olivia P.',
  'James D.',
  'Benjamin I.',
];
const AgeStock = ['32 y.o', '26 y.o', '29 y.o', '26 y.o', '39 y.o'];

export const FeedCarouselItem = ({ title, index }: FeedCarouselItemProps) => {
  const { cn } = useTheme();

  const palette = useMemo(() => {
    return [
      cn('blue.500'),
      cn('amber.400'),
      cn('green.500'),
      cn('purple.500'),
      cn('teal.500'),
    ];
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: palette[index] + '80' }]}>
      <View>
        <CustomText size={TextSize.S_XL} style={{ color: cn('white') }}>
          {title}
        </CustomText>
      </View>
      <View style={styles.footer}>
        <Image style={styles.avatar} source={ImageStock[index]} />
        <View>
          <CustomText size={TextSize.S_LG} style={{ color: cn('white') }}>
            {NameStock[index]}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('slate.300', 'slate.500') }}>
            {AgeStock[index]}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
