import { removeUserAvatar, setUserAvatar } from 'entities/user';
import { memo, useState } from 'react';
import { View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useTheme } from 'shared/lib/theme';
import { Avatar } from 'shared/ui/Avatar';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { AvatarApi } from './../model/api/AvatarApi';
import { styles } from './UserUpdateAvatarStyle';

const ICON_SIZE = moderateScale(12);

interface UserUpdateAvatarProps {
  isAuth: boolean;
  name: string;
  avatarUrl?: string;
}

export const UserUpdateAvatar = memo((props: UserUpdateAvatarProps) => {
  const { isAuth, name, avatarUrl } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { cn } = useTheme();
  const dispatch = useAppDispatch();

  const onPressUpdatePhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (result?.assets) {
        setIsLoading(true);
        const { uri, fileName, type } = result.assets[0];
        const res = await AvatarApi.upload(
          uri as string,
          fileName as string,
          type as string,
        );
        dispatch(removeUserAvatar());
        dispatch(setUserAvatar(res));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PressableOpacity
      disabled={isLoading || !isAuth}
      onPress={onPressUpdatePhoto}>
      <View style={styles.container}>
        <Avatar
          size={80}
          name={name}
          avatarUrl={avatarUrl}
          textColor={cn('slate.400', 'slate.200')}
          backgroundColor={cn('slate.700', 'slate.400')}
          isLoading={isLoading}
        />
        {isAuth && (
          <View
            style={[styles.icon, { backgroundColor: cn('slate.900') + '95' }]}>
            <Icons.Edit
              fill={cn('white')}
              width={ICON_SIZE}
              height={ICON_SIZE}
            />
          </View>
        )}
      </View>
    </PressableOpacity>
  );
});
