import { getUserId } from 'entities/user';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { PressableOpacity } from 'shared/ui/PressableOpacity';

export const HeaderLeft = () => {
  const userId = useAppSelector(getUserId);
  const navigation = useAppNavigation();
  const { cn } = useTheme();

  const onPressMyFeed = () => {
    navigation.navigate(AppNavigation.FEEDS_ME, { userId });
  };

  return (
    <PressableOpacity onPress={onPressMyFeed}>
      <Icons.Profile
        width={moderateScale(23)}
        height={moderateScale(23)}
        fill={cn('white', 'black')}
      />
    </PressableOpacity>
  );
};
