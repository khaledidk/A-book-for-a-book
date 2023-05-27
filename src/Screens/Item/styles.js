import { Dimensions, I18nManager, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container : {
        flex : 1,
        
    
        
        
      },
      ImageBackGround: {
        height: Dimensions.get('window').height / 5,
    },
      BootomView: {
       
        backgroundColor: '#ffffff',
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
    
    },
    itemUpperPart: {
      flexDirection: I18nManager.isRTL ?   'row' : 'row-reverse',
      alignItems: 'center',
      justifyContent: 'space-between',
  
    },
    item: {
      backgroundColor: '#ffffff',
      padding: 20,
      flexDirection: 'column',
      marginVertical: 8,
      marginHorizontal: 16,
      marginTop: 20,
      marginBottom: 20,
    },
    userNameAndImage: {
      flexDirection:  I18nManager.isRTL ?   'row-reverse' : 'row' ,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    userName: {
      fontSize: 20,
      color: "#ff914d",
      fontWeight: '800',
    },
    imageProfile : {
      height : 50,
      width : 50,
     borderRadius : 100,
     marginBottom : 10,
    },
      imageIteam: {
        height: 200,
        width: 200,
       margin: 20,
       padding : 20,
        borderRadius: 20,
        borderWidth : 5,
        borderColor : '#ff914d',
      },
      txt: {

     
    fontSize: 18,
    color: "grey",
    fontWeight: '800',
    textAlign: I18nManager.isRTL ? "left" : "right",
      
      }, 
      starRating: {
        flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
        alignItems: 'center',
    
      },
      imageStar: {
        height: 30,
        width: 30,
    
      },
        title: {

          // backgroundColor : 'red',
          fontSize: 18,
          color: "#ff914d",
          fontWeight: '900',
          // alignSelf : 'flex-end',
          textAlign: I18nManager.isRTL ?   'left' : "right",
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
          imageAndDetails: { 
            justifyContent : 'center',
            alignItems : 'center',
 
          },
          details: {
             flexShrink : 1,
         
            flexDirection: 'column',
        
            marginTop: 10,
            marginBottom : 20,
        
          },
})
export default styles;