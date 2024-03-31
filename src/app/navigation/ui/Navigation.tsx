import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { getUserIsQuitting } from 'entities/user';
import { getIsActivation } from 'features/passed-activation';
import { memo } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { AudioScreen } from 'screens/audio/audio';
import { AudioPlayScreen } from 'screens/audio/audio-play';
import { ChangePasswordScreen } from 'screens/auth/change-password';
import { ForgotScreen } from 'screens/auth/forgot';
import { AuthScreen } from 'screens/auth/login';
import { RegistrationScreen } from 'screens/auth/registration';
import { VerifyScreen } from 'screens/auth/verify';
import { AuthorScreen } from 'screens/author';
import { CardsScreen } from 'screens/cards';
import { InputScreen } from 'screens/form/input';
import { PickerScreen } from 'screens/form/picker';
import { FriendQRScreen } from 'screens/friend/friend-QR';
import { FriendAddScreen } from 'screens/friend/friend-add';
import { FriendIdScreen } from 'screens/friend/friend-by-id';
import { FriendScreen } from 'screens/friend/friend-list';
import { FriendPresentScreen } from 'screens/friend/friend-present';
import { NavigationHelpScreen } from 'screens/help-navigation';
import { TrainerHelpScreen } from 'screens/help-trainer';
import { MarketScreen } from 'screens/market';
import { BreatheScreen } from 'screens/practice/breathe';
import { HappyScreen } from 'screens/practice/happy';
import { MindfulnessScreen } from 'screens/practice/mindfulness';
import { MorningScreen } from 'screens/practice/morning';
import { WaterScreen } from 'screens/practice/water';
import { ProfileScreen } from 'screens/profile/profile';
import { ProfileSettingScreen } from 'screens/profile/profile-setting';
import { ProgressScreen } from 'screens/progress';
import { ReadScreen } from 'screens/read/read';
import { ReadDetailsScreen } from 'screens/read/read-details';
import { SubsScreen } from 'screens/subs';
import { ChatScreen } from 'screens/tab-navigation/chat';
import { FeedCreateScreen } from 'screens/tab-navigation/feed/feed-create';
import { FeedDetailsScreen } from 'screens/tab-navigation/feed/feed-details';
import { FeedHelpScreen } from 'screens/tab-navigation/feed/feed-help';
import { FeedsScreen } from 'screens/tab-navigation/feed/feed-list';
import { TaskScreen } from 'screens/task/task';
import { TaskEditScreen } from 'screens/task/task-edit';
import { TrackerScreen } from 'screens/tracker';
import { WelcomeScreen } from 'screens/welcome';
import { WelcomeInfoScreen } from 'screens/welcome-info';
import { AppNavigation, NavigationStackLists } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { TabNavigation } from 'widgets/tab-navigation';

export const Stack = createNativeStackNavigator<NavigationStackLists>();

