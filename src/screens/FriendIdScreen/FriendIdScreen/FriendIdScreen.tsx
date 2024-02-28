import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import {
  DifferenceDate,
  FriendMotivationItem,
  friendApi,
  useFrinds,
} from 'entities/friends';
import { addUserCoint, addUserRating } from 'entities/user';
import Lottie from 'lottie-react-native';
import moment from 'moment';
import { useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import * as Images from 'shared/assets/images';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { NOTIFICATION_HOURS } from 'shared/const/app';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useTheme } from 'shared/lib/theme';
import { substringStr } from 'shared/lib/utils/substringStr';
import { Avatar } from 'shared/ui/Avatar';
import { CustomButton } from 'shared/ui/CustomButton';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { ScreenContentWithImage } from 'shared/ui/ScreenContentWithImage';
import { styles } from './FriendIdScreenStyle';

type FriendIdScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.FRIEND_ID
>;

const AVATAR_SIZE = moderateScale(50);

export const FriendIdScreen = ({ navigation, route }: FriendIdScreenProps) => {
  const {
    _id,
    name,
    coin,
    friendIds,
    rating,
    notifUpdatedAt,
    toBegin,
    motivations,
    avatarUrl,
  } = route.params;

  const { t } = useTranslation();
  const { cn } = useTheme();
  const dispatch = useAppDispatch();

  const { [AppSheet.MOTIVATE]: motivateRef } = useContext(SheetCreateContext);
  const [body, setBody] = useState<string>(t('sheet.friend.message'));
  const { refetch: refetchFriends } = useFrinds();

  const lastActivity = useMemo(() => {
    return toBegin ? moment(toBegin).format('lll') : '';
  }, [_id, toBegin]);

  const isMotivationSubmit = useMemo(() => {
    if (!notifUpdatedAt) {
      return true;
    }

    return new DifferenceDate(new Date(notifUpdatedAt), new Date())
      .getDifferenceInHours()
      .diff(NOTIFICATION_HOURS);
  }, [_id, notifUpdatedAt]);

  const onPressMotivation = async () => {
    try {
      await friendApi.motivate(
        _id,
        body.length > 3 ? body : t('sheet.friend.message'),
      );
      dispatch(addUserCoint(5));
      dispatch(addUserRating(3));
      navigation.push(AppNavigation.MAIN);
      motivateRef?.current?.present();
    } catch (e) {
      DisplayMessage({
        message: t('message.error.Network Error.title'),
        description: t('message.error.Network Error.message'),
        type: 'danger',
      });
    }
    setBody(t('sheet.friend.message'));
    refetchFriends();
  };

  return (
    <ScreenContentWithImage
      backgroundColor={cn('slate.900', 'slate.200')}
      gradientColor={cn('indigo.800', 'transparent')}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        contentContainerStyle={styles.container}>
        <View>
          <View>
            <View style={styles.profile}>
              <Avatar
                size={AVATAR_SIZE}
                name={name || ''}
                avatarUrl={avatarUrl}
                textColor={cn('slate.400', 'slate.200')}
                backgroundColor={cn('slate.700', 'slate.400')}
              />
              <View>
                <CustomText
                  size={TextSize.S_LG}
                  style={{ color: cn('white', 'black') }}>
                  {substringStr(name, 30)}
                </CustomText>

                <CustomText
                  size={TextSize.S_LG}
                  style={{ color: cn('slate.400', 'slate.700') }}>
                  {lastActivity ? lastActivity : t('friend.group.nActivity')}
                </CustomText>
              </View>
            </View>

            <View
              style={[
                styles.line,
                { borderColor: cn('slate.800', 'slate.300') },
              ]}>
              <View style={styles.items}>
                <FriendMotivationItem
                  Icon={Images.SuccessEM}
                  value={motivations.success}
                />
                <FriendMotivationItem
                  Icon={Images.WrongEM}
                  value={motivations.wrong}
                />
                <FriendMotivationItem
                  Icon={Images.DangerEM}
                  value={motivations.danger}
                />
                <FriendMotivationItem Icon={Images.Coin} value={coin || 0} />
                <FriendMotivationItem
                  Icon={Images.Friend}
                  value={friendIds?.length || 0}
                />
                <FriendMotivationItem
                  Icon={Images.Rating}
                  value={rating || 0}
                />
              </View>
            </View>
          </View>
          <View style={styles.motivation}>
            <CustomText
              size={TextSize.S_2XL}
              style={[styles.title, { color: cn('white', 'black') }]}>
              {t('sheet.friend.title')}
            </CustomText>
            <View style={styles.animation}>
              <View style={styles.animationWrapper}>
                <Lottie source={Anims.Wakeup} resizeMode={'cover'} autoPlay />
              </View>
            </View>
            <CustomText
              size={TextSize.S_XL}
              style={[
                styles.description,
                { color: cn('slate.400', 'slate.700') },
              ]}>
              {t('sheet.friend.description')}
            </CustomText>
            <CustomButton
              onPress={onPressMotivation}
              background={[cn('indigo.500'), cn('indigo.600')]}
              radius={10}
              disabled={isMotivationSubmit}>
              {t('sheet.friend.button')}
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </ScreenContentWithImage>
  );
};
