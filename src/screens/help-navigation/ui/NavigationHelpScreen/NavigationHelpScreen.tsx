import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { Paragraph } from 'shared/ui/Paragraph';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './NavigationHelpScreenStyle';

type NavigationHelpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.NAVIGATION_HELP
>;

export const NavigationHelpScreen = ({
  navigation,
}: NavigationHelpScreenProps) => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const headerHeight = useHeaderHeight();

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[
          styles.container,
          { paddingTop: headerHeight },
        ]}>
        <View style={styles.header}>
          <View style={styles.animation}>
            <Lottie source={Anims.Panel} autoPlay loop resizeMode={'cover'} />
          </View>
        </View>
        <View style={styles.content}>
          <Paragraph
            color1={cn('purple.500')}
            color2={cn('purple.500')}
            textColor={cn('white', 'black')}
            title={t('home.header.nav.first')}
            text={t('help.header.course.text')}
          />
          <Paragraph
            color1={cn('blue.500')}
            color2={cn('blue.500')}
            textColor={cn('white', 'black')}
            title={t('home.header.nav.next')}
            text={t('help.header.cards.description')}
          />
          <Paragraph
            color1={cn('pink.500')}
            color2={cn('pink.500')}
            textColor={cn('white', 'black')}
            title={t('home.header.nav.saving')}
            text={t('help.header.task.description')}
          />
          <Paragraph
            color1={cn('teal.500')}
            color2={cn('teal.500')}
            textColor={cn('white', 'black')}
            title={t('help.header.progress.title')}
            text={t('help.header.progress.description')}
          />
          <Paragraph
            color1={cn('orange.500')}
            color2={cn('orange.500')}
            textColor={cn('white', 'black')}
            title={t('home.header.nav.hip')}
            text={t('audio.header')}
          />
          <Paragraph
            color1={cn('violet.500')}
            color2={cn('violet.500')}
            textColor={cn('white', 'black')}
            title={t('home.header.nav.tracker')}
            text={t('tracker.description')}
            isLast
          />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
