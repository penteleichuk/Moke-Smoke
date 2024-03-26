import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { ReactNode, memo, useContext } from 'react';
import { View } from 'react-native';
import { AppNavigation } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { setProgressId } from './../model/slices/progressSlice';
import { styles } from './OpenCardProgressStyle';

type ProgressItemType = {
  onPress?: () => void;
  Icon: ReactNode;
  day: string;
  index: number;
  isPremium: boolean;
  formatData: number;
  toBegin: Date | null;
};

export const OpenCardProgress = memo((props: ProgressItemType) => {
  const { index, Icon, onPress, day, isPremium, formatData, toBegin } = props;

  const { [AppSheet.PROGRESS]: progressRef } = useContext(SheetCreateContext);

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const { cn } = useTheme();

  const onPressHandler = () => {
    if (onPress) {
      return onPress();
    }

    if (index > 9 && !isPremium) {
      navigation.navigate(AppNavigation.SUBS);
    } else if (index < formatData && toBegin !== null) {
      dispatch(setProgressId({ id: index }));
      progressRef?.current?.present();
    }
  };

  return (
    <View style={[styles.container]}>
      <PressableOpacity onPress={onPressHandler}>
        <View
          style={[
            styles.linear,
            { backgroundColor: cn('slate.800', 'slate.100') },
            index % 2 !== 0 && styles.gap,
            (index >= formatData || toBegin === null) && styles.not,
            index > 9 && !isPremium && styles.lock,
          ]}>
          <View style={styles.icon}>{Icon}</View>
          <View style={styles.content}>
            <CustomText
              size={TextSize.S_XL}
              weight={TextWeight.MEDIUM}
              style={{ color: cn('white', 'black') }}>
              {day}
            </CustomText>
            <View
              style={[styles.circle, { backgroundColor: cn('indigo.500') }]}>
              <CustomText style={{ color: cn('white') }}>
                {index + 1}
              </CustomText>
            </View>
          </View>
        </View>
      </PressableOpacity>
    </View>
  );
});
