export enum AppTabNavigation {
  MAIN = 'Home',
  FEEDS = 'Feeds',
  GLOBAL = 'Global',
  CHAT = 'Chat',
  SETTING = 'Setting',
}

export type NavigationTabLists = {
  [AppTabNavigation.MAIN]: undefined;
  [AppTabNavigation.FEEDS]: undefined;
  [AppTabNavigation.GLOBAL]: undefined;
  [AppTabNavigation.CHAT]: undefined;
  [AppTabNavigation.SETTING]: undefined;
};
