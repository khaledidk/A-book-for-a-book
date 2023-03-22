import { Dimensions, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'

// const {height, width} = useWindowDimensions();
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    flatList: {
        marginTop: 50,

    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
    },

    row: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomColor: '#cacaca',
        borderBottomWidth: 1,
    },
    addUser: {
        flexDirection: 'row',
        padding: 10,
    },
    inputSend: {
        backgroundColor: '#ffffff',
        textAlign: "right",
        margin: 10,

    },
    sendingButtonContainer: {
       
        justifyContent: 'center',
        alignItems: 'center',

    },
    rotate90: {
        transform: [{ rotate: '180deg' }]
    },
    label : {
        //marginTop : getStatusBarHeight() + 10,
        flexDirection: 'row',
        backgroundColor: "#ff914d",
        justifyContent : "flex-end",
        alignItems : "center",
        
        height : 100,
    },
    nameAndImage : {
        marginTop :  getStatusBarHeight(),
        flexDirection: 'row',
        justifyContent : "flex-end",
        alignItems : "center",
    },

    name : {
  marginEnd : 10,
  fontWeight: "800",
  fontSize: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius : 50,
    },
});
export default styles;