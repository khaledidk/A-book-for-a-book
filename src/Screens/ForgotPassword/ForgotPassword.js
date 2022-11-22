import * as React from 'react';
import { useState } from "react";

import { ScrollView, Text, View, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableOpacity } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import TextInput from '../../components/TextInput/TextInput';
import { Button } from "react-native-paper";
import styles from './styles';
import { emailValidator } from '../../helpers/emailValidator';
export default function ForgotPassword(props) {
    const { navigation } = props;

    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [ConfirmPassowrd, setConfirmPassowrd] = useState({ value: "", error: "" });

    const onSendPressewd = () => {
        const emailError = emailValidator(email.value);

        if (emailError) {
            setEmail({ ...email, error: emailError });

            return;
        }
    }

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

                    <View

                        style={styles.ImageBackGround} >

                    </View>
                    {/* // Bootom View * */}
                    <View style={styles.BootomView}>
                        {/* // Welcome you  */}
                        <View style={styles.WelcomeView} >

                            <Text style={styles.WelcomeFont}>אנא להזין דוא״ל שלך כדי לעשות איפוס סיסמה.</Text>

                            {/* // input View  */}

                            <View style={styles.InputView}>

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
                                    description={"תקבל אימייל עם קישור לאיפוס סיסמה."}

                                />




                            </View>

                            <Button
                                style={styles.ButtonSend}
                                mode="contained"
                                onPress={onSendPressewd}


                            >

                                שלח
                            </Button>

                        </View>

                    </View>
                </View>


            </ScrollView>
        </KeyboardAvoidingView>

    );
}
