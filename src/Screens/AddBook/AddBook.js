import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, KeyboardAvoidingView, ScrollView, Image } from "react-native";

import styles from "./styles";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import { Button, Modal } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import BottomTab from '../../components/BottomTab/BottomTab'
import BackButton from "../../components/BackButton/BackButton";
import { Entypo, MaterialCommunityIcons, AntDesign , FontAwesome } from '@expo/vector-icons';
export default function AddBook(props) {
  const { navigation } = props;





  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : ""}

    >
      <BackButton goBack={props.navigation.goBack} />
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

              {/* // input View  */}

              <View style={styles.InputView}>
                <TextInput
                  label="שם משתמש"
                  returnKeyType="next"


                />
                <TextInput
                  label="דוא״ל"
                  returnKeyType="next"
                // value={email.value}
                // onChangeText={(text) => setEmail({ value: text, error: "" })}
                // error={!!email.error}
                // errorText={email.error}
                // autoCapitalize="none"
                // autoCompleteType="email"
                // textContentType="emailAddress"
                // keyboardType="email-address"
                // emailicon="email-outline"
                />


                <TextInput
                  label="סיסמה"
                  lockicon="lock"
                // returnKeyType="done"
                // value={password.value}
                // onChangeText={(text) => setPassword({ value: text, error: "" })}
                // error={!!password.error}
                // errorText={password.error}
                // secureTextEntry
                />

                <TextInput
                  label="לאשר סיסמה"
                  lockicon="lock"
                // returnKeyType="done"
                // value={ConfirmPassowrd.value}
                // onChangeText={(text) => setConfirmPassowrd({ value: text, error: "" })}
                // error={!!ConfirmPassowrd.error}
                // errorText={ConfirmPassowrd.error}
                // secureTextEntry
                />
                {/*  forget password  */}

              </View>



            </View>

          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>

  );
}
