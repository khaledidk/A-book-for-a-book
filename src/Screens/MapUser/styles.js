
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
       // justifyContent: 'center',
       

    },
    filter : {
   
    backgroundColor: "#ffffff",
  
    },
    filterButtonContainer : {
        marginTop : getStatusBarHeight() ,
        flexDirection: 'row',
        justifyContent: 'center',
      
     
       
    },
    filterButton : {
        // height: 50,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        borderRadius: 20,


        // marginStart : 10,
       
    },
    searchButton : {
        // height: 50,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        borderRadius: 20,
        borderColor : '#ff914d',
        borderWidth : 1,
        marginTop : 10,
        marginStart : 100,
        marginEnd : 100,
       
    },
    filterButtonFont : {
        fontSize: 14,
        fontWeight : '800',
        color : "#ff914d",
    },
    ContainerDropDown : {
        marginTop:10,
        paddingStart: 40,
        paddingEnd: 40,
        // height: 200,
      },
      DropDown: {
        borderColor: "#ddb07f",
        borderWidth: 1,
        position: 'relative',
        top:0,
     
      },
      listItemContainer : {
        borderColor: "#ddb07f",
        borderBottomWidth: 1,
       
      },
      listItemContainerFont : {
        fontSize:15,
        color : "#ff914d",
        fontWeight : '600'
      },
    map: {

        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        width: '100%',
        height: '80%',
      
    },

    image: {
        // width: 80,
        // height: 90,
        borderRadius: 100,
        marginBottom: 10,
    },
    bubble: {
        flexDirection: 'column',
        alignItems: 'center',
        width: 150,


    },
    txtFont: {
        color: "#ff914d",
        fontSize: 20,
        fontWeight: '700'

    },
});
export default styles;
