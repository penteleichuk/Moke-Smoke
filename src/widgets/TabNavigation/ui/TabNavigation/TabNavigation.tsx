import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { FeedsScreen } from 'screens/FeedsScreen';
import { HomeScreen } from 'screens/HomeScreen';
import { LeaderboardScreen } from 'screens/LeaderboardScreen';
import { SettingScreen } from 'screens/SettingScreen';
import * as Icons from 'shared/assets/icons';
import {
  MAIN_HORIZONTAL,
  NAV_FONT_SIZE,
  NAV_HEIGHT,
  NAV_PADDING_BOTTOM,
  NAV_PADDING_TOP,
} from 'shared/config/dimensions';
import {
  AppNavigation,
  AppTabNavigation,
  NavigationTabLists,
} from 'shared/config/navigation';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppNavigation } from 'shared/lib/hooks/useAppNavigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { getReview } from './../../model/selectors/getReview/getReview';
import { setReview } from './../../model/slices/tabNavigationSlice';
import { TabBarIcon } from './../TabBarIcon/TabBarIcon';

const Tab = createBottomTabNavigator<NavigationTabLists>();

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    paddingTop: NAV_PADDING_TOP,
    paddingBottom: NAV_PADDING_BOTTOM,
    height: NAV_HEIGHT,
  },
  tabBarLabelStyle: {
    fontSize: NAV_FONT_SIZE,
  },
  headerLeftContainerStyle: {
    paddingLeft: MAIN_HORIZONTAL - 5,
  },
  headerRightContainerStyle: {
    paddingRight: MAIN_HORIZONTAL - 5,
  },
  freezeOnBlur: true,
} as const;

export const TabNavigation = () => {
  const { [AppSheet.REVIEW]: reviewRef } = useContext(SheetCreateContext);

  const dateReview = useAppSelector(getReview);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const { t } = useTranslation();
  const { cn } = useTheme();

  const redirectChat = (props: BottomTabBarButtonProps) => {
    return (
      <TouchableOpacity
        {...props}
        onPress={() => navigation.navigate(AppNavigation.CHAT)}
      />
    );
  };

  const onScreenListeners = (event: any) => {
    if (event.data.state.index) {
      if (new Date(dateReview) < new Date()) {
        reviewRef?.current?.present();
        dispatch(setReview());
      }
    }
  };

  return (
    <Tab.Navigator
      screenListeners={{
        state: onScreenListeners,
      }}
      screenOptions={{
        ...screenOptions,
        tabBarInactiveTintColor: cn('slate.400', 'slate.400'),
        tabBarActiveTintColor: cn('white', 'slate.600'),
        tabBarStyle: {
          ...screenOptions.tabBarStyle,
          paddingHorizontal: 10,
          backgroundColor: cn('slate.800', 'slate.50'),
          borderTopColor: cn('slate.600', 'slate.400'),
        },
      }}>
      <Tab.Screen
        name={AppTabNavigation.MAIN}
        component={HomeScreen}
        options={{
          title: t('navigation.home'),
          headerTransparent: true,
          headerTitle: '',
          tabBarIcon: ({ color }) => TabBarIcon({ color, Icon: Icons.Home }),
        }}
      />
      <Tab.Screen
        name={AppTabNavigation.CHAT}
        component={View}
        options={{
          title: t('navigation.chat'),
          tabBarIcon: ({ color }) => TabBarIcon({ color, Icon: Icons.Chat }),
          tabBarShowLabel: true,
          tabBarButton: redirectChat,
        }}
      />
      <Tab.Screen
        name={AppTabNavigation.GLOBAL}
        component={LeaderboardScreen}
        options={{
          title: t('navigation.global'),
          tabBarIcon: ({ color }) => TabBarIcon({ color, Icon: Icons.Top }),
        }}
      />
      <Tab.Screen
        name={AppTabNavigation.FEEDS}
        component={FeedsScreen}
        options={{
          title: t('navigation.friends'),
          tabBarIcon: ({ color }) => TabBarIcon({ color, Icon: Icons.Feeds }),
        }}
      />
      <Tab.Screen
        name={AppTabNavigation.SETTING}
        component={SettingScreen}
        options={{
          title: t('navigation.settings'),
          tabBarIcon: ({ color }) =>
            TabBarIcon({ color, Icon: Icons.Settings }),
        }}
      />
    </Tab.Navigator>
  );
};
