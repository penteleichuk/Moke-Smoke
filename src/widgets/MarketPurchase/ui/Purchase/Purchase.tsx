import {
  PURCHASE_CARDS_PRICE,
  PURCHASE_CLEAN_PRICE,
  PURCHASE_COIN_PRICE,
  PURCHASE_COIN_VALUE,
} from '@env';
import { getSubscriptionIsPremium } from 'entities/subscription';
import {
  userBuyRating,
  userSafeCleaning,
  userUnlockCards,
} from 'entities/user';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import { moderateScale } from 'react-native-size-matters';
import * as Anims from 'shared/assets/anims';
import { SCREEN_WIDTH } from 'shared/config/dimensions';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { Pagination } from './../Pagination/Pagination';
import { PurchaseItem } from './../PurchaseItem/PurchaseItem';

export const Purchase = () => {
  const progressValue = useSharedValue<number>(0);
  const isPremium = useAppSelector(getSubscriptionIsPremium);

  const { cn } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onPressRating = useCallback(() => {
    Alert.alert(
      t('sheet.purchase.items.rating.alert.title'),
      t('sheet.purchase.items.rating.alert.description', {
        rating: PURCHASE_COIN_VALUE,
        value: PURCHASE_COIN_PRICE,
      }),
      [
        { text: t('sheet.purchase.items.rating.alert.cancel') },
        {
          text: t('sheet.purchase.items.rating.alert.accept'),
          onPress: () => {
            dispatch(userBuyRating());
          },
        },
      ],
    );
  }, []);

  const onPressCards = useCallback(() => {
    if (isPremium) {
      return Alert.alert(
        t('sheet.purchase.have.title'),
        t('sheet.purchase.have.description'),
        [{ text: t('sheet.purchase.have.button') }],
      );
    }

    Alert.alert(
      t('sheet.purchase.items.cards.alert.title'),
      t('sheet.purchase.items.cards.alert.description', {
        value: PURCHASE_CARDS_PRICE,
      }),
      [
        { text: t('sheet.purchase.items.cards.alert.cancel') },
        {
          text: t('sheet.purchase.items.cards.alert.accept'),
          onPress: () => {
            dispatch(userUnlockCards());
          },
        },
      ],
    );
  }, []);

  const onPressClean = useCallback(() => {
    Alert.alert(
      t('sheet.purchase.items.clean.alert.title'),
      t('sheet.purchase.items.clean.alert.description', {
        value: PURCHASE_CLEAN_PRICE,
      }),
      [
        { text: t('sheet.purchase.items.clean.alert.cancel') },
        {
          text: t('sheet.purchase.items.clean.alert.accept'),
          onPress: () => {
            dispatch(userSafeCleaning());
          },
        },
      ],
    );
  }, []);

  const items = useMemo(() => {
    return [
      {
        name: t('sheet.purchase.items.rating.name'),
        value: t('sheet.purchase.items.rating.value', {
          value: PURCHASE_COIN_VALUE,
        }),
        description: t('sheet.purchase.items.rating.description'),
        button: t('sheet.purchase.items.rating.button', {
          value: PURCHASE_COIN_PRICE,
        }),
        onPress: onPressRating,
        Anim: Anims.Rating,
      },
      {
        name: t('sheet.purchase.items.cards.name'),
        value: t('sheet.purchase.items.cards.value'),
        description: t('sheet.purchase.items.cards.description'),
        button: t('sheet.purchase.items.cards.button', {
          value: PURCHASE_CARDS_PRICE,
        }),
        onPress: onPressCards,
        Anim: Anims.Cards,
      },
      {
        name: t('sheet.purchase.items.clean.name'),
        value: t('sheet.purchase.items.clean.value'),
        description: t('sheet.purchase.items.clean.description'),
        button: t('sheet.purchase.items.clean.button', {
          value: PURCHASE_CLEAN_PRICE,
        }),
        onPress: onPressClean,
        Anim: Anims.Clean,
      },
    ];
  }, []);

  return (
    <>
      <Carousel
        loop={true}
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH - moderateScale(15)}
        pagingEnabled={true}
        snapEnabled={true}
        data={items}
        scrollAnimationDuration={800}
        mode="parallax"
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 75,
        }}
        renderItem={({ index }) => (
          <PurchaseItem index={index} item={items[index]} />
        )}
      />

      {!!progressValue && (
        <Pagination
          backgroundColor={cn('slate.800', 'slate.100')}
          backgroundColorNot={cn('slate.700', 'slate.300')}
          backgroundColorActive={cn('indigo.500', 'indigo.300')}
          progressValue={progressValue}
          quantity={items.length}
        />
      )}
    </>
  );
};
