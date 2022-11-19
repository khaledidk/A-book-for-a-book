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
        top: 10,
        fontSize: 15,
        
    },
    IconEmail: {
        position: "absolute",
        zIndex: 1,
        left: 10,
        top: 5,
        color: "#ff914d",


    },
    IconLock: {
        position: "absolute",
        zIndex: 1,
        left: 10,
        top: 5,
        color: "#ff914d",


    },
    input: {
        paddingLeft: 50,
        backgroundColor: "#ffffff",

    },
    inputError : {
        
        borderColor :'#f14757',


    },

    description: {
        fontSize: 15,
        color: '#f14757',
        paddingTop: 8,
        textAlign: "right"
    },
    error: {
        fontSize: 13,
        color: '#f13a59',
        paddingTop: 8,
    },
})
export default styles;