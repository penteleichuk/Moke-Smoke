import { memo } from 'react';
import { View } from 'react-native';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './InputPickerStyle';

export type InputPickerProps = {
  placeholder: string;
  value: string | number;
  displayValue?: string;
  label: Array<string | number>;
  values?: Array<string | number>;
  tag?: string;
  variant?: 'string' | 'number';
  onSubmit: (value: string | number) => void;
};

export const InputPicker = memo((props: InputPickerProps) => {
  const {
    placeholder,
    value,
    displayValue,
    label,
    values,
    tag = '',
    variant = 'number',
    onSubmit,
  } = props;

  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const onPressRouteHandler = () => {
    navigation.navigate(AppNavigation.PICKER, {
      placeholder,
      value,
      label,
      values,
      tag,
      variant,
      onSubmit,
    });
  };

  return (
    <View>
      <CustomText
        size={TextSize.S_XL}
        style={{ color: cn('slate.200', 'slate.600') }}>
        {placeholder}
      </CustomText>
      <View style={styles.content}>
        <PressableOpacity onPress={onPressRouteHandler}>
          <View
            style={[
              styles.input,
              {
                backgroundColor: cn('slate.700', 'slate.300'),
              },
            ]}>
            <CustomText style={{ color: cn('slate.200', 'black') }}>
              {displayValue || value.toString()}
            </CustomText>
          </View>
        </PressableOpacity>
      </View>
    </View>
  );
});
