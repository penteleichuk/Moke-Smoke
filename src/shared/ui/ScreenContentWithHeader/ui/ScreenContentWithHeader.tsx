import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Animated, ColorValue, KeyboardAvoidingView, View } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from 'shared/config/navigation';
import { isIos } from 'shared/lib/utils/isIos';
import { styles } from './ScreenContentWithHeaderStyle';

type ScreenContentWithHeaderProps = {
  children: React.ReactNode;
  contentHeader: React.ReactNode;
  headerTintColor?: ColorValue;
  backgroundColor?: ColorValue;
  navigation?: NativeStackNavigationProp<RootStackParamList, any>;
  navigationOptions?: Partial<NativeStackNavigationOptions>;
  edges?: Edge[];
  attached?: boolean;
};

const IS_IOS = isIos();

export const ScreenContentWithHeader = React.memo(
  (props: ScreenContentWithHeaderProps) => {
    const {
      children,
      contentHeader,
      attached = false,
      headerTintColor,
      backgroundColor,
      navigationOptions,
      navigation,
      edges,
    } = props;

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    if (navigationOptions) {
      navigation?.setOptions({
        ...navigationOptions,
      });
    }

    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={IS_IOS ? 'padding' : 'height'}
        enabled={attached}>
        {attached ? (
          <View
            style={{
              backgroundColor: headerTintColor,
            }}>
            <View style={[styles.header]}>{contentHeader}</View>
          </View>
        ) : (
          <SafeAreaView
            edges={edges}
            style={{
              backgroundColor: headerTintColor,
            }}>
            <View style={[styles.header]}>{contentHeader}</View>
          </SafeAreaView>
        )}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              backgroundColor: backgroundColor,
            },
          ]}>
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    );
  },
);
