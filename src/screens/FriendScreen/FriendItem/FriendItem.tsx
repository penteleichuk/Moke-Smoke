import { DifferenceDate, FriendSchema } from 'entities/friends';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { NOTIFICATION_HOURS } from 'shared/const/app';
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation';
import { useTheme } from 'shared/lib/theme';
import { substringStr } from 'shared/lib/utils/substringStr';
import { Avatar } from 'shared/ui/Avatar';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './FriendItemStyle';

const AVATAR_SIZE = 50;

export const FriendItem = React.memo((props: FriendSchema) => {
  const { name, notifUpdatedAt, avatarUrl } = props;

  const { t } = useTranslation();
  const { cn } = useTheme();
  const navigation = useAppNavigation();

  const isNotification = useMemo(() => {
    if (!notifUpdatedAt) {
      return true;
    }

    return new DifferenceDate(new Date(notifUpdatedAt), new Date())
      .getDifferenceInHours()
      .diff(NOTIFICATION_HOURS);
  }, [notifUpdatedAt]);

  const lastActivity = useMemo(() => {
    if (!notifUpdatedAt) {
      return false;
    }
    return moment(notifUpdatedAt).format('lll');
  }, [notifUpdatedAt]);

  const onPressFriendById = () => {
    navigation.navigate(AppNavigation.FRIEND_ID, { ...props });
  };

  return (
    <PressableOpacity onPress={onPressFriendById}>
      <View
        style={[
          styles.container,
          { backgroundColor: cn('slate.800', 'slate.300') },
        ]}>
        <View style={styles.content}>
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
            styles.button,
            {
              backgroundColor: isNotification
                ? cn('rose.400')
                : cn('indigo.500'),
            },
          ]}>
          <Icons.ArowRight
            width={moderateScale(12)}
            height={moderateScale(12)}
            fill={cn('white')}
          />
        </View>
      </View>
    </PressableOpacity>
  );
});
