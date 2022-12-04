import * as React from 'react';
import { useState, useRef, useEffect } from "react";

import { ScrollView, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Keyboard, Platform } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles';
import { Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { Button, Modal, Text } from "react-native-paper";
import PhoneInput from 'react-native-phone-number-input';
import { SignInWithPhoneNumber } from '../../config/AuthDB';
import { addNewUserByPhone } from '../../config/FireStoreDB';
import { auth } from '../../config/firebase';


export default function LoginWithPhone(props) {
    const { navigation } = props;

    const [NumberValue, setNumberValue] = useState("");
    const [FormattedNumber, setFormattedNumber] = useState("");
    const [ModelIcon, setModelIcon] = useState(false);
    const [isAleretVisible, setIsAlertVisible] = useState(false);
    const [ErrorOrSucsses, setErrorOrSucsses] = useState(true);
    const [IsUserLoginByPhone, setIsUserLoginByPhone] = useState(false);

    const [alertContent, setAlertContent] = useState("");

    const [ValidNumber, setValidNumber] = useState(false);
    const [PhoneInputerror, setPhoneInputerror] = useState("");

    const phoneInput = useRef(null);


    const [DropDownValue, setDropDownValue] = useState('');
    const Data = require('../../data/data.json');


    async function onLoginPressed() {



        const CheckValidPhoneNumber = phoneInput.current?.isValidNumber(NumberValue);
        setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);
        if (!FormattedNumber) {
            setPhoneInputerror("* מספר טלפון חובה")
            return;
        }
        else if (!CheckValidPhoneNumber) {
            setPhoneInputerror("* מספר טלפון אינו נכון")
            return;
        } else {
            setPhoneInputerror('')


            // let docID = await SignInWithPhoneNumber(FormattedNumber)
            // if (docID) {
            //     setIsUserLoginByPhone(true)
            // }
            // addNewUserByPhone("user", "uid")



        }



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



                <View style={styles.container}>
                    <BackButton goBack={props.navigation.goBack} />

                    <View style={styles.ImageBackGround} ></View>

                    {/*  Bootom View  */}
                    <View style={styles.BootomView}>
                        {/* Welcome you  */}
                        <View style={styles.WelcomeView} >

                            <Text style={styles.WelcomeFont}>תכניס מספר טלפון...</Text>

                            {/* // input View  */}

                            <View style={styles.InputView}>

                                {PhoneInputerror ? <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={NumberValue}
                                    defaultCode="IL"
                                    layout="first"
                                    placeholder='מספר טלפון'


                                    containerStyle={styles.PhoneInputBorderError}
                                    textContainerStyle={{ backgroundColor: '#ffffff' }}
                                    countryPickerButtonStyle={styles.PhoneInputButton}
                                    countryPickerProps={{ region: 'Asia' }}
                                    onChangeText={(text) => {
                                        setNumberValue(text)
                                    }}

                                    onChangeFormattedText={(text) => {
                                        console.log(text)
                                        setFormattedNumber(text)
                                    }}


                                    filterProps={{ placeholder: 'תבחרו מדינה' }}

                                    withShadow
                                    {...props}

                                /> : null}
                                {!PhoneInputerror ? <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={NumberValue}
                                    defaultCode="IL"
                                    layout="first"
                                    placeholder='מספר טלפון'


                                    containerStyle={styles.PhoneInputStyle}
                                    textContainerStyle={{ backgroundColor: '#ffffff' }}
                                    countryPickerButtonStyle={styles.PhoneInputButton}
                                    countryPickerProps={{ region: 'Asia' }}
                                    onChangeText={(text) => {
                                        setNumberValue(text)
                                    }}
                                    onChangeFormattedText={(text) => {

                                        setFormattedNumber(text)
                                    }}



                                    withShadow
                                    {...props}

                                /> : null}

                                {PhoneInputerror ? <Text style={styles.error}>{PhoneInputerror}</Text> : null}


                            </View>

                            <Button
                                style={styles.ButtonRegister}
                                labelStyle={styles.ButtonRegisterFont}
                                mode="contained"
                                onPress={onLoginPressed}

                            >
                                התחבר
                            </Button>

                            <Button
                                style={styles.ButtonRegister}
                                labelStyle={styles.ButtonRegisterFont}
                                mode="contained"
                                onPress={() => navigation.navigate("RegisterWithPhone")}

                            >
                                להרשים עם מספר תלפון
                            </Button>

                        </View>

                    </View>

                </View>



            </ScrollView>
        </KeyboardAvoidingView>


    );

}
