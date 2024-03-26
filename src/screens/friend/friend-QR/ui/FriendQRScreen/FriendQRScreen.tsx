import { getUserId } from 'entities/user';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { styles } from './FriendQRScreenStyle';

export const FriendQRScreen = () => {
  const { t } = useTranslation();
  const { cn } = useTheme();
  const userId = useAppSelector(getUserId);

  return (
    <ScreenContent backgroundColor={cn('slate.900', 'slate.200')}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View
            style={[
              styles.code,
              { backgroundColor: cn('slate.700', 'slate.300') },
            ]}>
            <QRCode
              size={200}
              color={cn('white', 'slate.700')}
              value={userId || ' '}
              backgroundColor={cn('slate.700', 'slate.300')}
            />
          </View>
          <CustomText
            size={TextSize.S_XL}
            style={{ color: cn('white', 'black') }}>
            {t('friends.add')}
          </CustomText>
        </View>
      </View>
    </ScreenContent>
  );
};
