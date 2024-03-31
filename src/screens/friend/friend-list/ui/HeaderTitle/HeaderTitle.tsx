import { getUserCountFriends } from 'entities/user';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';

export const HeaderTitle = () => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const invited = useAppSelector(getUserCountFriends);

  return (
    <View style={styles.container}>
      <CustomText
        size={TextSize.S_XL}
        style={[{ color: cn('white', 'black') }]}>
        {t('friend.header.friend.title')}
      </CustomText>
      <CustomText style={[{ color: cn('slate.400', 'slate.700') }]}>
        {t('friend.header.friend.description', {
          value: invited,
        })}
      </CustomText>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});
