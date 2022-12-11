


import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
 
  container : {
    flexGrow : 1,
    // justifyContent : 'center',
    // alignItems : 'center',
    // backgroundColor : '#f1f1f1',
  },
  ImageBackGround: {
    height: Dimensions.get('window').height /4,
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
ContainerDropDown : {
  marginTop:25,
  // height: 200,
},
DropDown: {
  borderColor: "#ddb07f",
  borderWidth: 1,


 

},
listItemContainer : {
  borderColor: "#ddb07f",
  borderBottomWidth: 1,
 
},
listItemContainerFont : {
  fontSize:15,
  color : "#ff914d",
  fontWeight : '600'
},
typeErrorFont : {
  alignSelf : 'flex-end',
  fontSize: 13,
  color: '#f13a59',
  paddingTop: 8,
  alignSelf: 'flex-end'
},
addButton: {
  backgroundColor: "#ff914d",
  height: 50,
  width: "100%",
  justifyContent: 'center',
  borderRadius: 20,
  marginTop : 20,
},
addButtonFont : {
  fontSize: 18,
  fontWeight : '800'
},
});

export default styles;
