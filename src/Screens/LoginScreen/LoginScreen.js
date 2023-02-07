

import * as React from 'react';
import { useState } from "react";
import { ScrollView, Text, View, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableOpacity } from "react-native";
import { Button, Modal } from "react-native-paper";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import TextInput from "../../components/TextInput/TextInput";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { SignInWithProvider } from '../../config/AuthDB';
import { SignIn } from '../../config/AuthDB';
import { sendEmailVerification } from "firebase/auth";
import { auth } from '../../config/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function LoginScreen(props) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [VerifyError, setVerifyError] = useState(false);
  const [isAleretVisible, setIsAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("שגיאה");
  const [alertContent, setAlertContent] = useState("קרתה שגיאה");

  const [IsError, setIsError] = useState(false);
  const { navigation } = props;
  const SendEmailVerification = () => {
    const user = auth.currentUser;

    sendEmailVerification(user)

  }

  const onLoginPressed = () => {


    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    SignIn(email.value, password.value).catch((error) => { // catch any error 

      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });


      } else {
        if (error == "* דוא״ל לא נמצא.") {

          setEmail({ ...email, error: error });
        } else if (error == "* סיסמה אינו נכונה.") {

          setPassword({ ...password, error: error });

        } else if (error == "* דוא״ל לא אומת.") {
          setPassword({ ...password, error: error });
          setVerifyError(true)

        } else {

          setPassword({ ...password, error: error });

        }
      }



      return;


    });

  };

  return (

    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : ""}

    >

      <ScrollView
        style={styles.container}

        showsVerticalScrollIndicator={false}
      >


        <View>

          <ImageBackground
            source={require("../../../assets/logo.png")}
            style={styles.ImageBackGround} >

          </ImageBackground>
          {/* // Bootom View * */}
          <View style={styles.BootomView}>
            {/* // Welcome you  */}
            <View style={styles.WelcomeView} >

              <Text style={styles.WelcomeFont}>ברוכים הבאים</Text>
              <View style={styles.RegisterAndQustionFont}>
                <Text style={styles.QustionFontFont} > אין לך חשבון עדיין?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.RegisterFont}> יצירת חשבון</Text>
                </TouchableOpacity>

              </View>
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
                {VerifyError ? <Button
                  style={styles.ButtonPhoneRegister}
                  labelStyle={styles.ButtonLoginFont}
                  mode="contained"
                  onPress={SendEmailVerification}

                >
                  תשלח לדוא״ל שוב
                </Button> : null}
                {/* // forget password  */}
                <View style={styles.ForgetPassword}>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={styles.RegisterFont}>שכחת/שינוי סיסמה?</Text>
                  </TouchableOpacity>

                </View>

              </View>

              <Button
                style={styles.ButtonLogin}
                labelStyle={styles.ButtonLoginFont}
                mode="contained"
                onPress={onLoginPressed}

              >

                התחבר
              </Button>

              {/* <Button
                style={styles.ButtonPhoneRegister}
                labelStyle={styles.ButtonLoginFont}
                mode="contained"
                onPress={() => navigation.navigate("LoginWithPhone")}

              >

                התחבר עם מספר תלפון
              </Button> */}

            </View>


          </View>
        </View>

        <Modal visible={isAleretVisible}>

          <View style={styles.alertContainer}>


            <View style={styles.alertContentContainer}>

              {/* <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text> */}
              <MaterialCommunityIcons style={styles.IconSucsess} name='email-send-outline' size={100} />
              <Text style={styles.alertContentTextSucsess}>שלחנו אליך הודעת אימות, נא לוודא לדוא״ל שלך.</Text>

              <Button
                style={styles.ButtonLogin}
                labelStyle={styles.ButtonLoginFont}
                mode="contained"
                onPress={() => setIsAlertVisible(false)}
              >

                סגור
              </Button>



            </View>

          </View>

        </Modal>


      </ScrollView>
    </KeyboardAvoidingView>

  );


}