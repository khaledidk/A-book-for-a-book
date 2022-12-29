

import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({
 
  container : {
    flex : 1,
    
  },
  SearchInput : {
    
    marginTop:  getStatusBarHeight() + 10,
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

  flatList : {
    marginTop : 20,
    // marginBottom:  Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100,
  },
  userNameAndImage : {
    flexDirection : 'row',
     alignSelf : 'flex-end',
    justifyContent : 'center',
    alignItems : 'center',
   
  },
  item: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    // borderRadius : 20,
    borderColor : "#ff914d" ,
    padding: 20,
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemImageAndeDerails : {
    // flexGrow: 1,
    flexDirection : 'row-reverse',
    // justifyContent : 'space-between',
    alignItems : 'center',
    marginEnd : 5,
    
  

  },
  userName : {
    fontSize: 20,
    color: "#ff914d",
    fontWeight: '800',
  },
  title: {
   

    fontSize: 18,
    color: "grey",
    fontWeight: '800',
    // flexWrap : 'wrap',
    
    // marginEnd: 20,
    // marginStart: 20,

  
  },
  ImageBackGround: {
    height: Dimensions.get('window').height /5,
},
  imageIteam : {
    height : 120,
    width : 120,
    marginStart : 20,
   borderRadius : 20,
  },
  imageProfile : {
    height : 50,
    width : 50,
   borderRadius : 100,
   marginBottom : 10,
  },
  details : {
flexShrink : 1,
    flexDirection : 'column',
    // alignSelf : 'flex-end',
    marginTop: 10,
   

  },
addButton : {
  position: 'absolute',
   bottom:  Platform.OS === "ios" ? getStatusBarHeight() + 120 : 120, 
   backgroundColor : "#ff914d" , 
   borderRadius : 100,
   justifyContent : 'center',
   alignContent : 'center',
}
});

export default styles;
