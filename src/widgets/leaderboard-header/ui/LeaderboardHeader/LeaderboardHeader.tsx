import { PeopleType } from 'entities/people';
import { getUserRating } from 'entities/user';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { LeaderboardItem } from './../LeaderboardItem/LeaderboardItem';
import { styles } from './LeaderboardHeaderStyle';

type LeaderboardHeaderProps = {
  isError: boolean;
  isIsset: boolean;
  isVisible: boolean;
  items: PeopleType[];
};

const ANIM_DURATION = 500;
const HEIGHT_CANVAS = 200;

export const LeaderboardHeader = React.memo((props: LeaderboardHeaderProps) => {
  const { isError, isIsset, items, isVisible } = props;
  const [first, second, third] = items;
  const rating = useAppSelector(getUserRating);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const fadeOpacity = useRef(new Animated.Value(0)).current;
  const fadeHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeValue = isVisible ? 1 : 0;
    const heightValue = isVisible ? HEIGHT_CANVAS : 0;

    Animated.parallel([
      Animated.timing(fadeOpacity, {
        toValue: fadeValue,
        duration: isVisible ? ANIM_DURATION : ANIM_DURATION / 2,
        useNativeDriver: false,
      }),
      Animated.timing(fadeHeight, {
        toValue: heightValue,
        duration: isVisible ? ANIM_DURATION / 2 : ANIM_DURATION,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isVisible, fadeOpacity, fadeHeight]);

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <CustomText
          size={TextSize.S_2XL}
          style={{ color: cn('white', 'black') }}>
          {t('global.title')}
        </CustomText>

        <View style={[styles.coin, { backgroundColor: cn('emerald.600') }]}>
          <Icons.ArowTop
            width={moderateScale(13)}
            height={moderateScale(13)}
            fill={cn('white')}
          />
          <CustomText
            size={TextSize.S_LG}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white') }}>
            {rating}
          </CustomText>
        </View>
      </View>
      {!isError && isIsset && (
        <Animated.View style={[{ opacity: fadeOpacity, height: fadeHeight }]}>
          <View style={[styles.content]}>
            <View style={[styles.second]}>
              <LeaderboardItem
                avatarSize={75}
                avatarUrl={second?.avatarUrl}
                name={second?.name}
                rating={second?.rating}
                color={cn('sky.300', 'sky.600')}
                place={2}
              />
            </View>
            <View style={[styles.first]}>
              <LeaderboardItem
                avatarSize={95}
                avatarUrl={first?.avatarUrl}
                name={first?.name}
                rating={first?.rating}
                color={cn('amber.300', 'amber.600')}
                place={1}
              />
            </View>
            <View style={[styles.third]}>
              <LeaderboardItem
                avatarSize={75}
                avatarUrl={third?.avatarUrl}
                name={third?.name}
                rating={third?.rating}
                color={cn('fuchsia.300', 'fuchsia.600')}
                place={3}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
});
