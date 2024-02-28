import React from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import * as Images from 'shared/assets/images';
import { moderateScale } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';

type PresetBackgroundProps = {
  height?: number;
  source?: ImageSourcePropType;
  backgroundColor?: string;
  children: React.ReactNode;
};

export const PresetBackground = React.memo((props: PresetBackgroundProps) => {
  const { cn } = useTheme();

  const {
    height = moderateScale(230),
    source = Images.Icons,
    backgroundColor = cn('slate.900', 'slate.200'),
  } = props;

  return (
    <View style={{ height, backgroundColor }}>
      <ImageBackground
        source={source}
        resizeMode={'cover'}
        style={[styles.image, { height }]}>
        {props.children}
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
