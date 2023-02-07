
import { StyleSheet , Dimensions } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
 
    // justifyContent: 'center',
    // alignItems: 'center',
  
  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 4,
},
  BootomView: {
    // flex: 0.8,
    bottom: 40,

    backgroundColor: '#ffffff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,

},
  profileImageName : {
  marginTop : 20,
  padding: 30,
  flexDirection :"row",
  
  alignItems: 'center',
  },
  userName :{
    color: "#ff914d",
    fontSize: 34,
    marginStart : 20,
    fontWeight: '700'
    
  },
  Details : {
    flexDirection : 'row',
    alignItems : 'center',
    marginTop : 20,
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
    marginBottom : 50,
  },
  viewPostsButton : {
    backgroundColor: "#ff914d",
    height: 50,
    width: "100%",
    justifyContent: 'center',
    borderRadius: 20,
    marginTop:60,
  },
  ButtonSendSms: {
    backgroundColor: "#ff914d",
    height: 50,
    width: "100%",
    justifyContent: 'center',
    borderRadius: 20,
    marginTop:20,
},

buttonFont : {
    fontSize: 18,
    fontWeight : '800'
},
 
  signOutButton : {
   marginTop : 50,
   marginBottom : 50,
   marginStart : 20,
   marginEnd : 20,
   height: 50,
   justifyContent: 'center',
   borderRadius: 20,
   backgroundColor : "red",
  
  },
  ButtonsignOutFont: {
    fontSize: 18,
    fontWeight: '800'
},
IconList: {
  position: "absolute",
   zIndex: 1,
    left: 10, 
    top: 60, 
},
iconSMS : {
   position: "absolute",
    zIndex: 1,
     left: 15, 
     top: 20, 
}
  
});

export default styles;
