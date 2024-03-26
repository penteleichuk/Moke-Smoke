import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, View } from 'react-native';
import { AppTabNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { DailyProgress, DailyСalendar } from 'widgets/daily-calendar';
import { MotivationSection } from 'widgets/motivation-section';
import { ResultBoard } from 'widgets/result-board';
import { Simulator } from 'widgets/simulator';
import { styles } from './HomeScreenStyle';

type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppTabNavigation.MAIN
>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { cn } = useTheme();

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['bottom']}>
      <ScrollView
        automaticallyAdjustContentInsets={true}
        bouncesZoom={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <DailyСalendar />
        </View>
        <View style={styles.content}>
          <DailyProgress />
        </View>
        <View style={styles.content}>
          <ResultBoard />
        </View>
        <View style={styles.content}>
          <Simulator />
        </View>
        <View style={styles.content}>
          <MotivationSection />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
