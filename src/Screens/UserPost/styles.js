

import { Dimensions, I18nManager, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  SearchInput: {

    marginTop: getStatusBarHeight() ,
    fontSize: 20,
    fontWeight: "650",
    textAlign: "right",
    borderColor: "#ff914d",
    backgroundColor: "#ffffff",
    marginStart: 10,
    marginEnd: 10,
    paddingRight: 30,


    // borderRadius : 5,
  },
  SearchInput2: {

    marginTop: getStatusBarHeight(),
    fontSize: 20,
    fontWeight: "650",
    textAlign: "right",
    borderColor: "#ff914d",
    backgroundColor: "#ffffff",
    marginStart: 10,
    marginEnd: 10,
    paddingLeft: 30,


    // borderRadius : 5,
  },
  ChangeRequestButton: {

    marginTop: 10,
    borderColor: "#ff914d",
    borderWidth: 1,

    backgroundColor: "#ffffff",
    justifyContent: 'center',


  },
  ChangeRequestButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: "#ff914d",
  },

  searchIcon: {
    position: "absolute",
    zIndex: 1,
    right: 20,
    top: getStatusBarHeight() + 30,
  },
  CounterFont: {
    fontSize: 18,
    color: "#ff914d",
    fontWeight: '900',
    alignSelf: 'center',
marginTop : 10,


},
  searchIcon2: {
    position: "absolute",
    zIndex: 1,
    left: 20,
    top: getStatusBarHeight() + 30,
  },


  flatList: {
    marginTop: 20,

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
    textAlign: I18nManager.isRTL ? 'left' : "right",

    // flexWrap : 'wrap',

    marginBottom: 10,

    // marginStart: 20,


  },
  starRating: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
  },
  imageStar: {
    height: 30,
    width: 30,

  },
  ratingFontContiner: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    marginTop: 10,
    marginEnd: 10,
  
 
  },
  ratingFont: {
    fontSize: 18,
    fontWeight: '800',
    color: "#f8c40c",
  
  },
  emptyFont : {
    fontSize: 20,
    fontWeight: "800",
    color: "#ff914d",  
     marginTop : "25%",    
     alignSelf: 'center',
   //100%
    
  },
  txt: {

    // backgroundColor : 'red',
    fontSize: 15,
    color: "grey",
    fontWeight: '800',
    // alignSelf : 'flex-end',
    textAlign: I18nManager.isRTL ? "left" : "right",
    // flexWrap : 'wrap',

    // marginEnd: 20,
    // marginStart: 20,
  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 5,
  },
  imageIteam: {
    height: 120,
    width: 120,
    marginStart: 20,
    marginTop: 10,
    borderRadius: 20,
  },
  imageProfile: {
    height: 50,
    width: 50,
    borderRadius: 100,


  },
  imageIteam2: {
    height: 120,
    width: 120,
    marginEnd: 20,
    marginTop: 10,
    borderRadius: 20,
  },
  firstPartItem: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    marginBottom: 10,

    alignItems: 'center',


  },

  seconPartItem: {
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  itemIcons: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',


  },
  Icons: {
    marginStart: 10,

  },
  itemImageAndeDerails: {
    // flexGrow: 1,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    // justifyContent : 'space-between',
    // alignItems: 'center',
    marginEnd: 5,
    marginTop: 20,


  },
  details: {
    // flexShrink : 1,
    flex: 1,
    flexDirection: 'column',

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
  addButton2: {
    position: 'absolute',
    bottom: Platform.OS === "ios" ? getStatusBarHeight() + 120 : 120,
    backgroundColor: "#ff914d",
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    right: 20,
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

    textAlign: I18nManager.isRTL ? 'left' : "right",
    fontSize: 20,
    marginBottom: 10,
    // color: "red",
    fontWeight: '800',
    paddingRight: 8,
    color: "#ff914d",

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
    marginTop: 20,
  },

  ButtonDeleteFont: {
    fontSize: 18,
    fontWeight: '800',
    width: "100%"

  },
  ButtonClose: {
    backgroundColor: "#ff914d",
    height: 50,
    width: "100%",
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 100,
  },
  ButtonCloseFont: {
    fontSize: 18,
    fontWeight: '800',
    width: "100%"
  },
  addButton: {
    position: 'absolute',
    bottom: Platform.OS === "ios" ? getStatusBarHeight() + 120 : 120,
    backgroundColor: "#ff914d",
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    left: 20,
  },
});

export default styles;
