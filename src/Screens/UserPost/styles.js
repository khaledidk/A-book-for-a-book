

import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({
 
  container : {
    flex : 1,
    
  },

  flatList : {
    marginTop : 100,
    marginBottom:  Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100,
  },
  item: {
    backgroundColor: '#ffffff',
    borderWidth:3,
    borderRadius : 20,
    borderColor : "#ff914d" ,
    padding: 20,
    flexDirection : 'column',
    // justifyContent : 'center',
    // alignItems : 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
 
  title: {
    fontSize: 20,
    color: "#ff914d",
    fontWeight: '800',
    alignSelf : 'flex-end',
  
  },
  ImageBackGround: {
    height: Dimensions.get('window').height /5,
},
  imageIteam : {
    height : 300,
    width : 300,
   borderRadius : 20,
  },
  imageProfile : {
    height : 50,
    width : 50,
    borderRadius : 100,
  
   
  },
  firstPartItem : {
   flexDirection : 'row-reverse',
   marginBottom : 10,
   justifyContent : 'space-between',
   alignItems : 'center',
  

  },
  seconPartItem : {
    justifyContent : 'space-between',
    alignItems : 'center',
   
  },
  itemIcons : {
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
   

  },
  Icons : {
    marginStart : 10,

  },
  details : {

    flexDirection : 'column',
    alignSelf : 'flex-end',
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
