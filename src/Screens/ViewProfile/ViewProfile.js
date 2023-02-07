import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, ImageBackground } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';

import { SignOut } from "../../config/AuthDB";
import { Button } from "react-native-paper";
import BottomTab from '../../components/BottomTab/BottomTab'
import styles from "./styles";
import { fetchCurrentUserInfo } from "../../config/FireStoreDB";
import { updateUser } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { AddFriend } from "../../config/RealTimeDB";
import BackButton from "../../components/BackButton/BackButton";
import * as SMS from 'expo-sms';


export default function ViewProfile({ navigation, route }) {

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
  const [isAvailable, setIsAvailable] = useState({ value: "", error: "" });
  const smsSend = async () => {
    // const { result } = SMS.sendSMSAsync(
    //   [currUserInfo.phoneNumber], 'היי'
    // )
    // console.log("result", result)
    const uid = route.params.userId;
    AddFriend(uid).then(() => {

      navigation.navigate("ChatRoom")

    });
  }
  const fetchuserInfo = async () => {


    const uid = route.params.userId;

    fetchCurrentUserInfo(uid).then((userInfo) => {

      let userJSONObj = { name: userInfo.name, image: userInfo.image === null ? profileDefaultImageUri : userInfo.image, email: userInfo.email, date: userInfo.date, phoneNumber: userInfo.phoneNumber === null ? "" : userInfo.phoneNumber };

      setCurrUserInfo(() => userJSONObj);

    })




  };
  const isSmsAvailable = async () => {
    const checkAvailable = await SMS.isAvailableAsync()
    setIsAvailable("ASDasd", checkAvailable)
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    isSmsAvailable()
    fetchuserInfo()

    // setIsAvailable(isAvailable)
  }, [isFocused]);




  return (
    <View style={styles.Container} >
      <BackButton goBack={navigation.goBack} />
      <ImageBackground

        style={styles.ImageBackGround} >

      </ImageBackground>
      <View style={styles.BootomView}>

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
          <View>
            <Button
              style={styles.viewPostsButton}
              labelStyle={styles.buttonFont}
              mode="contained"
              onPress={() => navigation.navigate("OtherUserPost", { userId: route.params.userId })}
            >
              ספרים של {currUserInfo.name}
            </Button>
            <Ionicons name='list' style={styles.IconList} size={50} color={"#ffffff"} />
          </View>
          {isAvailable && currUserInfo.phoneNumber ? <View>

            <Button
              style={styles.ButtonSendSms}
              labelStyle={styles.buttonFont}
              mode="contained"
              onPress={smsSend}
            >
              שלח הודעה SMS
            </Button>
            <MaterialIcons name='sms' style={styles.iconSMS} size={50} color={"#ffffff"} />

          </View> : null}
        </View>


      </View>
    </View>
  );
}
