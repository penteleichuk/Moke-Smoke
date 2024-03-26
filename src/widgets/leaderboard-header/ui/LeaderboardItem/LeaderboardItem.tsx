import { View } from 'react-native';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { isIos } from 'shared/lib/isIos';
import { useTheme } from 'shared/lib/theme';
import { Avatar } from 'shared/ui/Avatar/ui/Avatar';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { styles } from './LeaderboardItemStyle';

interface LeaderboardItemProps {
  name: string;
  color: string;
  place: number;
  rating: number;
  avatarSize: number;
  avatarUrl?: string;
}

const IS_IOS = isIos();

export const LeaderboardItem = (props: LeaderboardItemProps) => {
  const { name, color, place, avatarSize, rating, avatarUrl } = props;

  const { cn } = useTheme();

  return (
    <View>
      <ShadowedView
        style={{
          ...shadowStyle({
            opacity: IS_IOS ? 0.3 : 0.0,
            radius: 20,
            offset: [3, 3],
            color,
          }),
        }}>
        <View style={[styles.avatar, { borderColor: color }]}>
          <Avatar
            size={avatarSize}
            name={name}
            backgroundColor={cn('slate.300', 'slate.500')}
            textColor={cn('slate.500', 'slate.200')}
            avatarUrl={avatarUrl}
          />
          <View style={styles.icon}>
            {place === 1 ? (
              <Icons.Сrown width={20} height={20} fill={color} />
            ) : (
              <Icons.Triangle width={13} height={13} fill={color} />
            )}
          </View>
          <View style={[styles.place]}>
            <View style={[styles.placeCircle, { backgroundColor: color }]}>
              <CustomText
                size={TextSize.S_LG}
                style={[styles.placeText, { color: cn('black') }]}>
                {place}
              </CustomText>
            </View>
          </View>
        </View>
      </ShadowedView>
      <View style={[styles.content]}>
        <CustomText
          size={TextSize.S_LG}
          style={[styles.name, { color: cn('white', 'black') }]}>
          {name || ''}
        </CustomText>
        <View style={styles.coin}>
          <Icons.ArowTop
            width={moderateScale(12)}
            height={moderateScale(12)}
            fill={cn('white', 'slate.700')}
          />
          <CustomText style={{ color: cn('white', 'slate.700') }}>
            {rating}
          </CustomText>
        </View>
      </View>
    </View>
  );
};
