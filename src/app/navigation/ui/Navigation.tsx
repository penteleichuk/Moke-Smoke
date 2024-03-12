import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { getUserIsQuitting } from 'entities/user';
import { getIsActivation } from 'features/PassedActivation';
import { memo } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { AudioPlayScreen } from 'screens/AudioPlayScreen';
import { AudioScreen } from 'screens/AudioScreen';
import { AuthScreen } from 'screens/AuthScreen';
import { AuthorScreen } from 'screens/AuthorScreen';
import { CardsScreen } from 'screens/CardsScreen';
import { ChangePasswordScreen } from 'screens/ChangePasswordScreen';
import { ChatScreen } from 'screens/ChatScreen';
import { FeedCreateScreen } from 'screens/FeedCreateScreen';
import { FeedDetailsScreen } from 'screens/FeedDetailsScreen';
import { FeedHelpScreen } from 'screens/FeedHelpScreen';
import { FeedsScreen } from 'screens/FeedsScreen';
import { ForgotScreen } from 'screens/ForgotScreen';
import { FriendAddScreen } from 'screens/FriendAddScreen';
import { FriendIdScreen } from 'screens/FriendIdScreen';
import { FriendPresentScreen } from 'screens/FriendPresentScreen';
import { FriendQRScreen } from 'screens/FriendQRScreen';
import { FriendScreen } from 'screens/FriendScreen';
import { InputScreen } from 'screens/InputScreen';
import { MarketScreen } from 'screens/MarketScreen';
import { NavigationHelpScreen } from 'screens/NavigationHelpScreen';
import { PickerScreen } from 'screens/PickerScreen';
import { BreatheScreen } from 'screens/Practice/BreatheScreen';
import { HappyScreen } from 'screens/Practice/HappyScreen';
import { MindfulnessScreen } from 'screens/Practice/MindfulnessScreen';
import { MorningScreen } from 'screens/Practice/MorningScreen';
import { WaterScreen } from 'screens/Practice/WaterScreen';
import { ProfileScreen } from 'screens/ProfileScreen';
import { ProfileSettingScreen } from 'screens/ProfileSettingScreen';
import { ProgressScreen } from 'screens/ProgressScreen';
import { ReadDetailsScreen } from 'screens/ReadDetailsScreen';
import { ReadScreen } from 'screens/ReadScreen';
import { RegistrationScreen } from 'screens/RegistrationScreen';
import { SubsScreen } from 'screens/SubsScreen';
import { TaskEditScreen } from 'screens/TaskEditScreen';
import { TaskScreen } from 'screens/TaskScreen';
import { TrackerScreen } from 'screens/TrackerScreen';
import { TrainerHelpScreen } from 'screens/TrainerHelpScreen';
import { VerifyScreen } from 'screens/VerifyScreen';
import { WelcomeInfoScreen } from 'screens/WelcomeInfoScreen';
import { WelcomeScreen } from 'screens/WelcomeScreen';
import { AppNavigation, NavigationStackLists } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { TabNavigation } from 'widgets/TabNavigation';

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
