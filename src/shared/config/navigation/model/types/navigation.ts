import { NavigationTabLists } from './tab-navigation';

export enum AppNavigation {
  WELCOME = 'Welcome',
  WELCOME_INFO = 'WelcomeInfo',
  MAIN = 'Main',
  AUTH = 'Auth',
  REGISTRATION = 'Registration',
  VERIFY = 'Verify',
  FORGOT = 'Forgot',
  COURSE = 'Course',
  READ = 'Read',
  CARDS = 'Cards',
  TASK = 'Task',
  PROGRESS = 'Progress',
  PROFILE = 'Profile',
  PROFILE_SETTING = 'ProfileSetting',
  PICKER = 'Picker',
  INPUT = 'Input',
  AUTHOR = 'Author',
  SUBS = 'Subs',
  MARKET = 'Market',
  CHANGE_PASSWORD = 'ChangePassword',
  WATER = 'Water',
  BREATHE = 'Breathe',
  MORNING = 'Morning',
  HAPPY = 'Happy',
  MINDFULNESS = 'Mindfulness',
  FRIEND = 'Friend',
  FRIEND_ID = 'FriendId',
  TASK_EDIT = 'TaskEdit',
  FRIEND_PRESENT = 'FriendPresent',
  FRIEND_QR = 'FriendQR',
  FRIEND_ADD = 'FriendAdd',
  CHAT = 'Chat',
  FEED = 'Feed',
  FEEDS_ME = 'FeedMe',
  FEED_HELP = 'FeedHelp',
  FEED_CREATE = 'FeedCreate',
  AUDIO_PLAY = 'AudioPlay',
  AUDIO = 'Audio',
  TRACKER = 'Tracker',
  TRAINER_HELP = 'TrainerHelp',
  NAVIGATION_HELP = 'NavigationHelp',
}

interface NavigationSplashType {
  show?: boolean;
}

export type NavigationStackLists<F = any> = {
  [AppNavigation.WELCOME]: undefined;
  [AppNavigation.WELCOME_INFO]: undefined;
  [AppNavigation.MAIN]: undefined;
  [AppNavigation.AUTH]: NavigationSplashType | undefined;
  [AppNavigation.REGISTRATION]: NavigationSplashType | undefined;
  [AppNavigation.VERIFY]: undefined;
  [AppNavigation.FORGOT]: NavigationSplashType | undefined;
  [AppNavigation.COURSE]: { courseId: number };
  [AppNavigation.READ]: undefined;
  [AppNavigation.CARDS]: undefined;
  [AppNavigation.TASK]: undefined;
  [AppNavigation.PROGRESS]: undefined;
  [AppNavigation.PROFILE]: undefined;
  [AppNavigation.PROFILE_SETTING]: undefined;
  [AppNavigation.PICKER]: F;
  [AppNavigation.INPUT]: F;
  [AppNavigation.AUTHOR]: undefined;
  [AppNavigation.SUBS]: NavigationSplashType | undefined;
  [AppNavigation.MARKET]: undefined;
  [AppNavigation.CHANGE_PASSWORD]: undefined;
  [AppNavigation.WATER]: undefined;
  [AppNavigation.BREATHE]: undefined;
  [AppNavigation.MORNING]: undefined;
  [AppNavigation.HAPPY]: undefined;
  [AppNavigation.MINDFULNESS]: undefined;
  [AppNavigation.FRIEND]: undefined;
  [AppNavigation.FRIEND_ID]: F;
  [AppNavigation.CHAT]: undefined;
  [AppNavigation.TASK_EDIT]: { taskId: number };
  [AppNavigation.FRIEND_PRESENT]: undefined;
  [AppNavigation.FRIEND_QR]: undefined;
  [AppNavigation.FRIEND_ADD]: undefined;
  [AppNavigation.FEEDS_ME]: { userId?: string };
  [AppNavigation.FEED]: { item: F; userId?: string };
  [AppNavigation.FEED_HELP]: undefined;
  [AppNavigation.FEED_CREATE]: { event: F };
  [AppNavigation.AUDIO_PLAY]: {
    covers: F;
    isPlayerReady: boolean;
    locale: boolean;
    index: number;
  };
  [AppNavigation.AUDIO]: undefined;
  [AppNavigation.TRACKER]: undefined;
  [AppNavigation.TRAINER_HELP]: undefined;
  [AppNavigation.NAVIGATION_HELP]: undefined;
};

export type RootStackParamList = NavigationStackLists & NavigationTabLists;
