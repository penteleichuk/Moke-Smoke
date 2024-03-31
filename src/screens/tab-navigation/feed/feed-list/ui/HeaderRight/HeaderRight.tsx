import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/navigation/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { PressableOpacity } from 'shared/ui/PressableOpacity';

export const HeaderRight = () => {
  const navigation = useAppNavigation();
  const { cn } = useTheme();

  const onPressHelpFeed = () => {
    navigation.navigate(AppNavigation.FEED_HELP);
  };

  return (
    <PressableOpacity onPress={onPressHelpFeed}>
      <Icons.Info
        width={moderateScale(23)}
        height={moderateScale(23)}
        fill={cn('white', 'black')}
      />
    </PressableOpacity>
  );
};
