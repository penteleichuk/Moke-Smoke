import { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme/hooks/useTheme';

interface TrailingProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

const ICON_SIZE = moderateScale(25);

export const Trailing = (props: TrailingProps) => {
  const { show, setShow } = props;
  const { cn } = useTheme();

  const onPressHandler = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <Pressable style={styles.wrapper} onPress={onPressHandler}>
      {show ? (
        <Icons.EyeOn
          width={ICON_SIZE}
          height={ICON_SIZE}
          fill={cn('slate.300', 'slate.700')}
        />
      ) : (
        <Icons.EyeOff
          width={ICON_SIZE}
          height={ICON_SIZE}
          fill={cn('slate.300', 'slate.700')}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: moderateScale(15),
    alignItems: 'center',
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
