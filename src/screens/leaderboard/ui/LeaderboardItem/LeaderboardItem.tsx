import moment from 'moment';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { Avatar } from 'shared/ui/Avatar';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { EmojiCountries } from 'shared/ui/EmojiCountries';
import { abbrNum } from 'shared/utils/abbrNum';
import { substringStr } from 'shared/utils/substringStr';
import { styles } from './LeaderboardItemStyle';

interface LeaderboardItemProps {
  index: number;
  name: string;
  country: string;
  rating: number;
  avatarUrl?: string;
  motivationUpdatedAt: Date | null;
}

export const LeaderboardItem = React.memo((props: LeaderboardItemProps) => {
  const { name, country, rating, index, avatarUrl, motivationUpdatedAt } =
    props;

  const { t } = useTranslation();
  const { cn } = useTheme();

  const motivationMemo = useMemo(() => {
    if (!motivationUpdatedAt) {
      return false;
    }
    return moment(motivationUpdatedAt).format('ll');
  }, [motivationUpdatedAt]);

  return (
    <View style={[styles.container]}>
      <View style={styles.content}>
        <CustomText
          size={TextSize.S_XL}
          weight={TextWeight.BOLD}
          style={[styles.count, { color: cn('slate.700') }]}>
          {index + 4}
        </CustomText>
        <View style={[styles.avatar]}>
          <Avatar
            size={50}
            name={name || ''}
            backgroundColor={cn('slate.500', 'slate.400')}
            textColor={cn('slate.800', 'slate.200')}
            avatarUrl={avatarUrl}
          />
        </View>
        <View>
          <CustomText
            size={TextSize.S_LG}
            style={{ color: cn('white', 'black') }}>
            {substringStr(name, 23)}
          </CustomText>
          <View style={styles.info}>
            <EmojiCountries name={country} size={moderateScale(13)} />

            <CustomText style={{ color: cn('slate.200', 'slate.700') }}>
              {motivationMemo ? motivationMemo : t('friend.group.nActivity')}
            </CustomText>
          </View>
        </View>
      </View>
      <View>
        <View style={[styles.rating, { backgroundColor: cn('indigo.500') }]}>
          <View>
            <Icons.ArowTop
              width={moderateScale(10)}
              height={moderateScale(10)}
              fill={cn('white')}
            />
          </View>
          <CustomText weight={TextWeight.MEDIUM} style={{ color: cn('white') }}>
            {abbrNum(rating || 0, 0)}
          </CustomText>
        </View>
      </View>
    </View>
  );
});
