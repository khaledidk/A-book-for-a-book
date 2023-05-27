import { Dimensions, I18nManager, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,


    },
    ImageBackGround: {
        height: Dimensions.get('window').height / 2.5,
    },

    BootomView: {
        flex: 1.5,
        bottom: 50,

        backgroundColor: '#ffffff',
        borderTopStartRadius: 60,
        borderTopEndRadius: 60,
        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,

    },
    WelcomeView: {
        padding: 40,




    },
    WelcomeFont: {
        color: "#ff914d",
        fontSize: 20,
        textAlign: I18nManager.isRTL ? "left" : "right",
    },


    InputView: {
        marginTop: 50,

    },
    relpaceFont: {
        color: 'red',
        fontStyle: 'italic',
        fontSize : 17,
        textAlign :  I18nManager.isRTL ? "left" : "right",
        marginTop : 10,

    },

    ButtonSend: {
        backgroundColor: "#ff914d",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
    },


});

export default styles;