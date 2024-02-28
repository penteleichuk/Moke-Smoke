import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getTrackerIsInitial } from 'features/TrackerInitial';
import { StyleSheet, View } from 'react-native';
import { MAIN_HORIZONTAL } from 'shared/config/dimensions';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { useAppSelector } from './../../shared/lib/hooks/useAppSelector';
import { TrackerAviable } from './TrackerAviable/TrackerAviable';
import { TrackerWelcome } from './TrackerWelcome/TrackerWelcome';

type TrackerScreenType = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.TRACKER
>;

export const TrackerScreen = ({ navigation }: TrackerScreenType) => {
  const isInitial = useAppSelector(getTrackerIsInitial);

  const { cn } = useTheme();
  const headerHeight = useHeaderHeight();

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        {isInitial ? <TrackerAviable /> : <TrackerWelcome />}
      </View>
    </ScreenContent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: MAIN_HORIZONTAL,
  },
});
