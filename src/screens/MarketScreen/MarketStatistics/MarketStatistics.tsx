import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './MarketStatisticsStyle';

interface MarketStatisticsProps {
  coin: number;
  rating: number;
  isPremium: boolean;
}

export const MarketStatistics = ({
  coin,
  rating,
  isPremium,
}: MarketStatisticsProps) => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[styles.container, { borderColor: cn('slate.800', 'slate.300') }]}>
      <View style={styles.content}>
        <View
          style={[styles.left, { borderColor: cn('slate.800', 'slate.300') }]}>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('slate.400', 'slate.600') }}>
            {t('sheet.purchase.coin')}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('white', 'black') }}>
            {coin}
          </CustomText>
        </View>
        <View
          style={[styles.left, { borderColor: cn('slate.800', 'slate.300') }]}>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('slate.400', 'slate.600') }}>
            {t('sheet.purchase.subscription.title')}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('white', 'black') }}>
            {t(`sheet.purchase.subscription.${isPremium ? 'stock' : 'nope'}`)}
          </CustomText>
        </View>
        <View style={styles.right}>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('slate.400', 'slate.600') }}>
            {t('sheet.purchase.rating')}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('white', 'black') }}>
            {rating}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
