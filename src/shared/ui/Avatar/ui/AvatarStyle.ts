import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    zIndex: 10,
  },
  name: {
    position: 'absolute',
    zIndex: 5,
  },
  loading: {
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    borderRadius: 50,
    position: 'absolute',
    zIndex: 15,
  },
});
