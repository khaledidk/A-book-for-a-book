import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({
    container: {
        flexDirection : 'row-reverse',
        backgroundColor : "#ffffff",
        right : 20,
        left : 20,
        paddingLeft: 40,
        paddingRight: 40,
        padding : 20,
        position: 'absolute',
        borderRadius : 15,
        bottom:  20,
        height : 90,
        justifyContent : 'space-between'
      

    },
    ButtonWithText : {
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
    },
   
    Clicked: {
        color:"#dcaf7f",
        // paddingLeft : 150,
    },
    UnClicked : {
       
        color: "#ff914d",
        // paddingLeft : 150,
    },
    FontClicked : {
        color:"#dcaf7f",
        // paddingLeft : 150,
    },
    FontUnClicked : {
      
        color: "#ff914d", 
        // paddingLeft : 150,
    } ,
    AddButtonUnClicked : {
        borderRadius : 100,
        width : 90,
        height : 90,
        borderWidth : 8,
        bottom : 60,
        borderColor : "#ffffff",
        backgroundColor :"#ff914d",
        justifyContent : 'center',
        alignItems : 'center',
       
    },
    AddButtonClicked : {
        borderRadius : 100,
        width : 90,
        height : 90,
        borderWidth : 8,
        bottom : 60,
        borderColor : "#ffffff",
        backgroundColor :"#dcaf7f",
        justifyContent : 'center',
        alignItems : 'center',
      
    },
    addIcon : {
        color : "#ffffff"
    }


})
export default styles;