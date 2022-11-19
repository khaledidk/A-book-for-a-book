

import * as React from 'react';
import { useState } from "react";
import { NativeBaseProvider, Item, Input, Label } from "native-base";
import { ScrollView, Text, View, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import TextInput from "../../components/TextInput/TextInput";
import styles from "./styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import  {emailValidator}  from "../../helpers/emailValidator";
import  {passwordValidator}  from "../../helpers/passwordValidator";

export default function LoginScreen(props) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [errorState, setErrorState] = useState("");

  const [alertTitle, setAlertTitle] = useState("שגיאה");
  const [alertContent, setAlertContent] = useState("קרתה שגיאה");
  const [isAleretVisible, setIsAlertVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { navigation } = props;

  const onLoginPressed = () => {



    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    navigation.navigate("Home")

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

              <Text style={styles.WelcomeFont}>בורכים הבאים</Text>
              <View style = {styles.RegisterAndQustionFont}>
              <Text style={styles.QustionFontFont} > אין לך חשבון עדיין?</Text>
              <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                <Text style={styles.RegisterFont}> יצירה חשבון</Text>
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
                {/* // forget password  */}
                <View style={styles.ForgetPassword}>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("ForgetPassword")}
                  >
                    <Text style={styles.RegisterFont}>שכחת/שינוי סיסמה?</Text>
                  </TouchableOpacity>

                </View>
              </View>

              <Button
                style={styles.ButtonLogin}
                mode="contained"
                onPress={onLoginPressed}

              >

                כניסה
              </Button>

            </View>

          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>




  );


}