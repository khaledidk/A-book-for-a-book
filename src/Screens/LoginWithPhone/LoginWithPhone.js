import * as React from 'react';
import { useState, useRef, useEffect } from "react";

import { ScrollView, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Keyboard, Platform, I18nManager, Alert } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles';
import { Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { Button, Modal, Text } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import { signInWithCredential, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";
import { addNewUserWithPhone, checkUserInfo } from '../../config/FireStoreDB';
import { auth } from '../../config/firebase';
import BackButton2 from '../../components/BackButton2/BackButton2';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import LodingModel from '../../components/LodingModel/LodingModel';

export default function LoginWithPhone({ navigation }) {


    const [NumberValue, setNumberValue] = useState("");
    const recaptchaVerifier = useRef(null);
    const [PhoneInputerror, setPhoneInputerror] = useState("");
    const [isAleretVisible, setIsAlertVisible] = useState(false);
    const [nameInputVisible, setNameInputVisible] = useState(false);
    const [verificationId, setVerificationId] = useState(null);
    const [alertContent, setAlertContent] = useState("");
    const [userID, setUserID] = useState("");
    const [isLoadingModel, setIsLoadingModel] = useState(false);
    const [code, setCode] = useState('');
    const [UserName, setUserName] = useState({ value: "", error: "" });

    // this function check Validate of Phone Number
    function ValidatePhoneNumber(phoneNumber) { // check if the cell phone number is valid for israel
        var regex = /^05\d([-]{0,1})\d{7}$/;
        var phone = phoneNumber.match(regex);
        if (phone) {
            return true;
        }

        return false;
    }

    // this function send code to phone for Verification
    const sendVerification = async () => {
        const phoneProvider = new PhoneAuthProvider(auth);
        const FormattedNumber = "+972" + NumberValue
        console.log("FormattedNumber", FormattedNumber)
        const check = await checkUserInfo(NumberValue).catch(() => {

            Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });
       
        phoneProvider.verifyPhoneNumber(FormattedNumber, recaptchaVerifier.current)
            .then((res) => {

                setVerificationId(res)
                setIsAlertVisible(true)
                if (!check) {
                    setNameInputVisible(true)
                }


            })
            .catch((e) => {
                console.log(e.code)
                if (e.code == "ERR_FIREBASE_RECAPTCHA_CANCEL") {
                    return;
                }
                Alert.alert("יותר מדי בקשות/קרתה שגיה", "לא יכול להתחבר נא לנסה שוב ", [{ text: "בסדר" }])
            })



    };

    // this function check if the code is current
    const confirmCode = async () => {


        if (alertContent) {
            setAlertContent("")
        }

        const credential = PhoneAuthProvider.credential(
            verificationId,
            code
        );
        setIsLoadingModel(true)

        signInWithCredential(auth, credential)
            .then(async () => {
                const user = auth.currentUser;
                const uid = user.uid;

                if (nameInputVisible) {
                    await addNewUserWithPhone(uid, UserName.value, NumberValue).catch(() => {
                        Alert.alert("קרתה שגיה", "לא יכול לטעון דאטה נא לנסה שוב", [{ text: "בסדר" }])
                    })
                }
                setIsLoadingModel(false)

            })
            .catch((error) => {
                // show an alert in case of error
                setIsLoadingModel(false)
                console.log(error.code)
                if (error.code == 'auth/missing-verification-id') {
                    Alert.alert("קרתה שגיה", '* קוד אימות אינו נכון', [{ text: "בסדר" }])
                } else if (error.code == 'auth/invalid-verification-code') {
                    Alert.alert("קרתה שגיה", '* קוד אימות אינו נכון', [{ text: "בסדר" }])
                }
            })


    };

    // this function implement when press on login button,then do login
  
    const onLoginPressed = async () => {

        const CheckValidPhoneNumber = ValidatePhoneNumber(NumberValue);
        if (!NumberValue) {
            setPhoneInputerror("* מספר טלפון חובה")
            return;
        }
        if (!CheckValidPhoneNumber) {
            setPhoneInputerror("* מספר טלפון אינו נכון")
            return;
        }


        sendVerification();

    };

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
        // style={{ flex: 1 }}
        >


            <ScrollView
                //  contentContainerStyle={{  flexGrow: 1}}


                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"

            >

                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}

                    firebaseConfig={{
                        apiKey: "AIzaSyBOTSiaTFlWUqRJvEUa9v9AVy7OaprGkiA",
                        authDomain: "bookforbook-7dec4.firebaseapp.com",
                        projectId: "bookforbook-7dec4",
                        storageBucket: "bookforbook-7dec4.appspot.com",
                        messagingSenderId: "569934775016",
                        appId: "1:569934775016:web:049be6c3cc4705276c7f5d",
                        measurementId: "G-SQGXTR8PZ1"
                    }}
                // attemptInvisibleVerification
                // androidHardwareAccelerationDisabled
                />

                <View style={styles.container}>
                    {I18nManager.isRTL ?
                        <BackButton2 goBack={navigation.goBack} />
                        : <BackButton goBack={navigation.goBack} />}

                    <View style={styles.ImageBackGround} ></View>

                    {/*  Bootom View  */}
                    <View style={styles.BootomView}>
                        {/* Welcome you  */}
                        <View style={styles.WelcomeView} >
                            {isAleretVisible && !nameInputVisible ? <Text style={styles.alertContentTextSucsess}>נא להזין קוד אימות</Text> : null}
                            {!isAleretVisible && !nameInputVisible ? <Text style={styles.WelcomeFont}>תכניס מספר טלפון</Text> : null}
                            {nameInputVisible && isAleretVisible ? <Text style={styles.alertContentTextSucsess}>נא להזין קוד אימות ושם משתמש</Text>
                                : null}
                            {/* // input View  */}

                            <View style={styles.InputView}>

                                {!isAleretVisible ? <TextInput
                                    value={NumberValue}
                                    onChangeText={(userPhone) => setNumberValue(userPhone)}
                                    label="טלפון נייד"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    phoneIcon='phone'
                                    style={styles.PhoneInputStyle}
                                    error={!!PhoneInputerror}
                                    errorText={PhoneInputerror}
                                /> : null}


                            </View>

                            {nameInputVisible && isAleretVisible ? <TextInput
                                label="שם משתמש"
                                returnKeyType="next"
                                onChangeText={(text) => setUserName({ value: text, error: "" })}
                                error={!!UserName.error}
                                errorText={UserName.error}
                                userIcon='user-o'

                            /> : null}
                            {isAleretVisible && <TextInput // input verify
                                label="קוד אימות"
                                returnKeyType="next"
                                onChangeText={setCode}
                                error={!!alertContent}
                                errorText={alertContent}

                            />}


                            {isAleretVisible && <TouchableOpacity onPress={() => navigation.replace("LoginWithPhone")}>
                                <Text style={styles.relpaceFont}>לא נשלח לך קוד תלחץ כאן</Text>
                            </TouchableOpacity>}

                            {isAleretVisible ? <Button // Button verify
                                style={styles.ButtonRegister}
                                labelStyle={styles.ButtonRegisterFont}
                                mode="contained"
                                onPress={confirmCode}

                            >
                                לאשר
                            </Button> :

                                <Button
                                    style={styles.ButtonRegister}
                                    labelStyle={styles.ButtonRegisterFont}
                                    mode="contained"
                                    onPress={onLoginPressed}

                                >
                                    התחבר
                                </Button>}




                        </View>

                    </View>

                </View>



            </ScrollView>
            <LodingModel isModelVisible={isLoadingModel} />
        </KeyboardAvoidingView>


    );

}
