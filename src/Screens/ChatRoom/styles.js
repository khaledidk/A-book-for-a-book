import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
    container: {
        flex: 1,
     
      },
      label : {
        backgroundColor : "#ff914d",
        height: 100,
      },
      SearchInput: {

        marginTop: 10,
        fontSize: 20,
        fontWeight: "650",
        textAlign: "right",
        borderColor: "#ff914d",
        backgroundColor: "#ffffff",
        marginStart: 10,
        marginEnd: 10,
        paddingRight: 30,
    
      },
      searchIcon: {
        position: "absolute",
        zIndex: 1,
        right: 20,
        top: 40,
      },
    flatList: {
        marginTop: 10,
      
      },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius : 50,
    },
    userName : {
       marginEnd : 10,
    },

    row: {
        flexDirection: 'row-reverse',
        padding: 10,
        alignItems: 'center',
        borderBottomColor: '#cacaca',
        borderBottomWidth: 1,
       
    },
    addUser: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        backgroundColor: '#cacaca',
        flex: 1,
        marginRight: 10,
        padding: 10,
    },
   
});
export default styles;