import { useChatOnline } from 'features/SendMessageChat';
import { View } from 'react-native';
import { useTheme } from 'shared/lib/theme';
import { styles } from './HeaderRightStyle';

export const HeaderRight = () => {
  const { cn } = useTheme();
  const { loading } = useChatOnline();

  return (
    <View>
      <View style={[styles.content]}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor: loading ? cn('orange.500') : cn('green.500'),
            },
          ]}
        />
      </View>
    </View>
  );
};
