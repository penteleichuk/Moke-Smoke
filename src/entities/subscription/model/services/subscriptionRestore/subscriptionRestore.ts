import { createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { AdaptyProfile, adapty } from 'react-native-adapty';

export const subscriptionRestore = createAsyncThunk(
  'subscription/restore',
  async (_, thunkAPI) => {
    const { t } = useTranslation();

    try {
      const profile: AdaptyProfile = await adapty.restorePurchases();
      const isPremium = profile?.accessLevels?.premium.isActive || false;

      if (isPremium) {
        Alert.alert(
          t('alert.purchase.premium.title'),
          t('alert.purchase.premium.description.succes'),
          [{ text: t('alert.purchase.premium.button') }],
        );
      } else {
        Alert.alert(
          t('alert.purchase.premium.title'),
          t('alert.purchase.premium.description.empry'),
          [{ text: t('alert.purchase.premium.button') }],
        );
      }

      return { isPremium };
    } catch (error: unknown) {
      Alert.alert(
        t('alert.purchase.premium.title'),
        t('alert.purchase.premium.description.error'),
        [{ text: t('alert.purchase.premium.button') }],
      );

      return thunkAPI.rejectWithValue({});
    }
  },
);
