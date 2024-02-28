import React, { useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import {
  TextInput as TextInputNative,
  TextInputProps,
  View,
} from 'react-native';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './InputTextStyle';
import { Trailing } from './Trailing';

export type InputTextType = TextInputProps & {
  name: string;
  rules?: Pick<
    RegisterOptions,
    'maxLength' | 'minLength' | 'validate' | 'required'
  >;
};

type InputTextProps = InputTextType & {
  control: Control<any, any>;
};

export const InputText = React.memo((props: InputTextProps) => {
  const { control, name, placeholder, secureTextEntry, rules, ...res } = props;
  const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry || false);
  const { theme, cn } = useTheme();

  return (
    <Controller
      control={control}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('slate.200', 'slate.600') }}>
            {placeholder}
          </CustomText>
          <View style={[styles.wrapper]}>
            <TextInputNative
              {...res}
              value={value.toString()}
              secureTextEntry={isSecure}
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardAppearance={theme}
              style={[
                styles.input,
                {
                  color: cn('slate.200', 'slate.600'),
                  backgroundColor: cn('slate.700', 'slate.300'),
                  borderColor: error?.message
                    ? cn('red.400')
                    : cn('transparent'),
                },
              ]}
            />
            {secureTextEntry && (
              <Trailing show={isSecure} setShow={setIsSecure} />
            )}
            {error?.message && (
              <CustomText style={[styles.error, { color: cn('red.400') }]}>
                {error?.message}
              </CustomText>
            )}
          </View>
        </View>
      )}
      name={name}
    />
  );
});
