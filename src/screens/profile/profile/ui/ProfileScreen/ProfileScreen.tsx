import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { getSubscriptionIsPremium } from 'entities/subscription';
import {
  getUserAvatarUrl,
  getUserCoin,
  getUserEmailIsActivate,
  getUserIsPremium,
  getUserName,
  getUserPricePack,
  getUserSmokeCountPack,
  getUserSmokeEveryDay,
} from 'entities/user';
import { getCurrency } from 'features/currency-picker';
import { getHowMuchSmoking } from 'features/setting/set-how-much-smoke';
import { UserUpdateAvatar } from 'features/user-update-avatar';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import * as Images from 'shared/assets/images';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { getCurrencySymbol } from 'shared/lib/intl/getCurrencySymbol';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PresetBackground } from 'shared/ui/PresetBackground';
import { RowGroup } from 'shared/ui/RowGroup';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ProfileInfo } from './../ProfileInfo/ProfileInfo';
import { ProfileInfoItem } from './../ProfileInfoItem/ProfileInfoItem';
import { ProfileNavigation } from './../ProfileNavigation/ProfileNavigation';
import { styles } from './ProfileScreenStyle';

type ProfileScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.PROFILE
>;

const ICON_SIZE = moderateScale(15);

export const ProfileScreen = React.memo(
  ({ navigation }: ProfileScreenProps) => {
    const { cn } = useTheme();

    const isAuth = useAppSelector(getIsAuth) || false;
    const isVerify = useAppSelector(getUserEmailIsActivate) || false;

    const isPremium = useAppSelector(getSubscriptionIsPremium);
    const isUserPremium = useAppSelector(getUserIsPremium);

    const name = useAppSelector(getUserName);
    const avatarUrl = useAppSelector(getUserAvatarUrl);
    const coin = useAppSelector(getUserCoin) || 0;
    const cigaretteDay = useAppSelector(getUserSmokeEveryDay) || 0;
    const cigaretteCount = useAppSelector(getUserSmokeCountPack) || 0;
    const cigarettePrice = useAppSelector(getUserPricePack) || 0;
    const howMuch = useAppSelector(getHowMuchSmoking);
    const currency = useAppSelector(getCurrency);

    const { t } = useTranslation();

    const howMuchShowValue = useMemo(() => {
      return howMuch > 60
        ? `${howMuch / 60} ${t('times.h')}.`
        : `${howMuch} ${t('times.m')}.`;
    }, [howMuch]);

    const currencySymbol = useMemo(() => {
      return getCurrencySymbol(currency);
    }, [currency]);

    const onPressAuthHandler = () => {
      navigation.navigate(AppNavigation.AUTH);
    };

    const onPressVerifyHandler = () => {
      navigation.navigate(AppNavigation.VERIFY);
    };

    return (
      <ScreenContent
        backgroundColor={cn('slate.900', 'slate.200')}
        navigation={navigation}>
        <PresetBackground height={250} source={Images.Profile}>
          <UserUpdateAvatar isAuth={isAuth} name={name} avatarUrl={avatarUrl} />
          <View style={styles.profile}>
            <View style={styles.name}>
              {(isPremium || isUserPremium) && (
                <Icons.Mark
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  fill={cn('white', 'black')}
                />
              )}
              <CustomText
                size={TextSize.S_LG}
                style={{ color: cn('white', 'black') }}>
                {name}
              </CustomText>
            </View>
            <View style={styles.name}>
              <Icons.Coins
                width={ICON_SIZE}
                height={ICON_SIZE}
                fill={cn('orange.400', 'orange.500')}
              />
              <CustomText
                size={TextSize.S_LG}
                style={{ color: cn('orange.400', 'orange.500') }}>
                {coin}
              </CustomText>
            </View>
          </View>
        </PresetBackground>
        <View style={styles.container}>
          <View
            style={[
              styles.content,
              {
                borderColor: cn('slate.800', 'slate.300'),
                backgroundColor: cn('slate.800', 'white'),
              },
            ]}>
            <ProfileInfo
              isAuth={isAuth}
              isPremium={isPremium || isUserPremium}
            />
            <ProfileNavigation isAuth={isAuth} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isAuth && !isVerify && (
              <View style={styles.button}>
                <CustomButton
                  icons={Icons.Email}
                  onPress={onPressVerifyHandler}
                  background={[cn('purple.500'), cn('purple.600')]}
                  radius={10}>
                  {t('verify.title')}
                </CustomButton>
              </View>
            )}
            {!isAuth && (
              <View style={styles.button}>
                <CustomButton
                  onPress={onPressAuthHandler}
                  background={[cn('purple.500'), cn('purple.600')]}
                  radius={10}>
                  {t('settings.auth.client')}
                </CustomButton>
              </View>
            )}

            <RowGroup gap={moderateScale(20)} marginTop={0}>
              <ProfileInfoItem
                Icon={Icons.Energy}
                backgroundIcon={cn('rose.400')}
                colorIcon={cn('rose.100')}
                titleColor={cn('slate.300', 'slate.700')}
                valueColor={cn('white', 'black')}
                title={t('settings.client.name')}
                value={name}
              />
              <ProfileInfoItem
                Icon={Icons.Clock}
                backgroundIcon={cn('yellow.700')}
                colorIcon={cn('yellow.200')}
                titleColor={cn('slate.300', 'slate.700')}
                valueColor={cn('white', 'black')}
                title={t('settings.client.cigarette')}
                value={cigaretteDay}
              />
              <ProfileInfoItem
                Icon={Icons.Ds5}
                backgroundIcon={cn('teal.700')}
                colorIcon={cn('teal.200')}
                titleColor={cn('slate.300', 'slate.700')}
                valueColor={cn('white', 'black')}
                title={t('settings.client.cigaretteCount')}
                value={cigaretteCount}
              />
              <ProfileInfoItem
                Icon={Icons.Ds0}
                backgroundIcon={cn('violet.700')}
                colorIcon={cn('violet.200')}
                titleColor={cn('slate.300', 'slate.700')}
                valueColor={cn('white', 'black')}
                title={t('settings.client.price')}
                value={cigarettePrice + ' ' + currencySymbol}
              />
              <ProfileInfoItem
                Icon={Icons.ArrowDown}
                backgroundIcon={cn('sky.700')}
                colorIcon={cn('sky.200')}
                titleColor={cn('slate.300', 'slate.700')}
                valueColor={cn('white', 'black')}
                title={t('settings.client.howOffen')}
                value={howMuchShowValue}
              />
            </RowGroup>
          </ScrollView>
        </View>
      </ScreenContent>
    );
  },
);
