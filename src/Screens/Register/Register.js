import * as React from 'react';
import { useState, useRef } from "react";

import { ScrollView, Text, View, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableOpacity, Platform } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles';
import TextInput from "../../components/TextInput/TextInput";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { nameValidator } from '../../helpers/nameValidator';
import { Button } from "react-native-paper";

import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInputComponet from '../../components/PhoneInput/PhoneInputComponet';

import { Entypo } from '@expo/vector-icons';
import { CreatNewUser } from '../../config/RealTimeDB';
import { addNewItem } from '../../config/FireStoreDB';

import DropDownPicker from 'react-native-dropdown-picker'
import { set } from 'firebase/database';




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




    const ConfirmPassowrdFunc = (FirstPassword, SecondPassword) => {



        if (FirstPassword.normalize() === SecondPassword.normalize()) {
            //strings are equal.
            return true
        } else {
            //strings are not equal.
            return false
        }

    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios')
        setDate(currentDate);
        let tempeDate = new Date(currentDate)
        let fDate = tempeDate.getDate() + '/' + (tempeDate.getMonth() + 1) + '/' + tempeDate.getFullYear();
        setFormattedDate(fDate)

    };


    const onRegisterPressed = () => {


        const emailError = emailValidator(email.value);
        const equalPassword = ConfirmPassowrdFunc(password.value, ConfirmPassowrd.value)
        const passwordError = passwordValidator(password.value);
        const ConfirmPasswordError = passwordValidator(ConfirmPassowrd.value, equalPassword);
        const NameError = nameValidator(UserName.value)
      


        if (emailError || passwordError || NameError || ConfirmPasswordError || !FormattedDate) {
        
                setIsDateEmpty(true)
          
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassowrd({ ...ConfirmPassowrd, error: ConfirmPasswordError });
            setUserName({ ...UserName, error: NameError })
            return;


        }
        setIsDateEmpty(false)
        navigation.navigate("RegisterOptional", { UserName: UserName, Email: email, Password: password, Date: FormattedDate })

        // CreatNewUser(email.value, password.value)
        // addNewItem(UserName)


        // setIsProcessing(true);

        // getUserByEmail(email.value.toLowerCase()).then((currUserInfo) => {
        //   console.log(currUserInfo);

        //   if (currUserInfo === undefined || currUserInfo.isActive === false) {

        //     setAlertTitle("שגיאה");
        //     setAlertContent("* נא לוודא דוא״ל וסיסמה");
        //     setIsProcessing(false);
        //     setIsAlertVisible(true);

        //   } else {

        //     signInWithEmailAndPassword(auth, email.value, password.value).catch(error => {
        //       setErrorState(error.message);

        //       setAlertTitle("שגיאה");
        //       setAlertContent("* נא לוודא דוא״ל וסיסמה");
        //       setIsProcessing(false);
        //       setIsAlertVisible(true);
        //     });
        //   }
        // });

    };

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : ""}

        >
            <BackButton goBack={navigation.goBack} />

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



                                <View style={styles.DatePicker}>
                                    <Text style={styles.DateFont}>{FormattedDate}</Text>
                                    <TouchableOpacity onPress={() => setShowDatePicker(true)} >
                                        <Entypo name='calendar' style={styles.IconDate} size={50} >


                                            {ShowDatePicker && (<DateTimePicker
                                                testID='dateTimepicker'
                                                value={date}
                                                mode='date'
                                                onChange={onChange}


                                            />)}
                                        </Entypo>
                                        {IsDateEmpty ? <Text> * לבחור תאריך חובה</Text> : null}
                                    </TouchableOpacity>

                                </View>

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
                                המשך
                            </Button>

                        </View>

                    </View>
                </View>


            </ScrollView>
        </KeyboardAvoidingView>


    );

}
