import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import Tts from 'react-native-tts';
import TypeWriterEffect from 'react-native-typewriter-effect';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './ReadDetailsScreenStyle';

const ICON_AUDIO_SIZE = {
  width: moderateScale(35),
  height: moderateScale(35),
};

type CourseType = {
  title: string;
  text: string;
};

type ReadDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.COURSE
>;

export const ReadDetailsScreen = ({
  route,
  navigation,
}: ReadDetailsScreenProps) => {
  const [audio, setAudio] = useState(false);
  const courseId = route.params.courseId;

  const { t } = useTranslation();
  const { cn } = useTheme();
  const headerHeight = useHeaderHeight();

  const course = t('help.course', {
    returnObjects: true,
    n: '\n',
  }) as Array<CourseType>;

  useEffect(() => {
    return () => {
      Tts.stop();
      setAudio(false);
    };
  }, []);

  const onPressAudioHandler = () => {
    Tts.getInitStatus().then(
      () => {
        if (audio) {
          setAudio(false);
          Tts.stop();
        } else {
          Tts.speak(course[courseId].text);
          setAudio(true);
        }
      },
      err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      },
    );
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          { paddingTop: headerHeight },
        ]}>
        <View style={styles.content}>
          <View style={styles.header}>
            <CustomText
              size={TextSize.S_2XL}
              weight={TextWeight.MEDIUM}
              style={{ color: cn('white', 'black') }}>
              {course[courseId].title}
            </CustomText>
            <PressableOpacity onPress={onPressAudioHandler}>
              {audio ? (
                <Icons.Stop
                  {...ICON_AUDIO_SIZE}
                  fill={cn('indigo.500', 'indigo.600')}
                />
              ) : (
                <Icons.Play
                  {...ICON_AUDIO_SIZE}
                  fill={cn('indigo.500', 'indigo.600')}
                />
              )}
            </PressableOpacity>
          </View>
          <View
            style={[
              styles.wrapper,
              { backgroundColor: cn('slate.800', 'slate.100') },
            ]}>
            <TypeWriterEffect
              maxDelay={50}
              content={course[courseId].text}
              style={[styles.text, { color: cn('white', 'black') }]}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
