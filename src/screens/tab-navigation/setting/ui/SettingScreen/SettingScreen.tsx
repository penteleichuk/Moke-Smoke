import { TELEGRAM_URL } from '@env';
import { useScrollToTop } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getColorScheme, setColorScheme } from 'app/providers/ThemeProvider';
import { getIsAuth } from 'entities/auth';
import { getUserEmailIsActivate } from 'entities/user';
import { LanguagePicker } from 'features/language-picker';
import { ToggleNotification } from 'features/setting/toggle-notification';
import { ToggleVibration } from 'features/setting/toggle-vibration';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';
import Rate from 'react-native-rate';
import * as Icons from 'shared/assets/icons';
import { TITLE_MARGIN } from 'shared/config/dimensions';
import {
  AppNavigation,
  AppTabNavigation,
  RootStackParamList,
} from 'shared/config/navigation';
import { rateConfig } from 'shared/config/rate';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { ColorSchemeType, useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { LinkPicker } from 'shared/ui/LinkPicker';
import { LinkRow } from 'shared/ui/LinkRow';
import { RowGroup } from 'shared/ui/RowGroup';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './SettingScreenStyle';

type SettingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppTabNavigation.SETTING
>;

export const SettingScreen = ({ navigation }: SettingScreenProps) => {
  const scrollTop = React.useRef(null);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(getIsAuth) || false;
  const isVerify = useAppSelector(getUserEmailIsActivate) || false;
  const colorScheme = useAppSelector(getColorScheme);

  const onPressAuthHandler = useCallback(() => {
    navigation.navigate(AppNavigation.AUTH);
  }, []);

  const onPressReviewHandler = () => {
    try {
      Rate.rate(rateConfig);
    } catch (e) {}
  };

  const onPressTelegramHandler = () => {
    try {
      Linking.openURL(TELEGRAM_URL);
    } catch (e) {}
  };

  useScrollToTop(scrollTop);

  const onPressProfileHandler = () => {
    navigation.navigate(AppNavigation.PROFILE);
  };

  const onPressCoinHandler = () => {
    navigation.navigate(AppNavigation.MARKET);
  };

  const onPressSubsHandler = () => {
    navigation.navigate(AppNavigation.SUBS);
  };

  const onPressAuthorHandler = () => {
    navigation.navigate(AppNavigation.AUTHOR);
  };

  const onPressVerifyHandler = () => {
    navigation.navigate(AppNavigation.VERIFY);
  };

  const onPressColorHandler = (value: string | number) => {
    dispatch(setColorScheme(value as ColorSchemeType));
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      navigationOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: cn('slate.700', 'slate.300'),
        },
      }}>
      <View style={styles.container}>
        <CustomText
          weight={TextWeight.BOLD}
          size={TextSize.S_3XL}
          style={{ color: cn('slate.300', 'black') }}>
          {t('settings.header.title')}
        </CustomText>
        <RowGroup gap={TITLE_MARGIN * 2.3}>
          <LinkRow
            Icon={Icons.Mark}
            backgroundColorIcon={cn('violet.500')}
            colorIcon={cn('violet.200')}
            textColor={cn('white', 'black')}
            text={t('settings.auth.titleProfile')}
            onPress={onPressProfileHandler}
          />
          {!isAuth && (
            <LinkRow
              Icon={Icons.Lock}
              backgroundColorIcon={cn('rose.600')}
              colorIcon={cn('rose.200')}
              textColor={cn('white', 'black')}
              text={t('settings.auth.client')}
              onPress={onPressAuthHandler}
            />
          )}
          {isAuth && !isVerify && (
            <LinkRow
              Icon={Icons.Email}
              backgroundColorIcon={cn('rose.600')}
              colorIcon={cn('rose.200')}
              textColor={cn('white', 'black')}
              text={t('verify.title')}
              onPress={onPressVerifyHandler}
            />
          )}
          <LinkRow
            Icon={Icons.Cover7}
            backgroundColorIcon={cn('amber.700')}
            colorIcon={cn('amber.300')}
            textColor={cn('white', 'black')}
            text={t('settings.info.subscription')}
            onPress={onPressSubsHandler}
          />
          <LinkRow
            Icon={Icons.Coins}
            backgroundColorIcon={cn('lime.700')}
            colorIcon={cn('lime.200')}
            textColor={cn('white', 'black')}
            text={t('settings.info.coin')}
            onPress={onPressCoinHandler}
          />
          <LinkRow
            Icon={Icons.Star}
            backgroundColorIcon={cn('yellow.700')}
            colorIcon={cn('yellow.200')}
            textColor={cn('white', 'black')}
            text={t('settings.info.review')}
            onPress={onPressReviewHandler}
          />
          <LanguagePicker />
          <LinkPicker
            placeholder={t('settings.info.theme')}
            label={[
              t('settings.info.themeLang'),
              t('settings.info.themeLight'),
              t('settings.info.themeDark'),
            ]}
            values={['system', 'light', 'dark']}
            Icon={Icons.Theme}
            backgroundColorIcon={cn('purple.700')}
            colorIcon={cn('purple.200')}
            textColor={cn('white', 'black')}
            value={colorScheme}
            variant={'string'}
            onSubmit={onPressColorHandler}
          />
          <LinkRow
            Icon={Icons.Cover1}
            backgroundColorIcon={cn('rose.700')}
            colorIcon={cn('rose.300')}
            textColor={cn('white', 'black')}
            text={t('settings.info.author')}
            onPress={onPressAuthorHandler}
          />
          <LinkRow
            Icon={Icons.Telegram}
            backgroundColorIcon={cn('blue.600')}
            colorIcon={cn('blue.200')}
            textColor={cn('white', 'black')}
            text={'Telegram'}
            onPress={onPressTelegramHandler}
          />
        </RowGroup>
        <RowGroup gap={TITLE_MARGIN * 2.3}>
          <ToggleNotification />
          <ToggleVibration />
        </RowGroup>
      </View>
    </ScreenContent>
  );
};
