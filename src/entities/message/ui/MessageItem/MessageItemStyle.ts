import { StyleSheet } from 'react-native';
import {
  CONTENT_PADDING,
  CONTENT_RADIUS,
  MAIN_HORIZONTAL,
} from 'shared/config/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    borderRadius: CONTENT_RADIUS,
    padding: CONTENT_PADDING * 2,
    borderBottomLeftRadius: 0,
    marginBottom: MAIN_HORIZONTAL,
    marginLeft: CONTENT_PADDING / 2,
    position: 'relative',
  },
  me: {
    borderBottomLeftRadius: CONTENT_RADIUS,
    borderBottomRightRadius: 0,
    marginLeft: 0,
    marginRight: CONTENT_PADDING / 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: CONTENT_PADDING / 2,
  },
  data: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: CONTENT_PADDING / 2,
  },
  text: {
    marginTop: CONTENT_PADDING / 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CONTENT_PADDING / 2,
  },
});
