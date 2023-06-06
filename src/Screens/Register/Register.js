import * as React from 'react';
import { useState, useRef } from "react";

import { ScrollView, Text, View, I18nManager, KeyboardAvoidingView, Keyboard, TouchableOpacity, Platform } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import BackButton2 from '../../components/BackButton2/BackButton2'
import styles from './styles';
import TextInput from "../../components/TextInput/TextInput";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { nameValidator } from '../../helpers/nameValidator';
import { Button, Modal } from "react-native-paper";




import { Entypo, ModelIcon, MaterialCommunityIcons } from '@expo/vector-icons';


// import PhoneInput from 'react-native-phone-number-input';
import createUser from '../../config/AuthDB'
import LodingModel from '../../components/LodingModel/LodingModel';


export default function Register(props) {
    const { navigation } = props;
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [UserName, setUserName] = useState({ value: "", error: "" });
    const [date, setDate] = useState(new Date());
    const [FormattedDate, setFormattedDate] = useState('');
    const [IsDateEmpty, setIsDateEmpty] = useState(false);
    const [ShowDatePicker, setShowDatePicker] = useState(false);
    const [ConfirmPassowrd, setConfirmPassowrd] = useState({ value: "", error: "" });
    const phoneInput = useRef(null);
    const [ValidNumber, setValidNumber] = useState(false);
    const [PhoneInputerror, setPhoneInputerror] = useState("");
    const [NumberValue, setNumberValue] = useState("");
    const [FormattedNumber, setFormattedNumber] = useState("");
    const [isAleretVisible, setIsAlertVisible] = useState(false);
    const [ModelIcon, setModelIcon] = useState(false);
    const [isLoadingModel, setIsLoadingModel] = useState(false);

    const [alertContent, setAlertContent] = useState("");

    // this function check if FirstPassword and SecondPassword is equal
    const ConfirmPassowrdFunc = (FirstPassword, SecondPassword) => {



        if (FirstPassword.normalize() === SecondPassword.normalize()) {
            //strings are equal.
            return true
        } else {
            //strings are not equal.
            return false
        }

    }

// check if the cell phone number is valid for israel
    function ValidatePhoneNumber(phoneNumber) { 
        var regex = /^05\d([-]{0,1})\d{7}$/;
        var phone = phoneNumber.match(regex);
        if (!phoneNumber) {
            return true;
        }
        if (phone) {
            return true;
        }
        return false;
    }

 

  // this function implement when press on Register button, they check the validation of  details 
  // then upload the data to DB and creat new user
    const onRegisterPressed = () => {

        setIsLoadingModel(true)
        setPhoneInputerror("")
        const emailError = emailValidator(email.value);
        const equalPassword = ConfirmPassowrdFunc(password.value, ConfirmPassowrd.value)
        const passwordError = passwordValidator(password.value);
        const ConfirmPasswordError = passwordValidator(ConfirmPassowrd.value, equalPassword);
        const NameError = nameValidator(UserName.value)


        const CheckValidPhoneNumber = ValidatePhoneNumber(NumberValue);
        setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);


        if (emailError || passwordError || NameError || ConfirmPasswordError || (!CheckValidPhoneNumber)) {
        
            if (!CheckValidPhoneNumber) {
                setPhoneInputerror("* מספר טלפון אינו נכון")

            }
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassowrd({ ...ConfirmPassowrd, error: ConfirmPasswordError });
            setUserName({ ...UserName, error: NameError })
            setIsLoadingModel(false)
            return;


        }
        // setIsDateEmpty(false)
        createUser(email.value, password.value, UserName.value, FormattedNumber).then(() => {
            setAlertContent("שלחנו אליך הודעת אימות, נא לוודא לדוא״ל שלך.")
            setIsLoadingModel(false)
            setIsAlertVisible(true)
            setModelIcon(true)


        }).catch((error) => {
            setAlertContent(error)
            setModelIcon(false)
            setIsAlertVisible(true)
            setIsLoadingModel(false)


        });




    };

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : ""}

        >
            {I18nManager.isRTL ? <BackButton2 goBack={navigation.goBack}/>: <BackButton goBack={navigation.goBack} />   }

            <ScrollView
                style={styles.container}


                showsVerticalScrollIndicator={false}
            >



                <View>

                    <View style={styles.ImageBackGround} ></View>

                    {/*  Bootom View  */}
                    <View style={styles.BootomView}>
                        {/* Welcome you  */}
                        <View style={styles.WelcomeView} >

                            <Text style={styles.WelcomeFont}>אנא למלא את השדות כדי ליצור חשבון!</Text>
                            <View style={styles.RegisterAndQustionFont}>
                            </View>
                            {/* // input View  */}

                            <View style={styles.InputView}>
                                <TextInput
                                    label="שם משתמש"
                                    returnKeyType="next"
                                    onChangeText={(text) => setUserName({ value: text, error: "" })}
                                    error={!!UserName.error}
                                    errorText={UserName.error}
                                    userIcon='user-o'

                                />
                                <TextInput
                                    label="דוא״ל"
                                    returnKeyType="next"
                                    value={email.value}
                                    onChangeText={(text) => setEmail({ value: text, error: "" })}
                                    error={!!email.error}
                                    errorText={email.error}
                                    autoCapitalize="none"
                                    autoCompleteType="email"
                                    textContentType="emailAddress"
                                    keyboardType="email-address"
                                    emailicon="email-outline"
                                />
                                <TextInput
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
                                />

                     

                                <TextInput
                                    label="סיסמה"
                                    lockicon="lock"
                                    returnKeyType="done"
                                    value={password.value}
                                    onChangeText={(text) => setPassword({ value: text, error: "" })}
                                    error={!!password.error}
                                    errorText={password.error}
                                    secureTextEntry
                                />

                                <TextInput
                                    label="לאשר סיסמה"
                                    lockicon="lock"
                                    returnKeyType="done"
                                    value={ConfirmPassowrd.value}
                                    onChangeText={(text) => setConfirmPassowrd({ value: text, error: "" })}
                                    error={!!ConfirmPassowrd.error}
                                    errorText={ConfirmPassowrd.error}
                                    secureTextEntry
                                />
                                {/*  forget password  */}

                            </View>

                            <Button
                                style={styles.ButtonRegister}
                                labelStyle={styles.ButtonRegisterFont}
                                mode="contained"
                                onPress={onRegisterPressed}

                            >
                                הרשם
                            </Button>

                        </View>

                    </View>
                </View>
                <Modal visible={isAleretVisible}>

                    <View style={styles.alertContainer}>


                        <View style={styles.alertContentContainer}>

                            {/* <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text> */}
                            {ModelIcon ? <MaterialCommunityIcons style={styles.IconSucsess} name='email-send-outline' size={100} /> : null}
                            {ModelIcon ? <Text style={styles.alertContentTextSucsess}>{alertContent}</Text> : null}
                            {!ModelIcon ? <Entypo style={styles.IconError} name='circle-with-cross' size={100} /> : null}
                            {!ModelIcon ? <Text style={styles.alertContentTextError}>{alertContent}</Text> : null}
                            {ModelIcon ? <Button
                                style={styles.ButtonRegister}
                                labelStyle={styles.ButtonRegisterFont}
                                mode="contained"
                                onPress={() => setIsAlertVisible(false) || navigation.navigate('login')}
                            >

                                סגור
                            </Button> : null}
                            {!ModelIcon ? <Button
                                style={styles.ButtonRegister}
                                labelStyle={styles.ButtonRegisterFont}
                                mode="contained"
                                onPress={() => setIsAlertVisible(false) || navigation.navigate('Register')}
                            >

                                סגור
                            </Button> : null}



                        </View>

                    </View>

                </Modal>

            </ScrollView>
            <LodingModel isModelVisible = {isLoadingModel}/>
        </KeyboardAvoidingView>


    );

}
