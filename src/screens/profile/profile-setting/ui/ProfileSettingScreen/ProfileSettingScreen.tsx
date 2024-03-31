import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { СlearStatistics } from 'features/clear-statistic';
import { CurrencyPicker } from 'features/currency-picker';
import { RemoveAccount } from 'features/remove-account';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { LinkRow } from 'shared/ui/LinkRow';
import { RowGroup } from 'shared/ui/RowGroup';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { ProfileSettingInputs } from 'widgets/profile-setting-inputs';
import { styles } from './ProfileSettingStyle';

type ProfileSettingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.PROFILE_SETTING
>;

export const ProfileSettingScreen = ({
  navigation,
}: ProfileSettingScreenProps) => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const isAuth = useAppSelector(getIsAuth);
  const headerHeight = useHeaderHeight();

  const onPressChangePassword = useCallback(() => {
    navigation.navigate(AppNavigation.CHANGE_PASSWORD);
  }, []);

  return (
    <ScreenContent
      excludeEdges={['top', 'bottom']}
      backgroundColor={cn('slate.900', 'slate.200')}
      navigationOptions={{
        headerStyle: {
          backgroundColor: cn('slate.900', 'slate.200'),
        },
      }}
      navigation={navigation}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <RowGroup gap={30} marginTop={0}>
            <CustomText
              size={TextSize.S_3XL}
              style={{ color: cn('white', 'black') }}>
              {t('settings.auth.titleProfile')}
            </CustomText>
            <RowGroup gap={20} marginTop={0}>
              <ProfileSettingInputs />
            </RowGroup>
          </RowGroup>
          <RowGroup gap={30}>
            <CustomText
              size={TextSize.S_3XL}
              style={{ color: cn('white', 'black') }}>
              {t('settings.auth.titleSett')}
            </CustomText>
            <RowGroup gap={20} marginTop={0}>
              {isAuth && (
                <LinkRow
                  Icon={Icons.EyeOff}
                  textColor={cn('white', 'black')}
                  backgroundColorIcon={cn('teal.700')}
                  colorIcon={cn('teal.200')}
                  text={t('settings.auth.change')}
                  onPress={onPressChangePassword}
                />
              )}
              <CurrencyPicker />
              <СlearStatistics />
              {isAuth && <RemoveAccount />}
            </RowGroup>
          </RowGroup>
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
