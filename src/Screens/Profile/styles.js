
import { StyleSheet , Dimensions } from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
 
    // justifyContent: 'center',
    // alignItems: 'center',
  
  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 5,
},
  BootomView: {
    // flex: 0.8,
    bottom: 50,

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
  },
 
  signOutButton : {
   marginTop : 20,
   marginBottom : 50,
  //  marginStart : 20,
  //  marginEnd : 20,
   height: 50,
   justifyContent: 'center',
   borderRadius: 20,
   backgroundColor : "red",
   width: "100%",
  
  },
  ButtonsignOutFont: {
    fontSize: 18,
    fontWeight: '800'
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
  marginTop:50,
},
ButtonCloseFont : {
  fontSize: 18,
  fontWeight : '800',  
},
  
});

export default styles;
