


import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
 
  container : {
    flexGrow : 1,
    // justifyContent : 'center',
    // alignItems : 'center',
    // backgroundColor : '#f1f1f1',
  },
  ImageBackGround: {
    height: Dimensions.get('window').height /5,
},

BootomView: {
    flex: 1.5,
    bottom: 50,

    backgroundColor: '#ffffff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,

},
WelcomeView: {
    padding: 40,




},
WelcomeFont: {
    color: "#ff914d",
    fontSize: 34,
    alignSelf: "flex-end",
},
InputView: {
  marginTop: 50,
  

},
});

export default styles;
