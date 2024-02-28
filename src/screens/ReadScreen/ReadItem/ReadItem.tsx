import MaskedView from '@react-native-masked-view/masked-view';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './ReadItemStyle';

const ICON_SIZE = { width: moderateScale(60), height: moderateScale(60) };
const ICON_TIME_SIZE = moderateScale(13);

const CoverIcons = [
  <Icons.Cover1 {...ICON_SIZE} />,
  <Icons.Cover2 {...ICON_SIZE} />,
  <Icons.Cover3 {...ICON_SIZE} />,
  <Icons.Cover3 {...ICON_SIZE} />,
  <Icons.Cover4 {...ICON_SIZE} />,
  <Icons.Cover5 {...ICON_SIZE} />,
  <Icons.Cover6 {...ICON_SIZE} />,
  <Icons.Cover7 {...ICON_SIZE} />,
  <Icons.Cover8 {...ICON_SIZE} />,
  <Icons.Cover9 {...ICON_SIZE} />,
  <Icons.Cover10 {...ICON_SIZE} />,
  <Icons.Cover10 {...ICON_SIZE} />,
  <Icons.Cover10 {...ICON_SIZE} />,
  <Icons.Cover10 {...ICON_SIZE} />,
];

type ReadItemProps = {
  title: string;
  text: string;
  index: number;
  time: number;
  isPremium: boolean;
};

export const ReadItem = memo((props: ReadItemProps) => {
  const { index, title, time, isPremium } = props;

  const { cn } = useTheme();
  const { t } = useTranslation();
  const navigation = useAppNavigation();

  const onPressHandler = () => {
    if (index > 3 && !isPremium) {
      navigation.navigate(AppNavigation.SUBS);
    } else {
      navigation.navigate(AppNavigation.COURSE, { courseId: index });
    }
  };

  return (
    <PressableOpacity onPress={onPressHandler}>
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
        <View style={styles.container}>
          <LinearGradient
            style={[styles.border, index > 3 && !isPremium && styles.lock]}
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
                {CoverIcons[index]}
                <View style={styles.container}>
                  <CustomText
                    size={TextSize.S_XL}
                    style={[styles.name, { color: cn('white', 'black') }]}>
                    {title}
                  </CustomText>
                  <View style={styles.timing}>
                    <Icons.Clock
                      fill={cn('slate.200', 'slate.700')}
                      width={ICON_TIME_SIZE}
                      height={ICON_TIME_SIZE}
                    />
                    <CustomText
                      size={TextSize.S_XL}
                      style={[
                        styles.time,
                        { color: cn('slate.200', 'slate.700') },
                      ]}>
                      {time} {t('help.header.course.scondary')}
                    </CustomText>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </LinearGradient>
        </View>
      </MaskedView>
    </PressableOpacity>
  );
});
