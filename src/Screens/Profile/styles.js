
import { StyleSheet , Dimensions, I18nManager } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
 
    // justifyContent: 'center',
    // alignItems: 'center',
  
  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 10,
},
  BootomView: {
    // flex: 0.8,
 
   marginBottom : 100,
    backgroundColor: '#ffffff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,

},
  profileImageName : {
  
  padding: 10,
  flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',

  alignItems: 'center',


  
  },
  userName :{
    color: "#ff914d",
    fontSize: 34,
   
    fontWeight: '700',
   
    

    
  },
  Details : {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems : 'center',
    marginTop : 10,
  },
  detailsFont : {
    fontSize: 20,
    fontWeight: '700',
    color : 'grey',
    marginStart : 20,
  },

  imageProfile : {
    width: 100,
    height : 100,
    borderRadius : 100,
  },
  iconUserEdit : {
   alignSelf : 'flex-end',
   marginTop : 30,
   marginEnd : 30,

  },
  iconUserEdit2 : {
    alignSelf : 'flex-start',
    marginTop : 30,
    marginStart : 30,
 
   },
  input: {
    paddingLeft: 50,
    backgroundColor: "#ffffff",

},
inputError: {

    borderColor: '#f14757',


},
  userDetails : {
    paddingStart: 30,
    paddingEnd: 30,
  },
  mapButton : {
    marginTop : 5,
   
   //  marginStart : 20,
   //  marginEnd : 20,
    height: 50,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor : "red",
    width: "100%",
   
   },

  signOutButton : {
   marginTop : 20,
   marginBottom : 10,
   height: 50,
   justifyContent: 'center',
   alignItems : 'center',
   borderRadius: 20,
   backgroundColor : "red",
   width: "100%",
  
  },
  ButtonsignOutFont: {
    fontSize: 18,
    fontWeight: '800',
    width: "100%"
},
alertContainer: {
  flexDirection: "column",
  //  width: "100%",
  // height: "100%",
  justifyContent: "center",
  alignContent: "center",
 
},
alertContentTextError: {

  textAlign: "right",
  fontSize: 20,
  marginBottom: 10,
  // color: "red",
  fontWeight : '800',
  paddingRight: 8,
  color : "#ff914d",  
  
},
alertContentContainer: {

backgroundColor: "white",
borderColor: "#ff914d",
borderWidth: 1,
borderRadius: 7,
paddingTop: 50,
paddingRight: 50,
paddingLeft: 50,
justifyContent: "center",
alignContent: "center",
alignItems: "center",
width: "100%",
},



ButtonClose :{
  backgroundColor: "#ff914d",
  height: 50,
  width: "100%",
  justifyContent: 'center',
  borderRadius: 20,
  marginTop:10,
  marginBottom : 10,
},
ButtonCloseFont : {
  fontSize: 18,
  fontWeight : '800',  
  width: "100%"
},
iconSignOut: {
   position: "absolute", 
   zIndex: 1, 
   left: 15, 
   top: 90, 
},
iconSignOut2: {
  position: "absolute", 
  zIndex: 1, 
  right: 15, 
  top: 90, 
},
flatList: {
  // marginTop: 10,
  // marginBottom:  Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100,
},
txt: {

  fontSize: 18,
  color: "grey",
  fontWeight: '800',
  textAlign: "right",

},
itemImageAndeDerails: {
  // flexGrow: 1,
  flexDirection: 'row-reverse',
  // justifyContent : 'space-between',
  // alignItems: 'center',
  marginEnd: 5,
  marginTop: 30,
},
item: {
  backgroundColor: '#ffffff',
  borderBottomWidth: 1,
  // borderRadius : 20,
  borderColor: "#ff914d",
  padding: 20,
  flexDirection: 'column',
  // justifyContent: 'center',
  // alignItems: 'center',
  marginVertical: 8,
  marginHorizontal: 16,
},
userNameAndImage: {
  flexDirection: 'row',
  alignSelf: 'flex-end',
  justifyContent: 'center',
  alignItems: 'center',

},
otherUserName: {
  fontSize: 20,
  color: "#ff914d",
  fontWeight: '800',
},
imageProfileOtherUser: {
  height: 50,
  width: 50,
  borderRadius: 100,

},
starRating: {
  flexDirection: "row-reverse",
  marginTop: 20,
},
ratingText: {
  color: "#ff914d",
  fontWeight: '600',
  fontSize: 15,
  marginStart: 10,
  marginTop: 5,
},
feedBackLebal : {
  marginTop : 10,
  fontSize: 20,
  color: "#ff914d",
  fontWeight: '800',
alignSelf : 'center'
},
feedBackEmpty : {
  color: "grey",
  fontWeight: '800',
  alignSelf : 'center'
},
details: {
  // flexShrink : 1,
  flex: 1,
  flexDirection: 'column',
  alignSelf: 'flex-end',


},
});

export default styles;
