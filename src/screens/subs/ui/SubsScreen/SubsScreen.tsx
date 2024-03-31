import { TERMS_URL } from '@env';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import {
  getSubscriptionIsPremium,
  getSubscriptionProducts,
  subscriptionInitialaized,
  subscriptionPurchase,
  subscriptionRestore,
} from 'entities/subscription';
import { getUserIsQuitting, initUserSmoke } from 'entities/user';
import { setIsActivation } from 'features/passed-activation';
import Lottie from 'lottie-react-native';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, ScrollView, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { Indicator } from 'shared/ui/Indicator';
import { NavigationSplash } from 'shared/ui/NavigationSplash';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { SubsSlider } from 'widgets/subs-slider';
import { HeaderRight } from './../HeaderRight/HeaderRight';
import { SubsItem } from './../SubsItem/SubsItem';
import { styles } from './SubsScreenStyle';

type SubsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.SUBS
>;

export const SubsScreen = ({ navigation, route }: SubsScreenProps) => {
  const [select, setSelect] = useState<number>(0);
  const [isLoading, setIsLoadgin] = useState<boolean>(false);

  const paywall = useAppSelector(getSubscriptionProducts);
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isAuth = useAppSelector(getIsAuth);
  const isSmoking = useAppSelector(getUserIsQuitting);

  const { t } = useTranslation();
  const { cn } = useTheme();
  const dispatch = useAppDispatch();

  const discountedPrice = useMemo(() => {
    if (!paywall.length) {
      return 0.0;
    }

    return (
      (paywall[select].price?.amount || 0) /
      (paywall[select].subscriptionDetails?.subscriptionPeriod.numberOfUnits ||
        0)
    ).toFixed(2);
  }, [select, paywall]);

  const introductoryOffer = useMemo(() => {
    if (!paywall.length) {
      return false;
    }

    return !!paywall.find(el => el.subscriptionDetails?.introductoryOffers);
  }, [paywall]);

  const onPreesBuyHandler = useCallback(() => {
    if (paywall.length) {
      setIsLoadgin(true);
      dispatch(subscriptionPurchase(paywall[select])).finally(() => {
        setIsLoadgin(false);

        if (route.params?.show) {
          onPressNextHandler();
        }
      });
    }
  }, [select, paywall]);

  const onPreesRefreshHandler = useCallback(() => {
    setIsLoadgin(true);
    dispatch(subscriptionInitialaized()).finally(() => {
      setIsLoadgin(false);
    });
  }, [isPremium]);

  const onPressLinkHandler = () => {
    Linking.openURL(TERMS_URL);
  };

  const onPressRestoreHandler = async () => {
    if (!isLoading && isPremium) {
      return Alert.alert(
        t('alert.purchase.premium.title'),
        t('alert.purchase.premium.description.isset'),
        [{ text: t('alert.purchase.premium.button') }],
      );
    }

    if (!isLoading) {
      setIsLoadgin(true);
      dispatch(subscriptionRestore()).finally(() => {
        setIsLoadgin(false);
      });

      if (route.params?.show) {
        onPressNextHandler();
      }
    }
  };

  const onPressBackHandler = () => {
    if (isAuth) {
      navigation.navigate(AppNavigation.WELCOME_INFO);
    } else {
      navigation.navigate(AppNavigation.AUTH, { show: true });
    }
  };

  const onPressNextHandler = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: AppNavigation.MAIN }],
    });
    if (!isSmoking) {
      dispatch(initUserSmoke());
    }
    dispatch(setIsActivation(true));
  };

  const renderHeaderRight = useCallback(() => {
    return <HeaderRight />;
  }, []);

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      excludeEdges={['top']}
      navigation={navigation}
      navigationOptions={{
        headerRight: renderHeaderRight,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={styles.container}>
        {isLoading && <Indicator />}
        <View style={styles.header}>
          <Lottie
            source={Anims.Bubb}
            style={styles.iconBubble}
            autoPlay
            resizeMode={'cover'}
          />
          <Lottie
            source={Anims.Bubb}
            style={styles.iconBubble}
            autoPlay
            resizeMode={'cover'}
          />
          <View style={styles.premium}>
            <Lottie
              source={Anims.Premium}
              style={styles.iconPremium}
              autoPlay
              resizeMode={'cover'}
            />
            <View style={styles.premiumTitle}>
              <CustomText
                size={TextSize.S_3XL}
                style={{ color: cn('white', 'black') }}>
                {t('sheet.premium.title')}
              </CustomText>
            </View>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.slider}>
            <SubsSlider />
          </View>
          <View style={styles.content}>
            <View style={styles.items}>
              {paywall ? (
                paywall.map((el, index) => {
                  const price = (
                    (el.price?.amount || 0) /
                    (el.subscriptionDetails?.subscriptionPeriod.numberOfUnits ||
                      0)
                  ).toFixed(2);

                  const staticPrice = (
                    (paywall[0].price?.amount || 0) /
                    (paywall[0].subscriptionDetails?.subscriptionPeriod
                      .numberOfUnits || 0)
                  ).toFixed(2);

                  return (
                    <SubsItem
                      key={index}
                      index={index}
                      isActive={select === index}
                      staticPrice={+staticPrice}
                      staticMinus={+price}
                      staticCurrency={`${el.price?.currencySymbol}`}
                      onSelectHandler={setSelect}
                      name={`${el.subscriptionDetails?.localizedSubscriptionPeriod}`}
                      price={t('sheet.premium.in', {
                        price,
                        currencySymbol: `${el.price?.currencySymbol}`,
                      })}
                      montly={`${el.price?.localizedString}`}
                    />
                  );
                })
              ) : (
                <CustomText
                  size={TextSize.S_XL}
                  style={[styles.info, { color: cn('red.500') }]}>
                  {t('sheet.premium.notLoad')}
                </CustomText>
              )}

              <View style={styles.buttons}>
                {paywall.length ? (
                  <CustomButton
                    onPress={onPreesBuyHandler}
                    background={[cn('violet.500'), cn('indigo.500')]}
                    radius={10}
                    flex={1}>
                    {introductoryOffer
                      ? t('sheet.premium.free', {
                          price: discountedPrice,
                          currencySymbol:
                            paywall[0]?.price?.currencySymbol || '$',
                        })
                      : t('sheet.premium.subscription')}
                  </CustomButton>
                ) : (
                  <CustomButton
                    onPress={onPreesRefreshHandler}
                    background={[cn('violet.500'), cn('indigo.500')]}
                    radius={10}
                    flex={1}>
                    {t('sheet.premium.refresh')}
                  </CustomButton>
                )}
              </View>
            </View>

            <View style={styles.footer}>
              {paywall && (
                <CustomText
                  style={[
                    styles.info,
                    { color: cn('slate.200', 'slate.700') },
                  ]}>
                  {t('sheet.premium.info')}
                </CustomText>
              )}
              <View style={styles.links}>
                {paywall && (
                  <PressableOpacity onPress={onPressRestoreHandler}>
                    <CustomText
                      size={TextSize.S_LG}
                      style={{ color: cn('indigo.400', 'indigo.600') }}>
                      {t('sheet.premium.rebuild')}
                    </CustomText>
                  </PressableOpacity>
                )}
                <PressableOpacity onPress={onPressLinkHandler}>
                  <CustomText
                    size={TextSize.S_LG}
                    style={{ color: cn('indigo.400', 'indigo.600') }}>
                    {t('sheet.premium.privacy')}
                  </CustomText>
                </PressableOpacity>
              </View>
            </View>
          </View>
        </View>
        {route.params?.show && (
          <View style={styles.content}>
            <NavigationSplash
              onPressBack={onPressBackHandler}
              onPressNext={onPressNextHandler}
              nextText={t('welcome.nav.skip')}
            />
          </View>
        )}
      </ScrollView>
    </ScreenContent>
  );
};
