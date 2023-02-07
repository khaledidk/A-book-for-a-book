
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
    zIndex: 1,
    elevation: 1,
    
  },
  // BackIcon : {
  //   color : "#ff914d",
  // }
});

export default styles;
