import { FriendSchema } from 'entities/friends';
import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'shared/lib/theme';
import { Indicator } from 'shared/ui/Indicator';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { FriendEmpty } from './../FriendEmpty/FriendEmpty';
import { FriendFind } from './../FriendFind/FriendFind';
import { styles } from './FriendAddScreenStyle';

export const FriendAddScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [friend, setFriend] = useState<FriendSchema | null>(null);
  const [status, setStatus] = useState<'idle' | 'find'>('idle');

  const { cn } = useTheme();

  return (
    <ScreenContent backgroundColor={cn('slate.900', 'slate.200')}>
      <View style={[styles.container, status === 'idle' && styles.loading]}>
        <View style={styles.content}>
          {status === 'idle' && (
            <FriendEmpty
              loading={loading}
              setLoading={setLoading}
              setFriend={setFriend}
              setStatus={setStatus}
            />
          )}
          {status === 'find' && (
            <FriendFind
              loading={loading}
              setLoading={setLoading}
              friend={friend as FriendSchema}
            />
          )}
        </View>
        {loading && <Indicator />}
      </View>
    </ScreenContent>
  );
};
