import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { setNotificationIsEnabled } from 'entities/notification';
import { getUserName, getUserPricePack } from 'entities/user';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import { RESULTS, checkNotifications } from 'react-native-permissions';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ProfileSettingInputs } from 'widgets/profile-setting-inputs';
import { styles } from './WelcomeInfoScreenStyle';

type WelcomeInfoProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.WELCOME_INFO
>;

export const WelcomeInfoScreen = React.memo(
  ({ navigation }: WelcomeInfoProps) => {
    const name = useAppSelector(getUserName);
    const cigarettePrice = useAppSelector(getUserPricePack) || 0;
    const isAuth = useAppSelector(getIsAuth);

    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { cn } = useTheme();

    useEffect(() => {
      checkNotifications().then(res => {
        if (res.status === RESULTS.GRANTED) {
          dispatch(setNotificationIsEnabled({ isEnabled: true }));
        }
      });
    }, []);

    const onPressNextHandler = () => {
      navigation.navigate(isAuth ? AppNavigation.SUBS : AppNavigation.AUTH, {
        show: true,
      });
    };

    const onPressBackHandler = () => {
      navigation.navigate(AppNavigation.WELCOME);
    };

    const isDisabledMemo = useMemo(
      () => !name.length || !cigarettePrice,
      [name, cigarettePrice],
    );

    return (
      <ScreenContent
        backgroundColor={cn('slate.900', 'slate.200')}
        navigation={navigation}
        excludeEdges={['top']}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          contentContainerStyle={styles.container}>
          <View style={styles.content}>
            <CustomText
              size={TextSize.S_3XL}
              weight={TextWeight.BOLD}
              style={[styles.title, { color: cn('white', 'black') }]}>
              {t('welcome.profile')}
            </CustomText>
            <View style={styles.inputs}>
              <ProfileSettingInputs />
            </View>
          </View>
          <NavigationSplash
            disabled={isDisabledMemo}
            onPressBack={onPressBackHandler}
            onPressNext={onPressNextHandler}
            nextText={t('welcome.nav.next')}
          />
        </ScrollView>
      </ScreenContent>
    );
  },
);
