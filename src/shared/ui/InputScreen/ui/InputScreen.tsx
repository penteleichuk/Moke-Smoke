import { memo } from 'react';
import { View } from 'react-native';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { InputTextType } from 'shared/ui/InputText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './InputScreenStyle';

export type InputScreenProps = {
  value: string | number;
  name: string;
  schema: any;
  onSubmitButton: (value: string | number) => void;
} & InputTextType;

export const InputScreen = memo((props: InputScreenProps) => {
  const { placeholder, value, name, onSubmitButton, schema, ...res } = props;

  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const onPressRouteHandler = () => {
    navigation.navigate(AppNavigation.INPUT, {
      placeholder,
      value,
      onSubmitButton,
      name,
      schema,
      ...res,
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
              {value.toString()}
            </CustomText>
          </View>
        </PressableOpacity>
      </View>
    </View>
  );
});
