

import { Dimensions, StyleSheet, I18nManager } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({

  container: {
    flex: 1,


  },
  emptyFont: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ff914d",
    marginTop: "40%",
    alignSelf: 'center',
    //100%

  },
  SearchInput: {

    marginTop: getStatusBarHeight() + 30,
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

    marginTop: getStatusBarHeight() + 30,
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
  searchIcon: {
    position: "absolute",
    zIndex: 1,
    right: 20,
    top: getStatusBarHeight() + 50,
  },
  searchIcon2: {
    position: "absolute",
    zIndex: 1,
    left: 20,
    top: getStatusBarHeight() + 50,
  },

  flatList: {
    marginTop: 20,

    // marginBottom:  Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100,
  },
  itemUpperPart: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginEnd: 20,


  },
  userNameContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  userNameContainer2: {
    flex: 1,
    alignItems: 'flex-start'
  },
  itemUpperPart2: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginEnd: 20,



  },
  userNameAndImage: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',

  },
  userNameAndImage2: {
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',

  },
  item: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,

    borderColor: "#ff914d",
    padding: 20,
    flexDirection: 'column',

    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemImageAndeDerails: {
    // flexGrow: 1,
    flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
    // justifyContent : 'space-between',
    // alignItems: 'center',
    marginEnd: 5,
    marginTop: 30,



  },
  userName: {
    fontSize: 20,
    color: "#ff914d",
    fontWeight: '800',
  },
  title: {

    // backgroundColor : 'red',
    fontSize: 18,
    color: "#ff914d",
    fontWeight: '900',
    // alignSelf : 'flex-end',
    textAlign: I18nManager.isRTL ? "left" : "right",
    // flexWrap : 'wrap',

    marginBottom: 10,
    // marginStart: 20,


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
  txt: {


    fontSize: 15,
    color: "grey",
    fontWeight: '800',
    textAlign: I18nManager.isRTL ? "left" : "right",

  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 5,
  },
  imageProfile: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginBottom: 10,
  },
  imageIteam: {
    height: 100,
    width: 100,
    marginStart: 20,
    marginTop: 10,
    borderRadius: 20,
  },
  imageIteam2: {
    height: 100,
    width: 100,
    marginEnd: 20,
    marginTop: 10,
    borderRadius: 20,
  },
  starRating: {
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
    alignItems: 'center',

  },
  imageStar: {
    height: 30,
    width: 30,

  },
  details: {

    flex: 1,
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginTop: 10,

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
  addButton2: {
    position: 'absolute',
    bottom: Platform.OS === "ios" ? getStatusBarHeight() + 120 : 120,
    backgroundColor: "#ff914d",
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    right: 20,
  }
});

export default styles;
