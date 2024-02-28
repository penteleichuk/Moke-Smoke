import { findPercentage } from 'entities/subscription';
import { useMemo } from 'react';
import { Pressable, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './SubsItemStyle';

type SubsItemProps = {
  isActive: boolean;
  staticPrice: number;
  staticMinus: number;
  staticCurrency: string;
  index: number;
  name: string;
  price: string;
  montly: string;
  onSelectHandler: (index: number) => void;
};

export const SubsItem = (props: SubsItemProps) => {
  const {
    index,
    isActive,
    staticPrice,
    staticMinus,
    name,
    price,
    staticCurrency,
    montly,
    onSelectHandler,
  } = props;

  const { cn } = useTheme();

  const minus = useMemo(() => {
    return findPercentage(
      staticMinus * (index === 1 ? 3 : 6),
      staticPrice * (index === 1 ? 3 : 6),
    );
  }, []);

  return (
    <Pressable onPress={() => onSelectHandler(index)}>
      <View
        style={[
          styles.container,
          { backgroundColor: cn('slate.800', 'slate.100') },
          isActive && { backgroundColor: cn('purple.700', 'blue.200') },
        ]}>
        <View>
          <View style={styles.title}>
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('white', 'black') }}>
              {name}
            </CustomText>
            {index > 0 && (
              <LinearGradient
                style={styles.gradient}
                end={{ x: 0.7, y: 1.9 }}
                colors={[cn('blue.500'), cn('blue.800')]}>
                <CustomText style={{ color: cn('white') }}>
                  {`-${minus}%`}
                </CustomText>
              </LinearGradient>
            )}
          </View>

          <CustomText
            style={[styles.subtitle, { color: cn('slate.100', 'slate.800') }]}>
            <CustomText style={styles.subtitleDecoration}>
              {index > 0 && `${staticPrice} ${staticCurrency}`}
            </CustomText>
            {index > 0 && ' '}
            {price}
          </CustomText>
        </View>
        <View>
          <CustomText
            size={TextSize.S_XL}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('slate.100', 'slate.800') }}>
            {montly}
          </CustomText>
        </View>
      </View>
    </Pressable>
  );
};
