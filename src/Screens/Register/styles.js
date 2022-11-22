import { Dimensions, StyleSheet } from 'react-native';


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
        fontWeight : '800'
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
    PhoneInputButton: {
        borderEndWidth: 1,
        borderEndColor: "#ddb07f",
    
    },
    PhoneInputerror : {
        fontSize: 13,
        color: '#f13a59',
        paddingTop: 8,
        alignSelf: 'flex-end'

    },
    PhoneInputBorderError : {
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
        
        

    },
    DateFont: {
        display: Platform.OS === 'ios' ? 'none' : 'flex',
        color: "#ff914d",
        fontSize: 20,
        fontWeight: "600",
        paddingTop: 20,
        alignSelf : 'center',
      
 


    },
    IconDate: {

        color: "#ff914d",
        paddingTop : 10,
        paddingLeft : 50,

    },
    ButtonRegister: {
        backgroundColor: "#ff914d",
        height: 50,
        width: "100%",
        justifyContent: 'center',
        borderRadius: 20,
        marginTop : 50,
    },
    ButtonRegisterFont : {
        fontSize: 18,
        fontWeight : '800'
    }

});

export default styles;