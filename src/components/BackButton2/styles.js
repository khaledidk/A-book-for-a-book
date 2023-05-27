
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 20,
    zIndex: 1,
    elevation: 1,

  },
  container2: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    right: 20,
    zIndex: 1,
    elevation: 1,

  },
 
});

export default styles;
