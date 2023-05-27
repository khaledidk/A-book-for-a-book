import { StyleSheet  , I18nManager} from 'react-native';
const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
        marginTop: 10,

    },

    FontLabel: {
        position: "absolute",
        zIndex: 1,
        right: 10,
        top: 7,
        fontSize: 13,

    },
    FontLabel2: {
        position: "absolute",
        zIndex: 1,
        left: 10,
        top: 7,
        fontSize: 13,

    },
    IconEmail: {
        position: "absolute",
        zIndex: 1,
        left: 10,
        top: 8,
        color: "#ff914d",


    },
    IconEmail2: {
        position: "absolute",
        zIndex: 1,
        right: 10,
        top: 8,
        color: "#ff914d",


    },
    IconLock: {
        position: "absolute",
        zIndex: 1,
        left: 10,
        top: 8,
        color: "#ff914d",


    },
    IconLock2: {
        position: "absolute",
        zIndex: 1,
        right: 10,
        top: 8,
        color: "#ff914d",


    },
    IconUser : {
        position: "absolute",
        zIndex: 1,
        left: 15,
        top: 12,
        color: "#ff914d",
    },
    IconUser2 : {
        position: "absolute",
        zIndex: 1,
        right: 15,
        top: 12,
        color: "#ff914d",
    },
    phone : {
        position: "absolute",
        zIndex: 1,
        left: 15,
        top: 10,
        color: "#ff914d",
    },
    phone2 : {
        position: "absolute",
        zIndex: 1,
        right: 15,
        top: 10,
        color: "#ff914d",
    },
    input: {
        paddingLeft: 50,
        backgroundColor: "#ffffff",
        textAlign: "right",
        height : 55,
        // marginTop:20,

    },
    input2: {
        paddingRight: 50,

        backgroundColor: "#ffffff",
        textAlign: "right",
        height : 55,
        // marginTop:20,

    },
    input1: {
        // backgroundColor : 'red',
        // marginBottom:20
        paddingTop : 20,
        margin : -10,

    },
    inputError: {

        borderColor: '#f14757',


    },

    description: {
        fontSize: 15,
        color: '#ff914d',
        paddingTop: 8,
        textAlign: I18nManager.isRTL ? "left" : "right" ,
    },
    error: {
        fontSize: 13,
        color: '#f13a59',
        paddingTop: 8,
           writingDirection: "rtl" 
    },
})
export default styles;