import { AUTHOR_LINKEDIN, AUTHOR_SITE, AUTHOR_URI_AVATAR } from '@env';
import { useTranslation } from 'react-i18next';
import { Image, Linking, SafeAreaView, View } from 'react-native';
import { Linkedin, Site } from 'shared/assets/icons';
import { CONTENT_PADDING, moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { Row } from 'shared/ui/Row';
import { ScreenContentWithImage } from 'shared/ui/ScreenContentWithImage';
import { styles } from './AuthorScreenStyle';

const ICON_SIZE = moderateScale(50);

export const AuthorScreen = () => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const onPressLinkedinHandler = () => {
    Linking.openURL(AUTHOR_LINKEDIN);
  };

  const onPressSiteHandler = () => {
    Linking.openURL(AUTHOR_SITE);
  };

  return (
    <ScreenContentWithImage
      backgroundColor={cn('slate.900', 'slate.200')}
      gradientColor={cn('indigo.800', 'transparent')}
      image={true}>
      <SafeAreaView style={styles.container}>
        <Image
          resizeMode="cover"
          style={styles.avatar}
          source={{
            uri: AUTHOR_URI_AVATAR,
          }}
        />
        <View style={styles.info}>
          <CustomText
            size={TextSize.S_3XL}
            weight={TextWeight.BOLD}
            style={[styles.name, { color: cn('white', 'black') }]}>
            {t('author.title')}
          </CustomText>
          <CustomText
            size={TextSize.S_XL}
            style={[
              styles.description,
              { color: cn('slate.300', 'slate.600') },
            ]}>
            {t('author.text')}
          </CustomText>
        </View>
        <Row gap={CONTENT_PADDING}>
          <PressableOpacity onPress={onPressSiteHandler}>
            <Site
              fill={cn('indigo.500')}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </PressableOpacity>
          <PressableOpacity onPress={onPressLinkedinHandler}>
            <Linkedin
              fill={cn('indigo.500')}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </PressableOpacity>
        </Row>
      </SafeAreaView>
    </ScreenContentWithImage>
  );
};
