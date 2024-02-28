import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getIsAuth } from 'entities/auth';
import { getUserIsQuitting } from 'entities/user';
import { getIsActivation } from 'features/PassedActivation';
import { memo } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import * as Screen from 'screens';
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
          component={Screen.WelcomeScreen}
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
          component={Screen.WelcomeInfoScreen}
        />
        {!isAuth && (
          <>
            <Stack.Screen
              name={AppNavigation.AUTH}
              options={{
                headerTransparent: true,
              }}
              initialParams={{ show: false }}
              component={Screen.AuthScreen}
            />
            <Stack.Screen
              name={AppNavigation.REGISTRATION}
              options={{
                headerTransparent: true,
              }}
              initialParams={{ show: false }}
              component={Screen.RegistrationScreen}
            />
            <Stack.Screen
              name={AppNavigation.FORGOT}
              options={{
                headerTransparent: true,
              }}
              initialParams={{ show: false }}
              component={Screen.ForgotScreen}
            />
          </>
        )}
        <Stack.Screen
          name={AppNavigation.VERIFY}
          options={{
            headerTransparent: true,
          }}
          component={Screen.VerifyScreen}
        />
        <Stack.Screen
          name={AppNavigation.COURSE}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
          component={Screen.ReadDetailsScreen}
        />
        <Stack.Screen
          name={AppNavigation.READ}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
          component={Screen.ReadScreen}
        />
        <Stack.Screen
          name={AppNavigation.CARDS}
          options={{
            headerTransparent: true,
            headerBackTitleVisible: false,
          }}
          component={Screen.CardsScreen}
        />
        <Stack.Screen
          name={AppNavigation.TASK}
          options={{
            headerTransparent: true,
          }}
          component={Screen.TaskScreen}
        />
        <Stack.Screen
          name={AppNavigation.TASK_EDIT}
          options={{
            headerTransparent: true,
          }}
          component={Screen.TaskEditScreen}
        />
        <Stack.Screen
          name={AppNavigation.PROGRESS}
          options={{
            headerTransparent: true,
          }}
          component={Screen.ProgressScreen}
        />
        <Stack.Screen
          name={AppNavigation.PROFILE}
          options={{
            headerTransparent: true,
          }}
          component={Screen.ProfileScreen}
        />
        <Stack.Screen
          name={AppNavigation.PROFILE_SETTING}
          options={{
            headerTransparent: true,
          }}
          component={Screen.ProfileSettingScreen}
        />
        <Stack.Screen
          name={AppNavigation.PICKER}
          options={{
            headerTransparent: true,
          }}
          component={Screen.PickerScreen}
        />
        <Stack.Screen
          name={AppNavigation.INPUT}
          options={{
            headerTransparent: true,
          }}
          component={Screen.InputScreen}
        />
        <Stack.Screen
          name={AppNavigation.AUTHOR}
          options={{
            headerTransparent: true,
          }}
          component={Screen.AuthorScreen}
        />
        <Stack.Screen
          name={AppNavigation.SUBS}
          options={{
            headerTitleAlign: 'center',
            headerTransparent: true,
          }}
          initialParams={{ show: false }}
          component={Screen.SubsScreen}
        />
        <Stack.Screen
          name={AppNavigation.MARKET}
          options={{
            headerTransparent: true,
          }}
          component={Screen.MarketScreen}
        />
        <Stack.Screen
          name={AppNavigation.CHANGE_PASSWORD}
          options={{
            headerTransparent: true,
          }}
          component={Screen.ChangePasswordScreen}
        />
        <Stack.Screen
          name={AppNavigation.MORNING}
          options={{
            headerTransparent: true,
          }}
          component={Screen.MorningScreen}
        />
        <Stack.Screen
          name={AppNavigation.WATER}
          options={{
            headerTransparent: true,
          }}
          component={Screen.WaterScreen}
        />
        <Stack.Screen
          name={AppNavigation.BREATHE}
          options={{
            headerTransparent: true,
          }}
          component={Screen.BreatheScreen}
        />
        <Stack.Screen
          name={AppNavigation.HAPPY}
          options={{
            headerTransparent: true,
          }}
          component={Screen.HappyScreen}
        />
        <Stack.Screen
          name={AppNavigation.MINDFULNESS}
          options={{
            headerTransparent: true,
          }}
          component={Screen.MindfulnessScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_ID}
          options={{
            headerTransparent: true,
          }}
          component={Screen.FriendIdScreen}
        />
        <Stack.Screen
          name={AppNavigation.CHAT}
          options={{
            headerTransparent: true,
          }}
          component={Screen.ChatScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND}
          options={{
            headerTransparent: true,
          }}
          component={Screen.FriendScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_PRESENT}
          options={{
            headerTransparent: true,
          }}
          component={Screen.FriendPresentScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_QR}
          options={{
            headerTransparent: true,
          }}
          component={Screen.FriendQRScreen}
        />
        <Stack.Screen
          name={AppNavigation.FRIEND_ADD}
          options={{
            headerTransparent: true,
          }}
          component={Screen.FriendAddScreen}
        />
        <Stack.Screen
          name={AppNavigation.FEED}
          options={{
            headerTransparent: true,
          }}
          component={Screen.FeedScreen}
        />
        <Stack.Screen
          name={AppNavigation.FEED_CREATE}
          options={{
            headerTransparent: true,
          }}
          component={Screen.FeedCreateScreen}
        />
        <Stack.Screen
          name={AppNavigation.FEEDS_ME}
          component={Screen.FeedsScreen}
        />
        <Stack.Screen
          name={AppNavigation.FEED_HELP}
          component={Screen.FeedHelpScreen}
        />
        <Stack.Screen
          name={AppNavigation.AUDIO_PLAY}
          options={{
            headerTransparent: true,
          }}
          component={Screen.AudioPlayScreen}
        />
        <Stack.Screen
          name={AppNavigation.AUDIO}
          options={{
            headerTransparent: true,
          }}
          component={Screen.AudioScreen}
        />
        <Stack.Screen
          name={AppNavigation.TRACKER}
          options={{
            headerTransparent: true,
          }}
          component={Screen.TrackerScreen}
        />
        <Stack.Screen
          name={AppNavigation.TRAINER_HELP}
          options={{
            headerTransparent: true,
          }}
          component={Screen.TrainerHelpScreen}
        />
        <Stack.Screen
          name={AppNavigation.NAVIGATION_HELP}
          options={{
            headerTransparent: true,
          }}
          component={Screen.NavigationHelpScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default memo(Navigation);
