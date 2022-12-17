import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, ImageBackground } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';

import { SignOut } from "../../config/AuthDB";
import { Button } from "react-native-paper";
import BottomTab from '../../components/BottomTab/BottomTab'
import styles from "./styles";
import { fetchCurrentUserInfo } from "../../config/FireStoreDB";
import { updateUser } from "../../config/FireStoreDB";


export default function Profile({ navigation, route }) {

  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
  const [isEdite, setIsEdite] = useState(false);
  const [currUserInfo, setCurrUserInfo] = useState({ name: "", image: profileDefaultImageUri, email: "", phoneNumber: "" });
  const [bookTypesVal, setBookTypesVal] = useState("")
  const [bookTypesError, setBookTypesError] = useState(false)
  const [openTypeDrop, setOpenTypeDrop] = useState(false)
  const [bookStatusVal, setBookStatusVal] = useState("")
  const [bookStatusError, setBookStatusError] = useState(false)
  const [openStatusDrop, setOpenStatusDrop] = useState(false)
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false)
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [authorName, setAuthorName] = useState({ value: "", error: "" });
  useEffect(() => {

    fetchCurrentUserInfo().then((userInfo) => {

      let userJSONObj = { name: userInfo.name, image: userInfo.image === null ? profileDefaultImageUri : userInfo.image, email: userInfo.email, date: userInfo.date, phoneNumber: userInfo.phoneNumber === null ? "" : userInfo.phoneNumber };

      setCurrUserInfo(() => userJSONObj);

      console.log(currUserInfo)
    })
  }, []);
  useEffect(() => {
    if (route.params?.updateUserJson) {
      let updateInfo = route.params?.updateUserJson
      updateInfo["email"] = currUserInfo.email
      setCurrUserInfo(() => updateInfo);
      updateUser(route.params?.updateUserJson)



    }



  }, [route.params?.updateUserJson]);

  const HandlerUserEdit = () => {
    setIsEdite(!isEdite)
    setUserName(currUserInfo.name)

  }


  return (
    <View style={styles.Container} >
      <ImageBackground

        style={styles.ImageBackGround} >

      </ImageBackground>
      <View style={styles.BootomView}>
        <FontAwesome5 style={styles.iconUserEdit} name={"user-edit"} size={30} color={"#ff914d"} onPress={() => navigation.navigate("EditUserProfile", { userName: currUserInfo.name, image: currUserInfo.image, date: currUserInfo.date, phoneNumber: currUserInfo.phoneNumber })} />
        <View style={styles.profileImageName} >
          <Image
            style={styles.imageProfile}
            source={{ uri: currUserInfo.image }}

          />
          <Text style={styles.userName}> {currUserInfo.name}</Text>

        </View>
        <View style={styles.userDetails}>
          <View style={styles.Details}>
            <MaterialCommunityIcons style={styles.icon} name={"email"} size={40} color={"#ff914d"} />
            <Text style={styles.detailsFont}> {currUserInfo.email}</Text>
          </View>

          {currUserInfo.phoneNumber ? <View style={styles.Details}>
            <MaterialCommunityIcons style={styles.icon} name={"phone"} size={40} color={"#ff914d"} />
            <Text style={styles.detailsFont}> {currUserInfo.phoneNumber}</Text>
          </View> : null}

          <View style={styles.Details}>
            <Entypo name='calendar' style={styles.icon} size={40} color={"#ff914d"} />
            <Text style={styles.detailsFont}> {currUserInfo.date}</Text>
          </View>

        </View>
        <Button
          style={styles.signOutButton}
          labelStyle={styles.ButtonsignOutFont}
          mode="contained"
          onPress={SignOut}
        >התנתק
        </Button>
      </View>
    </View>
  );
}
