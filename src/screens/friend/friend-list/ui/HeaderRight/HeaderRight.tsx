import { getIsAuth } from 'entities/auth';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './HeaderRightStyle';

const ICON_SIZE = moderateScale(22);

export const HeaderRight = () => {
  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const isAuth = useAppSelector(getIsAuth);

  const onPressScanHandler = () => {
    navigation.navigate(
      isAuth ? AppNavigation.FRIEND_PRESENT : AppNavigation.AUTH,
    );
  };

  return (
    <View style={styles.button}>
      <PressableOpacity onPress={onPressScanHandler}>
        <View style={[styles.coin, { backgroundColor: cn('indigo.500') }]}>
          <Icons.Plus width={ICON_SIZE} height={ICON_SIZE} fill={cn('white')} />
        </View>
      </PressableOpacity>
    </View>
  );
};
