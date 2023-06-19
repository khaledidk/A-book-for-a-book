import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, ImageBackground, I18nManager, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform, Linking } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import TextInput from "../../components/TextInput/TextInput";
import { Button, Modal } from "react-native-paper";

import styles from "./styles";
import { addFeedBack, fetchCurrentUserInfo, fetchCurrentUserLoction, fetchFeedBack, fetchFeedBackWithUserDetails } from "../../config/FireStoreDB";
import { updateUser } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { AddFriend } from "../../config/RealTimeDB";
import BackButton from "../../components/BackButton/BackButton";
import * as SMS from 'expo-sms';
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";

import BackButton2 from "../../components/BackButton2/BackButton2";
import { getDistance, getPreciseDistance } from 'geolib';
import { Rating } from "react-native-rating-element";
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";

export default function ViewProfile({ navigation, route }) {

  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;

  const [currUserInfo, setCurrUserInfo] = useState({ name: "", image: profileDefaultImageUri, email: "", phoneNumber: "" });
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [isAvailable, setIsAvailable] = useState({ value: "", error: "" });
  const [isCheckedYes, setisCheckedYes] = useState(false);
  const [isCheckedNo, setisCheckedNo] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [starRating, setStarRating] = useState(3)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [myData, setMyData] = useState([]); // current user data
  const [feedBackArray, setFeedBackArray] = useState([]);
  const [otherUserCor, setOtherUserCor] = useState();
  const [currUserCor, setCurrUserCor] = useState();
  const [isLoading, setIsLoading] = useState(true);
  var [pdis, setPdis] = useState(); // distance



  // this function when click on send message they route the user to singleChat page 
  const smsSend = async () => {



    const uid = route.params.userId;
    let selectedUser = {
      avatar: currUserInfo.image,
      id: uid,
      username: currUserInfo.name,

    }
    await AddFriend(uid).then((newChatroomId) => {





      navigation.navigate("SingleChat", { selectedUser: selectedUser, MyData: myData[0], chatRoomID: newChatroomId, from: "ViewProfile" })

    });
  }

  // this function fetch user info
  const fetchuserInfo = async () => {
    setIsLoading(true)

    const uid = route.params.userId;

    await fetchCurrentUserInfo(uid).then((userInfo) => {

      let userJSONObj = { name: userInfo.name, image: userInfo.image === null ? profileDefaultImageUri : userInfo.image, email: userInfo.email, date: userInfo.date, phoneNumber: userInfo.phoneNumber === null ? "" : userInfo.phoneNumber };
      console.log("currUserInfo", userInfo)
      setCurrUserInfo(() => userJSONObj);

    }).catch(() => {

      Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });;

    await fetchFeedBackWithUserDetails(uid).then((feedBackArray) => {

      setFeedBackArray(feedBackArray)

    })

    await fetchtUserNameAndImage(auth.currentUser.uid).then((userInfo) => {
      let temp = userInfo;
      console.log("temp", temp)
      temp["id"] = auth.currentUser.uid
      if (!temp.userImage) {
        temp["userImage"] = profileDefaultImageUri;
      }

      setMyData(() => [temp])
    }).catch(() => {

      Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });
    setIsLoading(false)



  };


  // this functoin calculate precise distance for current user and picker user
  const calculatePreciseDistance = async () => {
    const OtherUser = route.params.userId;
    const user = auth.currentUser;
    const currid = user.uid;

    const corOtherUser = await fetchCurrentUserLoction(OtherUser)
    const corCurrUser = await fetchCurrentUserLoction(currid)
    console.log("corOtherUser", corOtherUser)

    if (corOtherUser && corCurrUser) {
      var tempPdis = getPreciseDistance(
        { latitude: corOtherUser.latitude, longitude: corOtherUser.longitude },
        { latitude: corCurrUser.latitude, longitude: corCurrUser.longitude }
      );

      setOtherUserCor(corOtherUser)
      setCurrUserCor(corCurrUser)
      setPdis(tempPdis)
    }

  };
  const makeCall = () => {
    if (Platform.OS === 'android') {
      Linking.openURL("tel:" + currUserInfo.phoneNumber)
    } else {
      Linking.openURL("telprompt:" + currUserInfo.phoneNumber)
    }
  }



  // this function addd new deedback to picker user
  const sendFeedBack = async () => {
    const uid = route.params.userId;
    const user = auth.currentUser;
    const currid = user.uid;
    await addFeedBack(remarks, starRating, uid).then((feedBackID) => {


    }).catch(() => {

      Alert.alert("קרתה שגיה", "נכשל לטעון דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });
    setIsModelVisible(false)
  }

  // this useEffeect fetch data whem open the page
  const isFocused = useIsFocused();
  useEffect(() => {

    fetchuserInfo()
    calculatePreciseDistance();


  }, []);




  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : ""}

    >
      {isLoading ? <OurActivityIndicator /> :

        <ScrollView
          style={styles.Container}

          showsVerticalScrollIndicator={false}
        >



          {I18nManager.isRTL ?
            <BackButton2 goBack={navigation.goBack} />
            : <BackButton goBack={navigation.goBack} />}
          <ImageBackground

            style={styles.ImageBackGround} >

          </ImageBackground>


          <View style={styles.BootomView}>

            <View style={styles.profileImageName} >
              <Image
                style={styles.imageProfile}
                source={{ uri: currUserInfo.image }}

              />
              <View style={styles.nameAndFeedBack}>

                <Text style={styles.userName}> {currUserInfo.name}</Text>

                <Button
                  style={styles.ButtonFeedBack}
                  labelStyle={styles.buttonFeedBackFont}
                  mode="contained"
                  onPress={() => setIsModelVisible(true)}
                >
                  לעשות משוב

                </Button>
              </View>


            </View>
            <View style={styles.userDetails}>
              {currUserInfo.email ? <View style={styles.Details}>
                <MaterialCommunityIcons style={styles.icon} name={"email"} size={40} color={"#ff914d"} />
                <Text style={styles.detailsFont}> {currUserInfo.email}</Text>
              </View> : null}

              {currUserInfo.phoneNumber ? <TouchableOpacity style={styles.Details} onPress={makeCall}>
                <MaterialCommunityIcons style={styles.icon} name={"phone"} size={40} color={"#ff914d"} />

                <Text style={styles.detailsFont}> {currUserInfo.phoneNumber}</Text>

              </TouchableOpacity> : null}

              {otherUserCor && currUserCor ? <View style={styles.Details2}>
                <MaterialIcons style={styles.icon} name={"location-pin"} size={40} color={"#ff914d"} />
                <Text style={styles.detailsFont}> {pdis / 1000} ק"מ</Text>
                <TouchableOpacity onPress={() => navigation.navigate("OtherUserMap", { otherUserInfo: currUserInfo, otherUserCor: otherUserCor, userId: route.params.userId })}>
                  <Entypo name={"arrow-left"} size={40} color={"#ff914d"} />
                </TouchableOpacity>

              </View> : null}

              <View style={styles.buttonContiner}>
                <View style={{ width: "100%" }}>

                  <Button
                    style={styles.ButtonSendSms}
                    labelStyle={[I18nManager.isRTL && styles.buttonFont2, !I18nManager.isRTL && styles.buttonFont]}
                    mode="contained"
                    onPress={smsSend}
                  >
                    שלח הודעה

                  </Button>

                  {I18nManager.isRTL ? <MaterialIcons name='sms' style={styles.iconSMS2} size={30} color={"#ffffff"} />
                    :
                    <MaterialIcons name='sms' style={styles.iconSMS} size={30} color={"#ffffff"} />
                  }


                </View>
                <View style={{ width: "100%" }}>

                  <Button
                    style={[I18nManager.isRTL && styles.viewPostsButton2, !I18nManager.isRTL && styles.viewPostsButton]}
                    labelStyle={[I18nManager.isRTL && styles.buttonFont2, !I18nManager.isRTL && styles.buttonFont]}

                    mode="contained"
                    onPress={() => navigation.navigate("OtherUserPost", { userId: route.params.userId })}
                  >
                    ספרים של {currUserInfo.name}

                  </Button>
                  {I18nManager.isRTL ? <Ionicons name='list' style={styles.IconList2} size={30} color={"#ffffff"} />
                    :
                    <Ionicons name='list' style={styles.IconList} size={30} color={"#ffffff"} />
                  }
                </View>


              </View>
              <Button
                style={styles.ButtonClose}
                labelStyle={styles.ButtonCloseFont}
                mode="contained"
                onPress={() => navigation.navigate("FeedBack", { userId: route.params.userId })}

              >

                לראות משובים של {currUserInfo.name}
              </Button>
            </View>


          </View>




          <Modal visible={isModelVisible}>

            <View style={styles.modelContainer}>


              <View style={styles.modelContentContainer}>


                <Text style={styles.alertContentTextError}>האם בצעת החלפה עם {currUserInfo.name}?</Text>
                <View style={styles.checkboxContiner} >

                  <View style={styles.checkboxAndText}>
                    <Text style={styles.checkBoxText} >כן</Text>
                    <Checkbox
                      style={styles.checkbox} value={isCheckedYes} onValueChange={() => setisCheckedYes(!isCheckedYes) || setisCheckedNo(false)}
                    />
                  </View>
                  <View style={styles.checkboxAndText}>
                    <Text style={styles.checkBoxText} >לא</Text>
                    <Checkbox
                      style={styles.checkbox} value={isCheckedNo} onValueChange={() => setisCheckedYes(false) || setisCheckedNo(!isCheckedNo)}
                    />
                  </View>
                </View>

                {isCheckedYes &&
                  <TextInput
                    label="הערות"
                    returnKeyType="next"
                    value={remarks}
                    onChangeText={(text) => setRemarks(text)}
                    autoCapitalize="none"
                    style={styles.input}

                    underlineColor="#ddb07f"
                    mode="outlined"
                    activeOutlineColor="#ddb07f"
                    outlineColor="#ddb07f"


                  />}

                {isCheckedYes &&
                  <View style={styles.starRating}>
                    <View style={{ flex : 1}}>
                    <Text style={styles.ratingText} >הדירוג שלך ל{currUserInfo.name}:</Text>
                    </View>
                    {I18nManager.isRTL ? <Rating

                      rated={starRating}
                      totalCount={5}
                      size={23}
                      icon="ios-star"
                      direction="row-reverse"
                      onIconTap={(position) => setStarRating(position)}



                    /> :
                      <Rating

                        rated={starRating}
                        totalCount={5}
                        size={25}
                        icon="ios-star"
                        direction="row"
                        onIconTap={(position) => setStarRating(position)}



                      />


                    }

                  </View>

                }
                {isCheckedYes && <Button
                  style={styles.ButtonClose}
                  labelStyle={styles.ButtonCloseFont}
                  mode="contained"
                  onPress={sendFeedBack}

                >

                  לשלוח
                </Button>}
                <Button
                  style={styles.ButtonClose}
                  labelStyle={styles.ButtonCloseFont}
                  mode="contained"
                  onPress={() => setIsModelVisible(false)}
                >
                  לסגור
                </Button>




              </View>

            </View>

          </Modal>

        </ScrollView>}

    </KeyboardAvoidingView>
  );
}
