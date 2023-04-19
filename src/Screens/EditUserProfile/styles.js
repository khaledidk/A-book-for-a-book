


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
bookImage : {
height : 200,
width : 200,
borderRadius : 20,
marginTop : 10,
},
addImageButton : {
 

  
   justifyContent : 'center',
   alignItems : 'center',
  
},

DatePicker: {
  flexDirection: 'row-reverse',

  // justifyContent : 'center',
  // alignItems : 'center',
 
  

},
DateFont: {
  display: Platform.OS === 'ios' ? 'none' : 'flex',
  color: "#ff914d",
  fontSize: 25,
  fontWeight: "600",
 
  // borderColor : "#ddb07f",
  // borderWidth : 1,
  // borderRadius : 5,
  // marginLeft: 20,

},
DateFontContainer : {
  display: Platform.OS === 'ios' ? 'none' : 'flex',
  borderColor : "#ddb07f",
  borderWidth : 1,
  borderRadius : 5,
  marginLeft: 20,
  alignItems: 'center',
  padding :10,
  width : '74%',
 
},
IconDate: {

  color: "#ff914d",
 
  paddingLeft : 50,

},
DateErrorFont : {
  alignSelf : 'flex-end',
  fontSize: 13,
  color: '#f13a59',
  paddingTop: 8,
  alignSelf: 'flex-end'
},
  
PhoneInputStyle: {

    // borderColor: "#ddb07f",
    // borderWidth: 1.5,
    // backgroundColor: "#ffffff",
    // borderRadius: 5,
    // marginTop: 20,
    textAlign: "left",
    paddingLeft : 50,


},
PhoneInputButton: {
    borderEndWidth: 1,
    borderEndColor: "#ddb07f",
    display : 'none'

},
PhoneInputBorderError : {
    borderColor: '#f14757',
    borderWidth: 1.5,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    marginTop: 20,

},
error: {
  fontSize: 13,
  color: '#f13a59',
  paddingTop: 8,
  alignSelf: 'flex-end'
},
typeErrorFont : {
  alignSelf : 'flex-end',
  fontSize: 13,
  color: '#f13a59',
  paddingTop: 8,
  alignSelf: 'flex-end'
},
updateButton: {
  backgroundColor: "#ff914d",
  height: 50,
  width: "100%",
  justifyContent: 'center',
  borderRadius: 20,
  marginTop : 20,
},
updateButtonFont : {
  fontSize: 18,
  fontWeight : '800'
},
});

export default styles;
