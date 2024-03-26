import { authLogout } from 'entities/auth';
import { useTranslation } from 'react-i18next';
import { Alert, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { CustomButton } from 'shared/ui/CustomButton';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './ProfileNavigationStyle';

type ProfileNavigationProps = {
  isAuth: boolean;
};

const ICON_SIZE = moderateScale(20);

export const ProfileNavigation = ({ isAuth }: ProfileNavigationProps) => {
  const { t } = useTranslation();
  const { cn } = useTheme();
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const onPressEditHandler = () => {
    navigation.navigate(AppNavigation.PROFILE_SETTING);
  };

  const logout = () => {
    dispatch(authLogout());
    DisplayMessage({
      message: t('alert.logout.message'),
      type: 'success',
    });
  };

  const onPressLogoutAlert = () => {
    Alert.alert(t('alert.logout.title'), t('alert.logout.description'), [
      { text: t('alert.logout.cancel') },
      {
        text: t('alert.logout.accept'),
        onPress: logout,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <CustomButton
        icons={Icons.Edit}
        onPress={onPressEditHandler}
        background={[cn('indigo.500'), cn('indigo.600')]}
        radius={10}>
        {t('settings.profile.edit')}
      </CustomButton>
      {isAuth && (
        <PressableOpacity onPress={onPressLogoutAlert} style={styles.pressable}>
          <LinearGradient
            style={styles.gradient}
            end={{ x: 0.7, y: 1.9 }}
            colors={[cn('neutral.500'), cn('neutral.600')]}>
            <Icons.Logout
              width={ICON_SIZE}
              height={ICON_SIZE}
              fill={cn('white')}
            />
          </LinearGradient>
        </PressableOpacity>
      )}
    </View>
  );
};
