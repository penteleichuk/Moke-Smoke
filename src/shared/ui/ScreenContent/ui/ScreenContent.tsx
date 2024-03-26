import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { ReactNode, memo, useEffect, useRef } from 'react';
import {
  Animated,
  BackHandler,
  ColorValue,
  KeyboardAvoidingView,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from 'shared/config/navigation';
import { isIos } from 'shared/lib/isIos';
import { styles } from './ScreenContentStyle';

type ScreenProps = {
  children: ReactNode;
  edges?: Edge[];
  excludeEdges?: Edge[];
  backgroundColor?: ColorValue | undefined;
  avoiding?: boolean;
  navigation?: NativeStackNavigationProp<RootStackParamList, any>;
  navigationOptions?: Partial<NativeStackNavigationOptions>;
  disableBackHandler?: boolean;
};

const IS_IOS = isIos();

export const ScreenContent = memo((props: ScreenProps) => {
  const {
    children,
    avoiding = true,
    edges = ['top', 'bottom', 'left', 'right'],
    excludeEdges = [],
    backgroundColor,
    navigation,
    navigationOptions,
    disableBackHandler = false,
  } = props;

  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [opacityAnim]);

  useEffect(() => {
    navigation?.setOptions({
      headerShown: true,
      headerTitleAlign: 'center',
      headerShadowVisible: false,
      gestureEnabled: !disableBackHandler,
    });

    if (disableBackHandler) {
      navigation?.setOptions({
        headerLeft: undefined,
        headerBackTitle: undefined,
      });
    }

    BackHandler.addEventListener('hardwareBackPress', () => disableBackHandler);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        () => disableBackHandler,
      );
    };
  }, []);

  useEffect(() => {
    if (navigationOptions) {
      navigation?.setOptions({
        ...navigationOptions,
      });
    }
  }, [navigationOptions, navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={IS_IOS ? 'padding' : 'height'}
      enabled={avoiding}>
      <Animated.View
        style={[
          { opacity: opacityAnim },
          { backgroundColor },
          styles.container,
        ]}>
        <SafeAreaView
          edges={edges.filter(el => !excludeEdges.includes(el))}
          style={[styles.content]}>
          {children}
        </SafeAreaView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
});
