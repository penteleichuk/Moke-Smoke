import { getUserListFriends, getUserRating } from 'entities/user';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AppNavigation } from 'shared/config/navigation';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './ProfileInfoStyle';

interface ProfileInfoProps {
  isPremium: boolean;
  isAuth: boolean;
}

export const ProfileInfo = ({ isPremium, isAuth }: ProfileInfoProps) => {
  const { t } = useTranslation();
  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const friends = useAppSelector(getUserListFriends);
  const rating = useAppSelector(getUserRating);

  const onPressFriendHandler = () => {
    navigation.navigate(isAuth ? AppNavigation.FRIEND : AppNavigation.AUTH);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.item,
          styles.indentLeft,
          { borderColor: cn('slate.700', 'slate.300') },
        ]}>
        <PressableOpacity
          style={styles.pressable}
          onPress={onPressFriendHandler}>
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('slate.400', 'slate.600') }}>
            {t('sheet.friend.friend')}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'black') }}>
            {friends?.length}
          </CustomText>
        </PressableOpacity>
      </View>
      <View
        style={[
          styles.item,
          styles.indentLeft,
          styles.indentRight,
          { borderColor: cn('slate.700', 'slate.300') },
        ]}>
        <CustomText
          size={TextSize.S_LG}
          style={{ color: cn('slate.400', 'slate.600') }}>
          {t('sheet.purchase.subscription.title')}
        </CustomText>
        <CustomText
          size={TextSize.S_LG}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t(`sheet.purchase.subscription.${isPremium ? 'stock' : 'nope'}`)}
        </CustomText>
      </View>
      <View style={styles.item}>
        <CustomText
          size={TextSize.S_LG}
          style={{ color: cn('slate.400', 'slate.600') }}>
          {t('sheet.purchase.rating')}
        </CustomText>
        <CustomText
          size={TextSize.S_LG}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {rating || 0}
        </CustomText>
      </View>
    </View>
  );
};
