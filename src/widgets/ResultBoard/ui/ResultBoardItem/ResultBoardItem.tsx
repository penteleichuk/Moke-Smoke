import { Image, ImageSourcePropType, View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { CountUp } from 'use-count-up';
import { styles } from './ResultBoardItemStyle';

type ResultBoardItemType = {
  Icon: ImageSourcePropType;
  title: string;
  value: string;
  sum: number;
  onPress?: () => void;
};

const ICON_SIZE = moderateScale(25);

export const ResultBoardItem = (props: ResultBoardItemType) => {
  const { title, value, sum, Icon, onPress } = props;
  const { cn } = useTheme();

  return (
    <View
      style={[
        styles.content,
        {
          borderColor: cn('slate.800', 'slate.300'),
          backgroundColor: cn('slate.800', 'white'),
        },
      ]}>
      <PressableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Image
              source={Icon}
              resizeMode={'cover'}
              style={[{ height: ICON_SIZE, width: ICON_SIZE }]}
            />
          </View>
          <View style={styles.text}>
            <CustomText
              size={TextSize.S_LG}
              style={[{ color: cn('slate.300', 'slate.600') }]}>
              {title}
            </CustomText>

            <CustomText style={[{ color: cn('white', 'black') }]}>
              <CountUp isCounting end={+sum} duration={3.2} />
              {value}
            </CustomText>
          </View>
        </View>
      </PressableOpacity>
    </View>
  );
};
