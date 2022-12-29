

import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  SearchInput : {
    
    marginTop:  getStatusBarHeight() ,
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
  searchIcon : {
    position: "absolute",
    zIndex: 1,
    right: 20,
    top: getStatusBarHeight() + 30,
  },

  flatList: {
    marginTop: 20,
    // marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100,
  },
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#ff914d",
    padding: 20,
    flexDirection: 'column',
    // justifyContent : 'center',
    // alignItems : 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    fontSize: 20,
    color: "#ff914d",
    fontWeight: '800',
    alignSelf: 'flex-end',

  },
  ImageBackGround: {
    height: Dimensions.get('window').height / 5,
  },
  imageIteam: {
    height: 300,
    width: 300,
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
  details: {

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
});

export default styles;
