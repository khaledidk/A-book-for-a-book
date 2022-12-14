import * as React from 'react';
import { useState, useRef } from "react";

import { ScrollView, Text, View, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableOpacity } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles';
import TextInput from "../../components/TextInput/TextInput";
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { Button } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";

import Icon from 'react-native-vector-icons/FontAwesome';
import { CreatNewUser } from '../../config/RealTimeDB';
import { addNewItem } from '../../config/FireStoreDB';

export default function Register(props) {
    const { navigation } = props;
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [UserName, setUserName] = useState("");
    const [value, setValue] = useState("");
    const [NumberValue, setNumberValue] = useState("");
    const [ValidNumber, setValidNumber] = useState(false);
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef(null);
    const onRegisterPressed = () => {



        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const checkValid = phoneInput.current?.isValidNumber(NumberValue);
        setValidNumber(checkValid ? checkValid : false);
        console.log(ValidNumber)
        console.log("pass" + passwordError)
        // setValid(checkValid ? checkValid : false);
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        }
        CreatNewUser(email.value, password.value)
        addNewItem(UserName)

        // setIsProcessing(true);

        // getUserByEmail(email.value.toLowerCase()).then((currUserInfo) => {
        //   console.log(currUserInfo);

        //   if (currUserInfo === undefined || currUserInfo.isActive === false) {

        //     setAlertTitle("??????????");
        //     setAlertContent("* ???? ?????????? ?????????? ????????????");
        //     setIsProcessing(false);
        //     setIsAlertVisible(true);

        //   } else {

        //     signInWithEmailAndPassword(auth, email.value, password.value).catch(error => {
        //       setErrorState(error.message);

        //       setAlertTitle("??????????");
        //       setAlertContent("* ???? ?????????? ?????????? ????????????");
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


{/* 
        <View>

    <ImageBackground
        source={require("../../../assets/logo.png")}
        style={styles.ImageBackGround} >

    </ImageBackground>
    {/*  Bootom View * /}
    <View style={styles.BootomView}>
        {/* Welcome you  /}
        <View style={styles.WelcomeView} >

        <Text style={styles.WelcomeFont}>???? ???????? ???? ?????????? ???????????? ??????????!!</Text>
        <View style={styles.RegisterAndQustionFont}>
        </View>
        {/* // input View  /}

        <View style={styles.InputView}>
            <TextInput
                label="???? ????????"
                returnKeyType="next"
                onChangeText={(text) => setUserName(text)}


            />
            {/* <TextInput
                label="???? ??????????"
                returnKeyType="next"


            /> /}
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="IL"
                layout="first"
                placeholder='???????? ??????????'
                onChangeText={(text) => {
                    setNumberValue(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                }}


            />

            <TextInput
                label="??????????"
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
                label="??????????"
                lockicon="lock"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            {/* // forget password  /}

        </View>

        <Button
            style={styles.ButtonLogin}
            mode="contained"
            onPress={onRegisterPressed}

        >
            ??????????
        </Button>

    </View>

    </View>
</View> */}


    </ScrollView>
</KeyboardAvoidingView>




    );

}
