
import { Dimensions, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,



    },
    ImageBackGround: {
        height: Dimensions.get('window').height / 5,
       

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
  

    PhoneInput: {

        borderColor: "#ddb07f",
        borderWidth: 1.5,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginTop: 20,
    
    
    },
    InputView: {
        marginTop: 50,
        

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
      ContainerDropDown : {
        marginTop:25,
  },
    DropDown: {
        borderColor: "#ddb07f",
        borderWidth: 1,
       

    },
    listItemContainer : {
        borderColor: "#ddb07f",
        borderBottomWidth: 1,
    },
    listItemContainerFont : {
        fontSize:15,
        color : "#ff914d",
        fontWeight : '600'
    },
    
    PhoneInputStyle: {

        borderColor: "#ddb07f",
        borderWidth: 1.5,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginTop: 20,
    
    
    },
    PhoneInputButton: {
        borderEndWidth: 1,
        borderEndColor: "#ddb07f",
        display : 'none'
    
    },
    PhoneInputBorderError : {
        borderColor: '#f14757',
        borderWidth: 1.5,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        marginTop: 20,
    
    },
    error: {
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
        marginTop:100,
    },
    textAndSwitch : { 
        flexDirection: 'row', 
        alignItems: 'center',
         justifyContent: 'center' 
     },
    ButtonRegisterFont : {
        fontSize: 18,
        fontWeight : '800'
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
IconError: {
  
    color: "red",


},

  alertTitleTextStyle: {
    fontSize: 25,
    fontWeight: "700",
  
    textAlign: "center",
    marginBottom: 15,
    color: "#ff3333",

  },

  alertContentTextSucsess: {

    textAlign: "right",
    fontSize: 20,
    marginBottom: 10,
    color: "#ff914d",
    fontWeight : '800',
    paddingRight: 8
    
  },
  alertContentTextError: {

    textAlign: "right",
    fontSize: 20,
    marginBottom: 10,
    color: "red",
    fontWeight : '800',
    paddingRight: 8
    
  },

  alertCloseButtonStyle: {

    width: "70%",
    height: 50,
    backgroundColor: "white",
    borderColor:"#ff914d",
    borderWidth: 2,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },

  alertButtonTextStyle: {

    fontSize: 18,
    fontWeight : '800',
    color: "#ff914d",
  },


 

});

export default styles;