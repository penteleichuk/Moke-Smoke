import React, { useEffect, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';
import { PresetGradient } from './PresetGradient/PresetGradient';
import { styles } from './ScreenContentWithImageStyle';

type ScreenContentWithImageProps = {
  children: React.ReactNode;
  backgroundColor: string;
  gradientColor: string;
  present?: boolean;
  absolute?: boolean;
  image?: boolean;
  igEdges?: Edges;
};

export const ScreenContentWithImage = React.memo(
  (props: ScreenContentWithImageProps) => {
    const {
      children,
      backgroundColor,
      gradientColor,
      present = true,
      absolute = true,
      image = false,
      igEdges = [],
    } = props;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const edges = useMemo(() => {
      return (
        ['right', 'bottom', 'left', 'top'].filter(el => el !== igEdges) || []
      );
    }, [igEdges]);

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <SafeAreaView
        edges={edges as Edges}
        style={[
          styles.container,
          {
            backgroundColor,
          },
        ]}>
        {present && (
          <PresetGradient
            color={gradientColor}
            absolute={absolute}
            image={image}
          />
        )}
        <Animated.View style={[{ opacity: fadeAnim }, styles.content]}>
          {children}
        </Animated.View>
      </SafeAreaView>
    );
  },
);
