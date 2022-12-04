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
    RegisterAndQustionFont: {
        flexDirection: 'row-reverse'

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
    ButtonLoginFont: {
        fontSize: 18,
        fontWeight: '800'
    },
    ButtonPhoneRegister: {
        marginTop: 20,
        backgroundColor: "#ff914d",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
    },
    IconSucsess: {

        color: "#ff914d",
    },
    alertContainer: {
        flexDirection: "column",
        width: "100%",
        // height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",

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
    alertContentTextSucsess: {

        textAlign: "right",
        fontSize: 20,
        marginBottom: 10,
        color: "#ff914d",
        fontWeight : '800',
        paddingRight: 8
        
      },

});

export default styles;