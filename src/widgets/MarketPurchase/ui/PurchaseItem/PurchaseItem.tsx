import Lottie, { AnimationObject } from 'lottie-react-native';
import { View } from 'react-native';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './PurchaseItemStyle';

type PurchaseItemProps = {
  index: number;
  item: {
    name: string;
    value: string;
    description: string;
    button: string;
    onPress: () => void;
    Anim: AnimationObject;
  };
};

export const PurchaseItem = (props: PurchaseItemProps) => {
  const { cn } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cn('slate.800', 'slate.100') },
      ]}>
      <View style={styles.animation}>
        <Lottie
          source={props.item.Anim}
          autoPlay
          loop={true}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.content}>
        <View>
          <CustomText
            size={TextSize.S_2XL}
            style={[styles.title, { color: cn('white', 'black') }]}>
            {props.item.name}
          </CustomText>
        </View>
        <View>
          <CustomText
            size={TextSize.S_XL}
            weight={TextWeight.MEDIUM}
            style={[styles.price, { color: cn('indigo.300', 'indigo.500') }]}>
            {props.item.value}
          </CustomText>
        </View>
        <View style={styles.text}>
          <CustomText
            size={TextSize.S_XL}
            style={[
              styles.description,
              { color: cn('slate.200', 'slate.800') },
            ]}>
            {props.item.description}
          </CustomText>
        </View>
        <CustomButton
          onPress={props.item.onPress}
          background={[cn('indigo.500'), cn('indigo.600')]}
          radius={10}
          flex={1}>
          {props.item.button}
        </CustomButton>
      </View>
    </View>
  );
};
