import { StyleSheet } from 'react-native';
import {
  CONTAINER_PADDING,
  MAIN_HORIZONTAL,
  MAIN_VERTICAL,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: MAIN_HORIZONTAL,
    paddingBottom: MAIN_VERTICAL,
  },
  content: {
    marginTop: CONTAINER_PADDING,
  },
});
