import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, TouchableOpacity, ImageBackground, RefreshControl, I18nManager, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';
import { SignOut } from "../../config/AuthDB";
import { Button } from "react-native-paper";
import styles from "./styles";
import { fetchCurrentUserInfo } from "../../config/FireStoreDB";
import { updateUser } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { Modal } from "react-native-paper";



export default function Profile({ navigation, route }) {

  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
  const [isEdite, setIsEdite] = useState(false);
  const [currUserInfo, setCurrUserInfo] = useState({ name: "", image: profileDefaultImageUri, email: "", phoneNumber: "" });
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [isAleretVisible, setIsAlertVisible] = useState(false);
  const [feedBackArray, setFeedBackArray] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);


  // this function fetch user info
  const fetchuserInfo = async () => {

    const user = auth.currentUser;
    const uid = user.uid;

    await fetchCurrentUserInfo(uid).then((userInfo) => {

      let userJSONObj = { name: userInfo.name, image: userInfo.image === null ? profileDefaultImageUri : userInfo.image, email: userInfo.email, date: userInfo.date, phoneNumber: userInfo.phoneNumber === null ? "" : userInfo.phoneNumber };

      setCurrUserInfo(() => userJSONObj);

    }).catch(() => {

      Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });


  };

  // this useEffect fetch all data when focuse on screen
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchuserInfo()

  }, []);

  // this useEffect when add new book
  useEffect(() => {
    if (route.params?.updateUserJson) {
      let updateInfo = route.params?.updateUserJson
      if (currUserInfo.email) {
        updateInfo["email"] = currUserInfo.email
      }
      updateUser(route.params?.updateUserJson).catch(() => {

        Alert.alert("קרתה שגיה", "לא יכול לעדכן דאטה נא לנסה שוב", [{ text: "בסדר" }])
      });

      setCurrUserInfo(() => updateInfo);

      navigation.setParams({ updateUserJson: "" })

    }

  }, [route.params?.updateUserJson]);




  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : ""}

    >


      <ScrollView
        style={styles.Container}

        showsVerticalScrollIndicator={false}
      >

        <ImageBackground

          style={styles.ImageBackGround} >

        </ImageBackground>
        <View style={styles.BootomView}>
          {I18nManager.isRTL ? <FontAwesome5 style={styles.iconUserEdit2} name={"user-edit"} size={30} color={"#ff914d"} onPress={() => navigation.navigate("EditUserProfile", { userName: currUserInfo.name, image: currUserInfo.image, date: currUserInfo.date, phoneNumber: currUserInfo.phoneNumber })} /> : <FontAwesome5 style={styles.iconUserEdit} name={"user-edit"} size={30} color={"#ff914d"} onPress={() => navigation.navigate("EditUserProfile", { userName: currUserInfo.name, image: currUserInfo.image, date: currUserInfo.date, phoneNumber: currUserInfo.phoneNumber })} />}
          <View style={styles.profileImageName} >
            {currUserInfo.image ? <Image
              style={styles.imageProfile}
              source={{ uri: currUserInfo.image }}

            /> :
              <Image
                style={styles.imageProfile}
                source={{ uri: profileDefaultImageUri }}

              />

            }
            <View style = {{  flex : 1,  alignItems : 'center',}}>
            <Text style={styles.userName}> {currUserInfo.name}</Text>
            </View>
          </View>
          <View style={styles.userDetails}>
            {currUserInfo.email ? <View style={styles.Details}>
              <MaterialCommunityIcons style={styles.icon} name={"email"} size={40} color={"#ff914d"} />
              <Text style={styles.detailsFont}> {currUserInfo.email}</Text>
            </View> : null}

            {currUserInfo.phoneNumber ? <View style={styles.Details}>
              <MaterialCommunityIcons style={styles.icon} name={"phone"} size={40} color={"#ff914d"} />
              <Text style={styles.detailsFont}> {currUserInfo.phoneNumber}</Text>
            </View> : null}


            <View >
              <Button
                style={styles.ButtonClose}
                labelStyle={styles.ButtonCloseFont}
                mode="contained"
                onPress={() => navigation.navigate("FeedBack", { userId: auth.currentUser.uid })}

              >

                לראות משובים שלי
              </Button>
              <Button
                style={styles.signOutButton}
                labelStyle={styles.ButtonsignOutFont}
                mode="contained"
                onPress={() => setIsAlertVisible(true)}


              >
                התנתק

              </Button>

              {I18nManager.isRTL ? <FontAwesome name='sign-out' style={styles.iconSignOut2} size={50} color={"#ffffff"} />
                :
                <FontAwesome name='sign-out' style={styles.iconSignOut} size={50} color={"#ffffff"} />
              }
            </View>

          </View>

        </View>


        <Modal visible={isAleretVisible}>

          <View style={styles.alertContainer}>


            <View style={styles.alertContentContainer}>


              <Text style={styles.alertContentTextError}>האם אתה בטוח רוצה להתנתק?</Text>
              <Button
                style={styles.ButtonClose}
                labelStyle={styles.ButtonCloseFont}
                mode="contained"
                onPress={() => setIsAlertVisible(false)}

              >

                לסגור
              </Button>
              <Button
                style={styles.signOutButton}
                labelStyle={styles.ButtonsignOutFont}
                mode="contained"
                onPress={SignOut}
              >התנתק
              </Button>



            </View>

          </View>

        </Modal>
      </ScrollView>

    </KeyboardAvoidingView>
  );
}
