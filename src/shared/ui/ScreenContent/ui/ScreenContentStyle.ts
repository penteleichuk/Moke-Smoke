import { NativeModules, StyleSheet } from 'react-native';
import { MAIN_HORIZONTAL } from 'shared/config/dimensions';

const { StatusBarManager } = NativeModules;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerStyle: {
    paddingHorizontal: MAIN_HORIZONTAL,
  },
  statusBar: {
    height: StatusBarManager.HEIGHT + 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: MAIN_HORIZONTAL,
  },
});
