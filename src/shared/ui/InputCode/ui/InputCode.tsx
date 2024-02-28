import { memo, useState } from 'react';
import { Keyboard, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { useTheme } from 'shared/lib/theme';
import { CustomText } from 'shared/ui/CustomText';
import { styles } from './InputCodeStyle';

type InputCodeProps = {
  onSubmit?: (value: string) => void;
  placeholder: string;
  control: Control<any, any>;
  name: string;
  rules?: Pick<
    RegisterOptions,
    'maxLength' | 'minLength' | 'validate' | 'required'
  >;
  cellCount?: number;
};

export const InputCode = memo((props: InputCodeProps) => {
  const { placeholder, control, rules, name, cellCount = 6, onSubmit } = props;
  const [text, setText] = useState<string>('');

  const { theme, cn } = useTheme();

  const [onPressOut, getCellOnLayoutHandler] = useClearByFocusCell({
    value: text,
    setValue: setText,
  });

  const onSubmitHandler = (data: string) => {
    if (data.length === cellCount) {
      onSubmit && onSubmit(data);
      setText('');
      Keyboard.dismiss();
    }
  };

  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <View>
          <CustomText
            style={[
              styles.placeholder,
              { color: cn('white', 'black') },
              !!error && { color: cn('red.500') },
            ]}>
            {placeholder}
          </CustomText>
          <CodeField
            {...onPressOut}
            value={text}
            onChangeText={(print: string) => {
              onChange(print);
              setText(print);
              onSubmitHandler(print);
            }}
            cellCount={cellCount}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            keyboardAppearance={theme}
            renderCell={({ index, symbol, isFocused }) => (
              <CustomText
                key={index}
                style={[
                  styles.cell,
                  {
                    color: cn('white', 'black'),
                    borderColor: cn('white', 'black'),
                  },
                  error && { borderColor: cn('red.500') },
                  isFocused && {
                    color: cn('indigo.300', 'indigo.600'),
                    borderColor: cn('indigo.300', 'indigo.600'),
                  },
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </CustomText>
            )}
          />
          {error && (
            <CustomText style={[styles.error, { color: cn('red.500') }]}>
              {error.message}
            </CustomText>
          )}
        </View>
      )}
    />
  );
});
