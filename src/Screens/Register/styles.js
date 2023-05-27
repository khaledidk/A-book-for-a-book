import { Dimensions, I18nManager, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,



    },
    ImageBackGround: {
        height: Dimensions.get('window').height / 5,

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
        fontSize: 18,
        alignSelf: "flex-end",
        fontWeight: '800'
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
        marginTop: 10,

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
        marginLeft: -20,
    },

    PhoneInput: {

        borderColor: "#ddb07f",
        borderWidth: 1.5,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginTop: 20,


    },
    PhoneInputStyle: {
        backgroundColor : '#ffffff',
        textAlign: "left",
        paddingLeft : 50,


    },
    PhoneInputButton: {
        borderEndWidth: 1,
        borderEndColor: "#ddb07f",
        display: 'none'

    },
    PhoneInputBorderError: {
        borderColor: '#f14757',
        borderWidth: 1.5,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginTop: 20,

    },
    DropDown: {
        borderColor: "#ddb07f",
        borderWidth: 1,
        borderRadius: 10,



    },

    DatePicker: {
        flexDirection: 'row-reverse',

        // justifyContent : 'center',
        // alignItems : 'center',



    },
    DateFont: {
        display: Platform.OS === 'ios' ? 'none' : 'flex',
        color: "#ff914d",
        fontSize: 25,
        fontWeight: "600",

        // borderColor : "#ddb07f",
        // borderWidth : 1,
        // borderRadius : 5,
        // marginLeft: 20,

    },
    DateFontContainer: {
        display: Platform.OS === 'ios' ? 'none' : 'flex',
        borderColor: "#ddb07f",
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 20,
        alignItems: 'center',
        padding: 10,
        width: '74%',

    },
    IconDate: {

        color: "#ff914d",

        paddingLeft: 50,

    },
    DateErrorFont: {
        alignSelf: 'flex-end',
        fontSize: 13,
        color: '#f13a59',
        paddingTop: 8,
        alignSelf: 'flex-end'
    },
    ButtonRegister: {
        backgroundColor: "#ff914d",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 50,
    },
    ButtonRegisterFont: {
        fontSize: 18,
        fontWeight: '800'
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
    IconSucsess: {

        color: "#ff914d",


    },
    error: {
        fontSize: 13,
        color: '#f13a59',
        paddingTop: 8,
        alignSelf: 'flex-end'
    },
    alertTitleTextStyle: {
        fontSize: 25,
        fontWeight: "700",

        textAlign: "center",
        marginBottom: 15,
        color: "#ff3333",

    },

    alertContentTextSucsess: {

        textAlign: I18nManager.isRTL ? "left" : "right",
        fontSize: 20,
        marginBottom: 10,
        color: "#ff914d",
        fontWeight: '800',
        paddingRight: 8

    },
    alertContentTextError: {

        textAlign: "right",
        fontSize: 20,
        marginBottom: 10,
        color: "red",
        fontWeight: '800',
        paddingRight: 8

    },
    IconError: {

        color: "red",


    },

});

export default styles;