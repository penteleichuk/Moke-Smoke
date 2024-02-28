import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import 'moment/min/locales';
import { AppRegistry, LogBox } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { googleSigninConfig } from 'shared/config/google';
import 'shared/config/i18n';
import { onMessageReceived } from 'shared/lib/utils/messageReceived';
import App from './src/app';
import { audioPlaybackService } from './src/entities/audio';

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

GoogleSignin.configure(googleSigninConfig);

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Sending',
  'new NativeEventEmitter',
]);

TrackPlayer.registerPlaybackService(() => audioPlaybackService);

AppRegistry.registerComponent('DontSmoke', () => App);
