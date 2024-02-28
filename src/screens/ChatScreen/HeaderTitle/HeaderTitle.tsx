import { useChatOnline } from 'features/SendMessageChat';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './HeaderTitleStyle';

export const HeaderTitle = () => {
  const { cn } = useTheme();
  const { online, loading } = useChatOnline();
  const { t } = useTranslation();

  return (
    <View style={[styles.content]}>
      <CustomText
        size={TextSize.S_XL}
        weight={TextWeight.BOLD}
        style={[styles.text, { color: cn('white', 'black') }]}>
        {t('chat.people')} {!loading ? online : '...'}
      </CustomText>
    </View>
  );
};
