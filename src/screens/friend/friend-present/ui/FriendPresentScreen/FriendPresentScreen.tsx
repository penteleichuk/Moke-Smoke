import { APP_NAME, INVITE_URL } from '@env';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { getUserId, getUserIsPremium, getUserListFriends } from 'entities/user';
import Lottie from 'lottie-react-native';
import { useTranslation } from 'react-i18next';
import { Alert, Platform, ScrollView, Share, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import * as Icons from 'shared/assets/icons';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { LinkRow } from 'shared/ui/LinkRow';
import { RowGroup } from 'shared/ui/RowGroup';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { useCameraPermissions } from './../../model/lib/camera-permission/useCameraPermissions';
import { styles } from './FriendPresentScreenStyle';

type FriendPresentScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FRIEND_PRESENT
>;

export const FriendPresentScreen = ({
  navigation,
}: FriendPresentScreenProps) => {
  const userId = useAppSelector(getUserId);
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);
  const friends = useAppSelector(getUserListFriends) || [];

  const { cn } = useTheme();
  const { t } = useTranslation();
  const { permission } = useCameraPermissions();

  const onPressQRHandler = () => {
    navigation.navigate(AppNavigation.FRIEND_QR);
  };

  const onPressAddHandler = async () => {
    if (!isPremium && !isUserPremium && friends.length > 1) {
      return Alert.alert(
        t('alert.friendAdd.title'),
        t('alert.friendAdd.description'),
        [{ text: t('alert.friendAdd.button') }],
      );
    }

    const isGranted = await permission();
    if (isGranted) {
      navigation.navigate(AppNavigation.FRIEND_ADD);
    }
  };

  const onPressInviteHandler = async () => {
    try {
      await Share.share({
        message:
          t('friend.share.message', { value: APP_NAME }) + ' ' + Platform.OS ===
          'android'
            ? `${INVITE_URL}${userId}`
            : '',
        url: `${INVITE_URL}${userId}`,
      });
    } catch (error) {}
  };

  return (
    <ScreenContent
      navigation={navigation}
      backgroundColor={cn('slate.900', 'slate.200')}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Lottie
            style={[styles.anim]}
            source={Anims.Scane}
            resizeMode={'cover'}
            autoPlay
            loop
          />
        </View>
        <View style={styles.content}>
          <RowGroup gap={20}>
            <LinkRow
              Icon={Icons.Friends}
              backgroundColorIcon={cn('blue.600')}
              colorIcon={cn('blue.200')}
              textColor={cn('white', 'black')}
              text={t('detached.friend.title')}
              onPress={onPressQRHandler}
            />
            <LinkRow
              Icon={Icons.Plus}
              backgroundColorIcon={cn('lime.700')}
              colorIcon={cn('lime.200')}
              textColor={cn('white', 'black')}
              text={t('detached.scan.camera')}
              onPress={onPressAddHandler}
            />
            <LinkRow
              Icon={Icons.Top}
              backgroundColorIcon={cn('purple.700')}
              colorIcon={cn('purple.200')}
              textColor={cn('white', 'black')}
              text={t('friend.notification.button')}
              onPress={onPressInviteHandler}
            />
          </RowGroup>
        </View>
      </ScrollView>
    </ScreenContent>
  );
};
