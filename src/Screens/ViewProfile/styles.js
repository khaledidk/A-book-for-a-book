
import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,

    // justifyContent: 'center',
    // alignItems: 'center',

  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 6,
  },
  BootomView: {
   

    backgroundColor: '#ffffff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,

  },
  nameAndFeedBack: {
    marginTop: 50,
    marginStart: 20,
    alignItems: 'center',
  },
  profileImageName: {
    marginTop: 10,
    marginStart: 20,
    flexDirection: "row",

    alignItems: 'center',
  },
  userName: {
    color: "#ff914d",
    fontSize: 30,

    fontWeight: '700',



  },
  Details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  detailsFont: {
    fontSize: 20,
    fontWeight: '700',
    color: 'grey',
    marginStart: 20,
  },

  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  iconUserEdit: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginEnd: 30,


  },
  input: {
    paddingLeft: 50,
    backgroundColor: "#ffffff",

  },
  inputError: {

    borderColor: '#f14757',


  },
  userDetails: {
    paddingStart: 30,
    paddingEnd: 30,
    marginBottom: 20,
  },
  buttonContiner: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewPostsButton: {
    backgroundColor: "#ff914d",
    height: 50,
    justifyContent: 'center',
    borderRadius: 20,
    marginEnd: 10,
  },
  ButtonFeedBack: {
    backgroundColor: "#ff914d",
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonFeedBackFont: {
    fontSize: 14,
    fontWeight: '800',

  },
  // iconFeedBack : {
  //   position: "absolute",
  //   zIndex: 1,
  //    left: 10, 
  //    top: 12, 

  // },
  ButtonSendSms: {
    backgroundColor: "#ff914d",
    height: 50,

    justifyContent: 'center',
    borderRadius: 20,
    marginStart: 10,
  },

  buttonFont: {
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 40,
  },

  signOutButton: {
    marginTop: 50,
    marginBottom: 50,
    marginStart: 20,
    marginEnd: 20,
    height: 50,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: "red",

  },
  ButtonsignOutFont: {
    fontSize: 18,
    fontWeight: '800'
  },

  IconList: {
    position: "absolute",
    zIndex: 1,
    left: 10,
    top: 9,
  },
  iconSMS: {
    position: "absolute",
    zIndex: 1,
    left: 18,
    top: 12,
  },
  modelContainer: {
    flexDirection: "column",
    width: "100%",
    // height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",

  },

  alertContentTextError: {

    textAlign: "right",
    fontSize: 20,
    marginBottom: 10,
    // color: "red",
    fontWeight: '800',
    paddingRight: 8,
    color: "#ff914d",

  },
  modelContentContainer: {

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

  ButtonClose: {
    backgroundColor: "#ff914d",
    height: 50,
    width: "100%",
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 50,
  },
  ButtonCloseFont: {
    fontSize: 18,
    fontWeight: '800',
  },
  checkboxContiner: {
    flexDirection: 'row-reverse',

  },


  checkBoxText: {

    textAlign: "right",
    fontSize: 20,
    fontWeight: '800',
    paddingRight: 8,
    color: "#ff914d",
    marginEnd: 10,
  },
  checkboxAndText: {
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  input: {

    backgroundColor: "#ffffff",
    textAlign: "right",
    height: 55,
    // marginTop:20,

  },
  checkbox: {
    marginEnd: 10,
    marginTop: Platform.OS === "ios" ? 0 : 5,

  },
  ratingText: {
    color: "#ff914d",
    fontWeight: '600',
    fontSize: 15,
    marginStart: 10,
    marginTop: 5,
  },
  starRating: {
    flexDirection: "row-reverse",
    marginTop: 20,
  },
  flatList: {
    // marginTop: 10,
    // marginBottom:  Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100,
  },
  txt: {

    // backgroundColor : 'red',
    fontSize: 18,
    color: "grey",
    fontWeight: '800',
    // alignSelf : 'flex-end',
    textAlign: "right",
    // flexWrap : 'wrap',

    // marginEnd: 20,
    // marginStart: 20,
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
  feedBackLebal : {
    marginTop : 10,
    fontSize: 20,
    color: "#ff914d",
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
