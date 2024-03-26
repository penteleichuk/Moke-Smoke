import React from 'react';
import { ColorValue } from 'react-native';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { LinkRow } from 'shared/ui/LinkRow';

export type LinkPickerProps = {
  Icon?: React.ElementType;
  colorIcon: ColorValue;
  backgroundColorIcon: ColorValue;
  textColor: ColorValue;
  placeholder: string;
  value: string | number;
  label: Array<string | number>;
  values: Array<string | number>;
  tag?: string;
  variant?: 'string' | 'number';
  onSubmit: (value: string | number) => void;
};

export const LinkPicker = React.memo((props: LinkPickerProps) => {
  const {
    Icon,
    colorIcon,
    backgroundColorIcon,
    textColor,
    placeholder,
    value,
    label,
    values,
    tag = '',
    variant = 'number',
    onSubmit,
  } = props;

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
    <LinkRow
      Icon={Icon}
      colorIcon={colorIcon}
      backgroundColorIcon={backgroundColorIcon}
      textColor={textColor}
      text={placeholder}
      onPress={onPressRouteHandler}
    />
  );
});
