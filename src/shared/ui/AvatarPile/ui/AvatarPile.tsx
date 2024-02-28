import { memo, useMemo } from 'react';
import { ColorValue, View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { Avatar } from 'shared/ui/Avatar';
import { CustomText } from 'shared/ui/CustomText';
import { styles } from './AvatarPileStyle';

interface AvatarPileType {
  _id: string | number;
  name: string;
  url?: string;
}

type AvatarPileProps = {
  avatars: AvatarPileType[];
  avatarCount?: number;
  size?: number;
  textColor: ColorValue;
  backgroundColor: string;
  resultTextColor: ColorValue;
  resultBackgroundColor: ColorValue;
};

export const AvatarPile = memo((props: AvatarPileProps) => {
  const {
    avatars,
    size = 28,
    avatarCount = 3,
    textColor,
    backgroundColor,
    resultTextColor,
    resultBackgroundColor,
  } = props;

  const avatarMemo = useMemo(() => {
    return avatars.length > avatarCount ? avatarCount : avatars.length;
  }, [avatarCount, avatars]);

  return (
    <View style={styles.container}>
      {avatarMemo > 0 && (
        <>
          {new Array(avatarMemo).fill(1).map((_, index) => {
            return (
              <View
                key={avatars[index]._id}
                style={[
                  styles.item,
                  index > 0 && styles.itemOffset,
                  { zIndex: 5 - index },
                  { backgroundColor: backgroundColor },
                ]}>
                <Avatar
                  size={size}
                  name={avatars[index].name}
                  avatarUrl={avatars[index].url}
                  textColor={textColor}
                  backgroundColor={backgroundColor + `${99 - index * 30}`}
                />
              </View>
            );
          })}
          <View
            style={[
              styles.count,
              {
                backgroundColor: resultBackgroundColor,
                width: moderateScale(size),
                height: moderateScale(size),
              },
            ]}>
            <CustomText
              style={{
                fontSize: size / 2.4,
                color: resultTextColor,
              }}>
              {avatars.length}
            </CustomText>
          </View>
        </>
      )}
    </View>
  );
});
