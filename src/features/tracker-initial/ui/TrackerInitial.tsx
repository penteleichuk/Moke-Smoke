import { memo } from 'react';
import { ColorValue } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { CustomText } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { setTrackerInitial } from './../model/slices/trackerSlice';
import { styles } from './TrackerInitialStyle';

type TrackerInitialProps = {
  Icon?: React.ElementType;
  text: string;
  backgroundColor: ColorValue;
  color: ColorValue;
};

const ICON_SIZE = moderateScale(25);

export const TrackerInitial = memo(
  ({ Icon, text, backgroundColor, color }: TrackerInitialProps) => {
    const dispatch = useAppDispatch();

    const onPressStartHandler = () => {
      dispatch(setTrackerInitial(true));
    };

    return (
      <PressableOpacity
        onPress={onPressStartHandler}
        style={[styles.container, { backgroundColor }]}>
        {Icon && <Icon width={ICON_SIZE} height={ICON_SIZE} />}
        <CustomText style={{ color }}>{text}</CustomText>
      </PressableOpacity>
    );
  },
);
