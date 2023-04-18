
import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'
const styles = StyleSheet.create({
    container: {
       
         flex: 1,
        //alignItems: 'center',
        // justifyContent: 'center',


    },
    filter: {

        backgroundColor: "#ffffff",
    
    },
    filterButtonContainer: {
      
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: getStatusBarHeight() + 10,


    },
    filterButton: {
        // height: 50,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        borderRadius: 20,


        // marginStart : 10,

    },
    ModealButtons: {
        // height: 50,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#ff914d',
        borderWidth: 1,
        marginEnd: 20,
        marginStart : 20,

    },
    searchButton: {
        // height: 50,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        borderRadius: 20,
        borderColor: '#ff914d',
        borderWidth: 1,
        marginTop: 10,
        marginStart: 100,
        marginEnd: 100,

    },
    filterButtonFont: {
        fontSize: 14,
        fontWeight: '800',
        color: "#ff914d",
    },
    ContainerDropDown: {
        marginTop: 10,
        paddingStart: 40,
        paddingEnd: 40,
        // height: 200,
    },
    DropDown: {
        borderColor: "#ddb07f",
        borderWidth: 1,
        position: 'relative',
        top: 0,

    },
    listItemContainer: {
        borderColor: "#ddb07f",
        borderBottomWidth: 1,

    },
    listItemContainerFont: {
        fontSize: 15,
        color: "#ff914d",
        fontWeight: '600'
    },
    map: {

        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        width: '100%',
        height: '100%',
       

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
    newLocation : {
        position: 'absolute',
        bottom: Platform.OS === "ios" ? getStatusBarHeight() + 40 : 40,
        backgroundColor: "#ffffff",
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection : 'row',
        left : 10, 
        padding : 5
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
    modelAnswer : {
     marginTop : 20,
     flexDirection : 'row',
     justifyContent : 'center'

    },
 
});
export default styles;
