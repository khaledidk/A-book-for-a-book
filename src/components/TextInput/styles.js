import { StyleSheet } from 'react-native';
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
        fontSize: 15,

    },
    IconEmail: {
        position: "absolute",
        zIndex: 1,
        left: 10,
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
    IconUser : {
        position: "absolute",
        zIndex: 1,
        left: 15,
        top: 12,
        color: "#ff914d",
    },
    input: {
        paddingLeft: 50,
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
        textAlign: "right"
    },
    error: {
        fontSize: 13,
        color: '#f13a59',
        paddingTop: 8,
        alignSelf: 'flex-end'
    },
})
export default styles;