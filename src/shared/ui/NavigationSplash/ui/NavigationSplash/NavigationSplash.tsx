import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { NavigationSplashItem } from './../NavigationSplashItem/NavigationSplashItem';
import { styles } from './NavigationSplashStyle';

interface NavigationSplashProps {
  onPressBack?: () => void;
  onPressNext: () => void;
  nextText?: string;
  backText?: string;
  disabled?: boolean;
}

export const NavigationSplash = (props: NavigationSplashProps) => {
  const {
    onPressBack,
    onPressNext,
    disabled = false,
    nextText,
    backText,
  } = props;

  return (
    <View style={[styles.container, !onPressBack && styles.without]}>
      {onPressBack && (
        <NavigationSplashItem
          Icon={Icons.LeftArrow}
          text={backText}
          onPress={onPressBack}
        />
      )}
      <NavigationSplashItem
        active
        disabled={disabled}
        Icon={Icons.RightArrow}
        text={nextText}
        onPress={onPressNext}
      />
    </View>
  );
};
