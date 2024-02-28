import { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { moderateScale } from 'shared/config/dimensions';

interface TabBarIconProps {
  color: string;
  Icon: FC<SvgProps>;
}

const ICON_SIZE = moderateScale(23);

export const TabBarIcon = ({ color, Icon }: TabBarIconProps) => {
  return <Icon width={ICON_SIZE} fill={color} />;
};