const Navigation = () => {
  const isActivation = useAppSelector(getIsActivation);
  const isAuth = useAppSelector(getIsAuth);
  const isSmoking = useAppSelector(getUserIsQuitting);

  const { cn } = useTheme();
  const tintColor = cn('white', 'black');

  return (
    <NavigationContainer
      theme={DarkTheme}
      onReady={() => RNBootSplash.hide({ fade: true })}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: tintColor,
          title: '',
          headerBackTitleVisible: false,
        }}
        initialRouteName={
          !isActivation || !isSmoking
            ? AppNavigation.WELCOME
            : AppNavigation.MAIN
        }>
        <Stack.Screen
          name={AppNavigation.WELCOME}
          options={{
            headerTransparent: true,
          }}
          component={WelcomeScreen}
        />
        <Stack.Screen
          name={AppNavigation.MAIN}
          options={{ headerShown: false }}
          component={TabNavigation}
        />
        <Stack.Screen
          name={AppNavigation.WELCOME_INFO}
          options={{
            headerTransparent: true,
          }}
          component={WelcomeInfoScreen}
        />
        {!isAuth && (
          <>
            <Stack.Screen
              name={AppNavigation.AUTH}
              options={{
                headerTransparent: true,
              }}
              initialParams={{ show: false }}
              component={AuthScreen}
            />
            <Stack.Screen
              name={AppNavigation.REGISTRATION}
              options={{
                headerTransparent: true,
              }}
              initialParams={{ show: false }}
              component={RegistrationScreen}
            />
            <Stack.Screen
              name={AppNavigation.FORGOT}
              options={{
                headerTransparent: true,
              }}
              initialParams={{ show: false }}
              component={ForgotScreen}
            />
          </>
        )}
        <Stack.Screen
          name={AppNavigation.VERIFY}
          options={{
            headerTransparent: true,
          }}
          component={VerifyScreen}
        />
        <Stack.Screen
          name={AppNavigation.COURSE}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
          component={ReadDetailsScreen}
        />
        <Stack.Screen
          name={AppNavigation.READ}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
          component={ReadScreen}
        />
        <Stack.Screen
          name={AppNavigation.CARDS}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
          component={CardsScreen}
        />
        <Stack.Screen
          name={AppNavigation.TASK}
          options={{
            headerTransparent: true,
          }}
          component={TaskScreen}
        />
        <Stack.Screen
          name={AppNavigation.TASK_EDIT}
          options={{
            headerTransparent: true,
          }}
          component={TaskEditScreen}
        />
        <Stack.Screen
          name={AppNavigation.PROGRESS}
          options={{
            headerTransparent: true,
          }}
          component={ProgressScreen}
        />
        <Stack.Screen
          name={AppNavigation.PROFILE}
          options={{
            headerTransparent: true,
          }}
          component={ProfileScreen}
        />
        <Stack.Screen
          name={AppNavigation.PROFILE_SETTING}
          options={{
            headerTransparent: true,
          }}
          component={ProfileSettingScreen}
        />
        <Stack.Screen
          name={AppNavigation.PICKER}
          options={{
            headerTransparent: true,
          }}
          component={PickerScreen}
        />
        <Stack.Screen
          name={AppNavigation.INPUT}
          options={{
            headerTransparent: true,
          }}
          component={InputScreen}
        />
        <Stack.Screen
          name={AppNavigation.AUTHOR}
          options={{
            headerTransparent: true,
          }}
          component={AuthorScreen}
        />
        <Stack.Screen
          name={AppNavigation.SUBS}
          options={{
            headerTitleAlign: 'center',
            headerTransparent: true,
          }}
          initialParams={{ show: false }}
          component={SubsScreen}
        />
        <Stack.Screen
          name={AppNavigation.MARKET}
          options={{
            headerTransparent: true,
          }}
          component={MarketScreen}
        />
        <Stack.Screen
          name={AppNavigation.CHANGE_PASSWORD}
          options={{
            headerTransparent: true,
          }}
          component={ChangePasswordScreen}
        />
        <Stack.Screen
          name={AppNavigation.MORNING}
          options={{
            headerTransparent: true,
          }}
          component={MorningScreen}
        />
        <Stack.Screen
          name={AppNavigation.WATER}
          options={{
            headerTransparent: true,
          }}
          component={WaterScreen}
        />
        <Stack.Screen
          name={AppNavigation.BREATHE}
          options={{
            headerTransparent: true,
          }}
          component={BreatheScreen}
        />
        <Stack.Screen
          name={AppNavigation.HAPPY}
          options={{
            headerTransparent: true,
          }}
          component={HappyScreen}
        />
        <Stack.Screen
          name={AppNavigation.MINDFULNESS}
          options={{
            headerTransparent: true,
          }}
          component={MindfulnessScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_ID}
          options={{
            headerTransparent: true,
          }}
          component={FriendIdScreen}
        />
        <Stack.Screen
          name={AppNavigation.CHAT}
          options={{
            headerTransparent: true,
          }}
          component={ChatScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND}
          options={{
            headerTransparent: true,
          }}
          component={FriendScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_PRESENT}
          options={{
            headerTransparent: true,
          }}
          component={FriendPresentScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_QR}
          options={{
            headerTransparent: true,
          }}
          component={FriendQRScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_ADD}
          options={{
            headerTransparent: true,
          }}
          component={FriendAddScreen}
        />
        <Stack.Screen
          name={AppNavigation.FEED}
          options={{
            headerTransparent: true,
          }}
          component={FeedDetailsScreen}
        />
        <Stack.Screen
          name={AppNavigation.FEED_CREATE}
          options={{
            headerTransparent: true,
          }}
          component={FeedCreateScreen}
        />
        <Stack.Screen name={AppNavigation.FEEDS_ME} component={FeedsScreen} />
        <Stack.Screen
          name={AppNavigation.FEED_HELP}
          component={FeedHelpScreen}
        />
        <Stack.Screen
          name={AppNavigation.AUDIO_PLAY}
          options={{
            headerTransparent: true,
          }}
          component={AudioPlayScreen}
        />
        <Stack.Screen
          name={AppNavigation.AUDIO}
          options={{
            headerTransparent: true,
          }}
          component={AudioScreen}
        />
        <Stack.Screen
          name={AppNavigation.TRACKER}
          options={{
            headerTransparent: true,
          }}
          component={TrackerScreen}
        />
        <Stack.Screen
          name={AppNavigation.TRAINER_HELP}
          options={{
            headerTransparent: true,
          }}
          component={TrainerHelpScreen}
        />
        <Stack.Screen
          name={AppNavigation.NAVIGATION_HELP}
          options={{
            headerTransparent: true,
          }}
          component={NavigationHelpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Navigation);
