import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useTheme } from 'shared/lib/theme';
import { substringStr } from 'shared/lib/utils/substringStr';
import { Avatar } from 'shared/ui/Avatar';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './MarketProfileStyle';

interface MarketProfileProps {
  name: string;
  avatarUrl?: string;
  lastActivity: string;
}

const AVATAR_SIZE = 55;

export const MarketProfile = ({
  name,
  avatarUrl,
  lastActivity,
}: MarketProfileProps) => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          size={AVATAR_SIZE}
          name={name}
          avatarUrl={avatarUrl}
          textColor={cn('slate.400', 'slate.200')}
          backgroundColor={cn('slate.700', 'slate.400')}
        />
      </View>
      <View style={styles.desc}>
        <CustomText
          size={TextSize.S_2XL}
          style={{ color: cn('white', 'black') }}>
          {substringStr(name, 40)}
        </CustomText>

        <CustomText
          size={TextSize.S_LG}
          style={{ color: cn('slate.400', 'slate.700') }}>
          {lastActivity ? lastActivity : t('friend.group.nActivity')}
        </CustomText>
      </View>
    </View>
  );
};
