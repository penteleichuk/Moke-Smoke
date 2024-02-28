import { PURCHASE_CARDS_PRICE } from '@env';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'app/providers/StoreProvider';
import { Alert } from 'react-native';
import i18n from 'shared/config/i18n';

export const userUnlockCards = createAsyncThunk(
  'user/buy/cards',
  async (_, thunkAPI) => {
    const { auth, user } = thunkAPI.getState() as RootState;

    if (user.cards) {
      Alert.alert(
        i18n.t('alert.purchase.coin.present.title'),
        i18n.t('alert.purchase.coin.present.description'),
        [{ text: i18n.t('alert.purchase.coin.present.accept') }],
      );
    } else if (user.coin < PURCHASE_CARDS_PRICE) {
      Alert.alert(
        i18n.t('alert.purchase.coin.deficiency.title'),
        i18n.t('alert.purchase.coin.deficiency.description'),
        [{ text: i18n.t('alert.purchase.coin.deficiency.accept') }],
      );
    } else if (auth.isAuth) {
      try {
        Alert.alert(
          i18n.t('alert.purchase.coin.success.title'),
          i18n.t('alert.purchase.coin.success.description'),
          [{ text: i18n.t('alert.purchase.coin.success.accept') }],
        );
        return { cards: true, coin: user.coin - PURCHASE_CARDS_PRICE };
      } catch (e: any) {
        if (e.response.data.message === 'Unauthorized') {
          Alert.alert(
            i18n.t('alert.purchase.coin.unauthorized.title'),
            i18n.t('alert.purchase.coin.unauthorized.description'),
            [{ text: i18n.t('alert.purchase.coin.unauthorized.accept') }],
          );
        } else {
          Alert.alert(
            i18n.t('alert.purchase.coin.error.title'),
            i18n.t('alert.purchase.coin.error.description'),
            [{ text: i18n.t('alert.purchase.coin.error.accept') }],
          );
        }
      }
    } else {
      Alert.alert(
        i18n.t('alert.purchase.coin.success.title'),
        i18n.t('alert.purchase.coin.success.description'),
        [{ text: i18n.t('alert.purchase.coin.success.accept') }],
      );

      return { cards: true, coin: user.coin - PURCHASE_CARDS_PRICE };
    }

    return { cards: user.cards, coin: user.coin };
  },
);
