import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './FeedHelpStyle';

type FeedHelpScreenType = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FEED_HELP
>;

export const FeedHelpScreen = ({ navigation }: FeedHelpScreenType) => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  return (
    <ScreenContent
      navigation={navigation}
      excludeEdges={['top']}
      backgroundColor={cn('slate.900', 'slate.200')}
      avoiding={false}
      navigationOptions={{
        headerStyle: {
          backgroundColor: cn('slate.900', 'slate.200'),
        },
      }}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          <View style={styles.anims}>
            <Lottie source={Anims.Help} autoPlay loop />
          </View>
          <View style={styles.data}>
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('white', 'black') }}>
              {t('feed.info.0')}
            </CustomText>
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('white', 'black') }}>
              {t('feed.info.1')}
            </CustomText>
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('white', 'black') }}>
              {t('feed.info.2')}
            </CustomText>
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('white', 'black') }}>
              {t('feed.info.3')}
            </CustomText>
          </View>
        </ScrollView>
      </View>
    </ScreenContent>
  );
};
