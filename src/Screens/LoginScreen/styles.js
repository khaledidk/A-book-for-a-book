import { Dimensions, I18nManager , StyleSheet } from 'react-native';


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
        marginTop: 10,
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
        fontSize: 30,
        // textAlign : 'right',
        writingDirection: "rtl" 
     
    },
    RegisterAndQustionFont: {
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',
        alignItems : 'center',
      
        // direction : 'rtl',
       
    },
    QustionFontFont: {
        // alignSelf: "flex-end",
        // textAlign : 'right',
        // fontSize: 1,  fontSize : 10,
        writingDirection: "rtl" 
    },
    RegisterFont: {
        color: 'red',
        fontStyle: 'italic',
        fontSize : 17,
      

    },
    InputView: {
        marginTop: 30,

    },
    ForgetPassword: {
        height: 50,
        marginTop: 20,
        flexDirection: I18nManager.isRTL ? 'row' : 'row-reverse',

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
    ButtonLoginWithPhone: {
        backgroundColor: "#ff914d",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 10,
    },
    phoneIcon : {
        position: "absolute", 
        zIndex: 1, 
        left: 15, 
        top: 20, 
    },
    phoneIcon2 : {
        position: "absolute", 
        zIndex: 1, 
        right: 15, 
        top: 20, 
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

        textAlign: I18nManager.isRTL ? "left" : "right",
        fontSize: 20,
        marginBottom: 10,
        color: "#ff914d",
        fontWeight : '800',
        paddingRight: 8
        
      },

});

export default styles;