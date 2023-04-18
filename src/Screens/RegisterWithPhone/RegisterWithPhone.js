import * as React from 'react';
import { useState, useRef, useEffect } from "react";

import { ScrollView, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Keyboard, Platform } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles';
// import { Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

// import { Button, Modal, Text } from "react-native-paper";
// import PhoneInput from 'react-native-phone-number-input';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import TextInput from "../../components/TextInput/TextInput";
// import { auth } from '../../config/firebase';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import { firebaseConfig } from '../../config/firebase'
// import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
// import { nameValidator } from '../../helpers/nameValidator';
// import { createUserbyPhone } from '../../config/AuthDB';
// import { addNewUserByPhone } from '../../config/FireStoreDB';
export default function RegisterWithPhone(props) {
    // // const { navigation } = navigation;

    // const [NumberValue, setNumberValue] = useState("");
    // const [FormattedNumber, setFormattedNumber] = useState("");
    // const [ModelIcon, setModelIcon] = useState(false);
    // const [isAleretVisible, setIsAlertVisible] = useState(false);
    // const [UserName, setUserName] = useState({ value: "", error: "" });
    // const [alertContent, setAlertContent] = useState("");
    // const [PhoneInputerror, setPhoneInputerror] = useState("");
    // const phoneInput = useRef(null);
    // const [date, setDate] = useState(new Date());
    // const [FormattedDate, setFormattedDate] = useState('');
    // const [IsDateEmpty, setIsDateEmpty] = useState(false);
    // const [ShowDatePicker, setShowDatePicker] = useState(false);
    // const [code, setCode] = useState('');
    // const [verificationId, setVerificationId] = useState(null);
    // const recaptchaVerifier = useRef(null);
    // const [ValidNumber, setValidNumber] = useState(false);

    // const sendVerification = () => {
    //     const phoneProvider = new PhoneAuthProvider(auth);

    //     phoneProvider.verifyPhoneNumber(FormattedNumber, recaptchaVerifier.current)
    //         .then(setVerificationId)
    //         .catch((error) => {
    //             console.log(error)
    //         })
    //     setIsAlertVisible(true)


    // };

    // const confirmCode = () => {
    //     // const phoneProvider = new PhoneAuthProvider(auth);

    //     if (alertContent) {
    //         setAlertContent("")
    //     }

    //     const credential = PhoneAuthProvider.credential(
    //         verificationId,
    //         code
    //     );

        
    //     signInWithCredential(auth, credential)
    //         .then(() => {
    //             const user = auth.currentUser;
    //             const uid = user.uid;
           
    //             createUserbyPhone(uid, UserName.value, FormattedNumber, FormattedDate, verificationId, code)
              
    //         })
    //         .catch((error) => {
    //             // show an alert in case of error
    //             console.log(error.code)
    //             if (error.code == 'auth/missing-verification-id') {
    //                 setAlertContent('* קוד אימות אינו נכון')
    //             } else if (error.code == 'auth/invalid-verification-code') {
    //                 setAlertContent('* קוד אימות אינו נכון')
    //             }
    //         })


    // };

    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShowDatePicker(Platform.OS === 'ios')
    //     setDate(currentDate);
    //     let tempeDate = new Date(currentDate)
    //     let fDate = tempeDate.getDate() + '/' + (tempeDate.getMonth() + 1) + '/' + tempeDate.getFullYear();
    //     setFormattedDate(fDate)

    // };

    // const onRegisterByPhonePressed = () => {

    //     const NameError = nameValidator(UserName.value)
    //     const CheckValidPhoneNumber = phoneInput.current?.isValidNumber(NumberValue);
    //     setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);
    //     console.log(CheckValidPhoneNumber)
    //     if (NameError || !FormattedDate || !FormattedNumber || !CheckValidPhoneNumber) {
    //         if (!FormattedDate) {
    //             setIsDateEmpty(true)
    //         } else {
    //             setIsDateEmpty(false)
    //         }
    //         if (!FormattedNumber) {
    //             setPhoneInputerror("* מספר טלפון חובה")

    //         }
    //         else if (!CheckValidPhoneNumber) {
    //             setPhoneInputerror("* מספר טלפון אינו נכון")

    //         } else {
    //             setPhoneInputerror('')
    //         }

    //         setUserName({ ...UserName, error: NameError })
    //         return;


    //     } else {

    //         sendVerification();
    //     }

    // };

    return (
       <View></View>
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : ""}
        //     style={{ flex: 1 }}
        // >

        //     <ScrollView

        //         style={styles.container}
        //         showsVerticalScrollIndicator={false}
        //     >
        //         {/* <View   style={styles.container} > */}
        //         <FirebaseRecaptchaVerifierModal
        //             ref={recaptchaVerifier}
        //             firebaseConfig={{
        //                 apiKey: "AIzaSyAlDyxLWQRNVxlX4PTW7uUyMI_52OB43WM",
        //                 authDomain: "a-book-for-book.firebaseapp.com",
        //                 databaseURL: "https://a-book-for-book-default-rtdb.europe-west1.firebasedatabase.app",
        //                 projectId: "a-book-for-book",
        //                 storageBucket: "a-book-for-book.appspot.com",
        //                 messagingSenderId: "753287459704",
        //                 appId: "1:753287459704:web:aa707bf183fee1cabcce8d",
        //                 measurementId: "G-QC2T22KS1K"
        //             }}
        //         // attemptInvisibleVerification
        //         // androidHardwareAccelerationDisabled
        //         />


        //         <View style={styles.container}>
        //             <BackButton goBack={props.navigation.goBack} />

        //             <View style={styles.ImageBackGround} ></View>

        //             {/*  Bootom View  */}
        //             <View style={styles.BootomView}>
        //                 {/* Welcome you  */}
        //                 <View style={styles.WelcomeView} >

        //                     <Text style={styles.WelcomeFont}>תכניס מספר טלפון...</Text>

        //                     {/* // input View  */}



        //                     <View style={styles.InputView}>
        //                         <TextInput                       // name input
        //                             label="שם משתמש"
        //                             returnKeyType="next"
        //                             onChangeText={(text) => setUserName({ value: text, error: "" })}
        //                             error={!!UserName.error}
        //                             errorText={UserName.error}
        //                             userIcon='user-o'
        //                         />
        //                         <View style={styles.DatePicker}>
        //                             <View style={styles.DateFontContainer} >
        //                                 <Text style={styles.DateFont}>{FormattedDate}</Text>
        //                             </View>

        //                             <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowDatePicker(true)} >
        //                                 <Entypo name='calendar' style={styles.IconDate} size={50} />


        //                                 {ShowDatePicker && (<DateTimePicker // date picher
        //                                     testID='dateTimepicker'
        //                                     value={date}
        //                                     mode='date'
        //                                     onChange={onChange}



        //                                 />)}


        //                             </TouchableOpacity>

        //                         </View>
        //                         {IsDateEmpty ? <Text style={styles.DateErrorFont}> * לבחור תאריך חובה</Text> : null}

        //                         {PhoneInputerror ? <PhoneInput // phone input
        //                             ref={phoneInput}
        //                             defaultValue={NumberValue}
        //                             defaultCode="IL"
        //                             layout="first"
        //                             placeholder='מספר טלפון'


        //                             containerStyle={styles.PhoneInputBorderError}
        //                             textContainerStyle={{ backgroundColor: '#ffffff' }}
        //                             countryPickerButtonStyle={styles.PhoneInputButton}
        //                             countryPickerProps={{ region: 'Asia' }}
        //                             onChangeText={(text) => {
        //                                 setNumberValue(text)
        //                             }}

        //                             onChangeFormattedText={(text) => {
        //                                 console.log(text)
        //                                 setFormattedNumber(text)
        //                             }}


        //                             filterProps={{ placeholder: 'תבחרו מדינה' }}

        //                             withShadow
        //                             {...props}

        //                         /> : null}
        //                         {!PhoneInputerror ? <PhoneInput
        //                             ref={phoneInput}
        //                             defaultValue={NumberValue}
        //                             defaultCode="IL"
        //                             layout="first"
        //                             placeholder='מספר טלפון'

        //                             containerStyle={styles.PhoneInputStyle}
        //                             textContainerStyle={{ backgroundColor: '#ffffff' }}
        //                             countryPickerButtonStyle={styles.PhoneInputButton}
        //                             countryPickerProps={{ region: 'Asia' }}
        //                             onChangeText={(text) => {
        //                                 setNumberValue(text)
        //                             }}
        //                             onChangeFormattedText={(text) => {

        //                                 setFormattedNumber(text)
        //                             }}



        //                             withShadow
        //                             {...props}

        //                         /> : null}

        //                         {PhoneInputerror ? <Text style={styles.error}>{PhoneInputerror}</Text> : null}


        //                         <Button // button send code
        //                             style={styles.ButtonRegister}
        //                             labelStyle={styles.ButtonRegisterFont}
        //                             mode="contained"
        //                             onPress={onRegisterByPhonePressed}

        //                         >
        //                             לשלוח קוד
        //                         </Button>

        //                     </View>



        //                 </View>


        //             </View>
        //             <Modal visible={isAleretVisible}>

        //                 <View style={styles.alertContainer}>


        //                     <View style={styles.alertContentContainer}>

        //                         <TextInput // input verify
        //                             label="קוד אימות"
        //                             returnKeyType="next"
        //                             onChangeText={setCode}
        //                             error={!!UserName.error}
        //                             errorText={UserName.error}
        //                             userIcon='user-o'
        //                         />
        //                         {alertContent ? <Text style={styles.alertContentTextSucsess}>{alertContent}</Text> : null}

        //                         <Button // Button verify
        //                             style={styles.ButtonRegister}
        //                             labelStyle={styles.ButtonRegisterFont}
        //                             mode="contained"
        //                             onPress={confirmCode}

        //                         >
        //                             לאשר
        //                         </Button>



        //                     </View>

        //                 </View>

        //             </Modal>
        //         </View>

        //         {/* </View> */}
         
        //     </ScrollView>
        // </KeyboardAvoidingView>


    );

}
