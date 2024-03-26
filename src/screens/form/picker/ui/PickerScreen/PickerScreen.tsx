import { Picker, PickerIOS } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './PickerStyle';

type PickerScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.PICKER
>;

export const PickerScreen = ({ navigation, route }: PickerScreenProps) => {
  const {
    placeholder,
    label,
    tag,
    value,
    values = [],
    variant,
    onSubmit,
  } = route.params;
  const selectedValue = variant === 'string' ? value.toString() : +value;

  const [input, setInput] = useState<string | number>(selectedValue);
  const { theme, cn } = useTheme();
  const { t } = useTranslation();

  const onPressEnterHandler = () => {
    onSubmit(input);
    navigation.goBack();
  };

  const onChangePickerHandler = (itemValue: ItemValue) => {
    const temp = variant === 'string' ? itemValue.toString() : +itemValue;
    setInput(temp);
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}>
      <View style={styles.container}>
        <View>
          <CustomText
            size={TextSize.S_3XL}
            style={[styles.placeholder, { color: cn('white', 'black') }]}>
            {placeholder}
          </CustomText>
          <View style={styles.picker}>
            {Platform.OS === 'android' && (
              <View style={[styles.line]}>
                <Picker
                  mode={'dropdown'}
                  dropdownIconColor={cn('slate.500', 'slate.700')}
                  dropdownIconRippleColor={cn('slate.500', 'slate.700')}
                  prompt={placeholder}
                  selectedValue={input}
                  onValueChange={onChangePickerHandler}>
                  {label.map((el, key) => (
                    <Picker.Item
                      key={el.toString()}
                      color={cn('slate.500', 'slate.700')}
                      label={el.toString() + tag}
                      value={values[key] || el}
                    />
                  ))}
                </Picker>
              </View>
            )}
            {Platform.OS === 'ios' && (
              <PickerIOS
                themeVariant={theme}
                selectedValue={input}
                onValueChange={onChangePickerHandler}>
                {label.map((el, key) => (
                  <Picker.Item
                    key={el.toString()}
                    color={cn('white', 'black')}
                    label={el.toString() + tag}
                    value={values[key] || el}
                  />
                ))}
              </PickerIOS>
            )}
          </View>
          <CustomButton
            onPress={onPressEnterHandler}
            background={[cn('indigo.500'), cn('indigo.600')]}
            radius={10}>
            {t('system.accept')}
          </CustomButton>
        </View>
      </View>
    </ScreenContent>
  );
};
