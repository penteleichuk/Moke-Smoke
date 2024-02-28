import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { ScreenContent } from 'shared/ui/ScreenContent';
import {
  BreathingExercise,
  EXERCISE_COUNT,
  EXERCISE_NEED,
} from 'widgets/BreathingExercise';
import { StarRating } from 'widgets/StarRating';
import { styles } from './BreatheScreenStyle';

type BreatheScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.BREATHE
>;

export const BreatheScreen = ({ navigation }: BreatheScreenProps) => {
  const [count, setCount] = useState<number>(0);

  const { t } = useTranslation();
  const { cn } = useTheme();
  const headerHeight = useHeaderHeight();

  const onPressBackHandler = () => {
    navigation.navigate(AppNavigation.WATER);
  };

  const onPressNextHandler = () => {
    navigation.navigate(AppNavigation.HAPPY);
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <ScrollView
        automaticallyAdjustContentInsets={true}
        bounces={false}
        bouncesZoom={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingTop: headerHeight },
        ]}>
        <View style={styles.header}>
          <CustomText
            size={TextSize.S_3XL}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'black') }}>
            {t('breathe.3.title')}
          </CustomText>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('green.500', 'green.600') }}>
            {t('breathe.3.description')}
          </CustomText>
          <View style={styles.stairs}>
            <StarRating
              stairs={5}
              color={cn('indigo.500', 'indigo.600')}
              value={count}
              max={EXERCISE_COUNT}
              size={20}
            />
          </View>
        </View>
        <BreathingExercise count={count} setCount={setCount} />
        <View style={styles.footer}>
          <NavigationSplash
            disabled={count < EXERCISE_NEED}
            onPressBack={onPressBackHandler}
            onPressNext={onPressNextHandler}
          />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
