import { StyleSheet, I18nManager } from 'react-native';
const styles = StyleSheet.create({
    modelContainer: {
        flexDirection: "column",
        width: "50%",
        justifyContent: "center",
        alignSelf: 'center',
        alignItems: "center",
        backgroundColor: '#ffffff',


    },
    modelTxt: {

        fontSize: 20,
        marginBottom: 20,
        fontWeight: '800',
        paddingRight: 8,
        color: "#ff914d",
        textAlign: I18nManager.isRTL ? "left" : "right",
    }


})
export default styles;