

import * as React from 'react';
import { useState } from "react";
import { ScrollView, Text, View, ImageBackground, KeyboardAvoidingView, NativeModules, TouchableOpacity, I18nManager } from "react-native";
import { Button, Modal } from "react-native-paper";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import TextInput from "../../components/TextInput/TextInput";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { emailValidator } from "../../helpers/emailValidator";
import { passwordValidator } from "../../helpers/passwordValidator";
import { SignInWithProvider, signInWithGoogle } from '../../config/AuthDB';
import { SignIn } from '../../config/AuthDB';
import { sendEmailVerification } from "firebase/auth";
import { auth } from '../../config/firebase';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import LodingModel from '../../components/LodingModel/LodingModel';
import { useEffect } from 'react';
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [VerifyError, setVerifyError] = useState(false);
  const [isAleretVisible, setIsAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("שגיאה");
  const [alertContent, setAlertContent] = useState("קרתה שגיאה");

  const [IsError, setIsError] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);

  // this function send verification to email
  const SendEmailVerification = () => {
    const user = auth.currentUser;

    sendEmailVerification(user)

  }

  // this function implement when press on login button, they check the validation of user if Available then do login

  const onLoginPressed = () => {


    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    setIsLoadingModel(true)
    SignIn(email.value, password.value).then(() => {
      setIsLoadingModel(false)
    }).catch((error) => { // catch any error 
      setIsLoadingModel(false)
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

      setIsLoadingModel(false)

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
              <View>
                <Button
                  style={styles.ButtonLoginWithPhone}
                  labelStyle={styles.ButtonLoginFont}
                  mode="contained"
                  onPress={() => navigation.navigate("LoginWithPhone")}

                >

                  התחבר עם מס' טלפון

                </Button>

                <Ionicons style={[!I18nManager.isRTL && styles.phoneIcon, I18nManager.isRTL && styles.phoneIcon2]} name={"phone-portrait-outline"} size={30} color={"#ffffff"} />
              </View>
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
      <LodingModel isModelVisible={isLoadingModel} />
    </KeyboardAvoidingView>

  );


}