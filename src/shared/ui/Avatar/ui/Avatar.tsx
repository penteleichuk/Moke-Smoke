import React from 'react';
import { ActivityIndicator, ColorValue, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from 'shared/config/dimensions';
import { CustomText } from 'shared/ui/CustomText';
import { styles } from './AvatarStyle';

type AvatarProps = {
  name: string;
  size: number;
  backgroundColor: ColorValue;
  textColor: ColorValue;
  avatarUrl?: string;
  isLoading?: boolean;
};

export const Avatar = React.memo((props: AvatarProps) => {
  const { name, size, textColor, backgroundColor, avatarUrl, isLoading } =
    props;

  const temp = name.split(' ');
  let result = 'NN';

  if (temp.length > 0 && temp[0].length > 1) {
    const frist = temp[0][0];
    const last = temp[1] ? temp[1][0] : temp[0][temp[0].length - 1];
    result = (frist + last).toUpperCase();
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: moderateScale(size),
          height: moderateScale(size),
          borderRadius: moderateScale(size),
          backgroundColor,
        },
      ]}>
      <FastImage
        style={[
          {
            width: moderateScale(size),
            height: moderateScale(size),
            borderRadius: moderateScale(size),
          },
          styles.image,
        ]}
        source={{
          uri: avatarUrl,
          priority: FastImage.priority.normal,
          cache: FastImage.cacheControl.web,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      {isLoading && (
        <View style={styles.loading}>
          <ActivityIndicator size="small" color={textColor} />
        </View>
      )}
      <CustomText
        style={[styles.name, { fontSize: size / 2.2, color: textColor }]}>
        {result}
      </CustomText>
    </View>
  );
});
