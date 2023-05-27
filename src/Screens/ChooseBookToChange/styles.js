

import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  emptyFont : {
    fontSize: 20,
    fontWeight: "800",
    color: "#ff914d",  
    marginTop : "40%",    
     alignSelf: 'center',
   //100%
    
  },
  SearchInput : {
    
    marginTop:  getStatusBarHeight() + 40,
    fontSize: 20,
    fontWeight : "650",
    textAlign: "right",
    borderColor: "#ff914d",
    backgroundColor: "#ffffff",
    marginStart : 10,
    marginEnd : 10,
    paddingRight: 30,
 
    
    // borderRadius : 5,
  },
  SearchInput2 : {
    
    marginTop:  getStatusBarHeight() + 40,
    fontSize: 20,
    fontWeight : "650",
    textAlign: "right",
    borderColor: "#ff914d",
    backgroundColor: "#ffffff",
    marginStart : 10,
    marginEnd : 10,
    paddingLeft: 30,
 
    
    // borderRadius : 5,
  },
  searchIcon : {
    position: "absolute",
    zIndex: 1,
    right: 20,
    top: getStatusBarHeight() + 70,
  },
  searchIcon2 : {
    position: "absolute",
    zIndex: 1,
    left: 20,
    top: getStatusBarHeight() + 70,
  },


  flatList: {
    marginTop: 20,
    // marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100,
  },
  ChangeRequestText :{
    fontSize: 18,
    color: "#ff914d",
    fontWeight: '900',
    alignSelf : 'center',
    marginTop : 10,
   
   
  },
  item: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    // borderRadius: 20,
    borderColor: "#ff914d",
    padding: 20,
    flexDirection: 'column',

    marginVertical: 8,
    marginHorizontal: 16,
  },


  title: {

    // backgroundColor : 'red',
    fontSize: 18,
    color: "#ff914d",
    fontWeight: '900',
    // alignSelf : 'flex-end',
    textAlign : I18nManager.isRTL ? "left" : "right",
    // flexWrap : 'wrap',

    marginBottom: 10,
    
    marginStart: 20,
    marginEnd: 20,


  },
  txt: {

    // backgroundColor : 'red',
    fontSize: 18,
    color: "grey",
    fontWeight: '800',
    // alignSelf : 'flex-end',
    textAlign : I18nManager.isRTL ? "left" : "right",
    // flexWrap : 'wrap',

    marginEnd: 5,
    marginStart: 5,
  },
  txt2: {


    fontWeight: '800',
    textAlign: "right",
   
  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 5,
  },
  imageIteam: {
    height: 120,
    width: 120,
    marginStart: 20,
    marginTop:10,
    borderRadius: 20,
  },
  imageProfile: {
    height: 50,
    width: 50,
    borderRadius: 100,


  },
  firstPartItem: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
    
    alignItems: 'center',


  },
  seconPartItem: {
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  itemIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',


  },
  Icons: {
    marginStart: 10,

  },
  itemImageAndeDerails: {
    // flexGrow: 1,
    flexDirection: I18nManager.isRTL ?  "row" : 'row-reverse',
    // justifyContent : 'space-between',
    // alignItems: 'center',
    marginEnd: 5,
    marginTop : 20,


  },
  details: {
    // flexShrink : 1,
    flex: 1,
    flexDirection: 'column',
     textAlign : I18nManager.isRTL ? "left" : "right",
    marginTop: 10,

  },
  addButton: {
    position: 'absolute',
    bottom: Platform.OS === "ios" ? getStatusBarHeight() + 120 : 120,
    backgroundColor: "#ff914d",
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
  },
  alertContainer: {
    flexDirection: "column",
     width: "100%",
    // height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
   
  },
  IconError: {
  
    color: "red",


},
alertContentTextError: {

  textAlign : I18nManager.isRTL ? "left" : "right",
  fontSize: 20,
  marginBottom: 10,
  // color: "red",
  fontWeight : '800',
  paddingRight: 8,
  color : "#ff914d",  
  
},
alertContentTextError1: {

  textAlign : I18nManager.isRTL ? "left" : "right",
  fontSize: 20,
  marginBottom: 10,
  color: "red",
  fontWeight : '800',

  
},
alertContentContainer: {

backgroundColor: "white",
borderColor: "#ff914d",
borderWidth: 1,
borderRadius: 7,
padding: 50,
justifyContent: "center",
alignContent: "center",
alignItems: "center",
width: "100%",
},

ButtonDelete: {
  backgroundColor: "red",
  height: 50,
  width: "100%",
  justifyContent: 'center',
  borderRadius: 20,
  marginTop:20,
},

ButtonDeleteFont : {
  fontSize: 18,
  fontWeight : '800',
 
},
ButtonClose :{
  backgroundColor: "#ff914d",
  height: 50,
  width: "100%",
  justifyContent: 'center',
  borderRadius: 20,
  marginTop:100,
},
ButtonCloseFont : {
  fontSize: 18,
  fontWeight : '800',  
},
modelAnswer : {
    marginTop : 20,
    flexDirection : I18nManager.isRTL ? 'row' : 'row-reverse',
    justifyContent : 'center'

   },
   ModealButtons: {
    // height: 50,
    backgroundColor: "#ffffff",
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#ff914d',
    borderWidth: 1,
    marginEnd: 20,
    marginStart : 20,

},
filterButtonFont: {
    fontSize: 14,
    fontWeight: '800',
    color: "#ff914d",
},

});

export default styles;
