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
import { styles } from './TrainerHelpScreenStyle';

type TrainerHelpScreenType = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.TRAINER_HELP
>;

export const TrainerHelpScreen = ({ navigation }: TrainerHelpScreenType) => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const headerHeight = useHeaderHeight();

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      excludeEdges={['top']}
      navigation={navigation}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={[
          styles.container,
          { paddingTop: headerHeight },
        ]}>
        <View style={styles.header}>
          <View style={styles.animation}>
            <Lottie source={Anims.Trainer} autoPlay loop={false} />
          </View>
        </View>
        <View style={styles.content}>
          <Paragraph
            color1={cn('red.400')}
            color2={cn('red.400')}
            textColor={cn('white', 'black')}
            title={t('home.buttons.iSmoked')}
            text={t('home.buttons.tSmoked')}
          />
          <Paragraph
            color1={cn('amber.400')}
            color2={cn('amber.400')}
            textColor={cn('white', 'black')}
            title={t('home.buttons.iWant')}
            text={t('home.buttons.tWant')}
          />
          <Paragraph
            color1={cn('emerald.400')}
            color2={cn('emerald.400')}
            textColor={cn('white', 'black')}
            title={t('home.buttons.iDontWant')}
            text={t('home.buttons.tDontWant')}
            isLast={true}
          />
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
