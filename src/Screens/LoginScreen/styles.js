import { Dimensions, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,


    },
    ImageBackGround: {
        height: Dimensions.get('window').height / 2.5,
    },
    Icon: {
        color: '#fffffff',
        fontSize: 100,
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
        fontSize: 34,
        alignSelf: "flex-end",
    },
    RegisterAndQustionFont : {
     flexDirection : 'row-reverse'

    },
    QustionFontFont: {
        alignSelf: "flex-end",
    },
    RegisterFont: {
        color: 'red',
        fontStyle: 'italic',

        alignSelf: "flex-end",

    },
    InputView: {
        marginTop: 50,

    },
    ForgetPassword: {
        height: 50,
        marginTop: 20,
        flexDirection: 'row-reverse',

    },
    ForgetPasswordFront: {
        color: 'red'

    },
    CheckBox: {
        flex: 1,
        mardinLeft: -20,
    },
    ButtonLogin: {
        backgroundColor: "#ff914d",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
    },
    test: {
        flex: 1,
        backgroundColor: 'red',


    },

});

export default styles;