import MaskedView from '@react-native-masked-view/masked-view';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { getUserIsPremium } from 'entities/user';
import { Image, ImageSourcePropType, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './AudioItemStyle';

type AudioItemType = {
  title: string;
  index: number;
  artwork: ImageSourcePropType;
  onPressSound: (index: number) => void;
};

export const AudioItem = (props: AudioItemType) => {
  const { title, index, onPressSound, artwork } = props;

  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const navigation = useAppNavigation();
  const { cn } = useTheme();

  const onPressSoundHandler = () => {
    if (index > 1 && !(isPremium || isUserPremium)) {
      navigation.navigate(AppNavigation.SUBS);
    } else {
      onPressSound(index);
    }
  };

  return (
    <PressableOpacity style={styles.container} onPress={onPressSoundHandler}>
      <MaskedView
        maskElement={
          <LinearGradient
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.8 }}
            locations={[0.4, 1.0]}
            colors={['#FFFFFF', cn('transparent')]}
          />
        }>
        <LinearGradient
          style={[styles.border]}
          end={{ x: 1.0, y: 0.0 }}
          colors={[cn('purple.400'), cn('indigo.500')]}>
          <LinearGradient
            style={styles.wrapper}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.8 }}
            locations={[1.0, 0.0]}
            colors={[
              cn('slate.900', 'violet.200'),
              cn('slate.700', 'indigo.100'),
            ]}>
            <View style={styles.content}>
              <Image style={styles.image} source={artwork} />
              <View style={styles.text}>
                <CustomText
                  size={TextSize.S_XL}
                  style={{ color: cn('white', 'black') }}>
                  {title}
                  {index > 1 && !(isPremium || isUserPremium) && ' (Premium)'}
                </CustomText>
              </View>
            </View>
          </LinearGradient>
        </LinearGradient>
      </MaskedView>
    </PressableOpacity>
  );
};
