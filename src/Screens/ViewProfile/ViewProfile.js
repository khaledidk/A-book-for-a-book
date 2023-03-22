import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, ImageBackground, RefreshControl, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import TextInput from "../../components/TextInput/TextInput";
import { Button, Modal } from "react-native-paper";
import BottomTab from '../../components/BottomTab/BottomTab'
import styles from "./styles";
import { addFeedBack, fetchCurrentUserInfo, fetchCurrentUserLoction, fetchFeedBack, fetchFeedBackWithUserDetails } from "../../config/FireStoreDB";
import { updateUser } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { AddFriend } from "../../config/RealTimeDB";
import BackButton from "../../components/BackButton/BackButton";
import * as SMS from 'expo-sms';
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";
import { Rating } from 'react-native-ratings';
import { getDistance, getPreciseDistance } from 'geolib';

export default function ViewProfile({ navigation , route }) {

  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;

  const [currUserInfo, setCurrUserInfo] = useState({ name: "", image: profileDefaultImageUri, email: "", phoneNumber: "" });
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [isAvailable, setIsAvailable] = useState({ value: "", error: "" });
  const [isCheckedYes, setisCheckedYes] = useState(false);
  const [isCheckedNo, setisCheckedNo] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [starRating, setStarRating] = useState(3)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [myData, setMyData] = useState({});
  const [feedBackArray, setFeedBackArray] = useState([]);
  var [pdis , setPdis] = useState();

  const renderItem = ({ item }) => {
    return (
      <Item remarks={item.Remarks} rating={item.rating} userName={item.user_name} userImage={item.user_image} currUserID={item.currUserID} />

    );
  }
  const Item = ({ remarks, rating, userName, userImage, currUserID }) => (
    <View>
      <View style={styles.item} >
        <TouchableOpacity style={styles.userNameAndImage} onPress={() => PressOnUserProfileHandler(currUserID)}>
          <Text style={styles.otherUserName}> {userName} </Text>
          {userImage ? <Image
            style={styles.imageProfileOtherUser}
            source={{ uri: userImage }}

          /> :
            <Image
              source={{ uri: profileDefaultImageUri }}
              style={styles.imageProfileOtherUser}
            />
          }

        </TouchableOpacity>


        <View style={styles.details}>

          <Text style={styles.txt}>הערות: {remarks}</Text>
          <View style={styles.starRating}>
            <Text style={styles.ratingText} >הדירוג:</Text>
            <Rating
              startingValue={rating}
              ratingCount={5}
              imageSize={30}
              readonly={true}
            />

          </View>
        </View>




      </View>

    </View>
  );
  const PressOnUserProfileHandler = (userId) => {
    const user = auth.currentUser;
    const uid = user.uid;
    console.log("result", userId, uid)
    if (uid === userId) {
      navigation.navigate("Profile")
    } else {
      navigation.push("ViewProfile", { userId: userId }) 
     
    }
  }
  const smsSend = async () => {
  

    console.log("my data", myData);
    const uid = route.params.userId;
    let selectedUser = {
      avatar: currUserInfo.image,
      id: uid,
      username: currUserInfo.name,

    }
    await AddFriend(uid).then((newChatroomId) => {


      console.log("newChatroomId", newChatroomId)



      navigation.navigate("SingleChat", { selectedUser: selectedUser, MyData: myData, chatRoomID: newChatroomId })

    });
  }
  const fetchuserInfo = async () => {


    const uid = route.params.userId;

    await fetchCurrentUserInfo(uid).then((userInfo) => {

      let userJSONObj = { name: userInfo.name, image: userInfo.image === null ? profileDefaultImageUri : userInfo.image, email: userInfo.email, date: userInfo.date, phoneNumber: userInfo.phoneNumber === null ? "" : userInfo.phoneNumber };

      setCurrUserInfo(() => userJSONObj);

    })

    await fetchFeedBackWithUserDetails(uid).then((feedBackArray) => {
     
      setFeedBackArray(feedBackArray)

    })

    await fetchtUserNameAndImage(auth.currentUser.uid).then((userInfo) => {
      userInfo["id"] = auth.currentUser.uid
      setMyData(userInfo)
    })




  };
  const isSmsAvailable = async () => {
    const checkAvailable = await SMS.isAvailableAsync()
    setIsAvailable("ASDasd", checkAvailable)
  }
 
  const calculatePreciseDistance = async () => {
    const OtherUser = route.params.userId;
    const user = auth.currentUser;
    const currid = user.uid;
    const corOtherUser = await fetchCurrentUserLoction(OtherUser)
    const corCurrUser = await fetchCurrentUserLoction(currid)
    var tempPdis = getPreciseDistance(
      { latitude: corOtherUser.latitude, longitude: corOtherUser.longitude },
      { latitude: corCurrUser.latitude, longitude: corCurrUser.longitude }
    );
    setPdis(tempPdis)
  
  };
  const onRefresh = async () => {


    const uid = route.params.userId;
    setIsRefreshing(true);

    await fetchFeedBackWithUserDetails(uid).then((feedBackArray) => {

      setIsRefreshing(false);
      setFeedBackArray(feedBackArray)

    })
  }

  const sendFeedBack = async () => {
    const uid = route.params.userId;
    const user = auth.currentUser;
    const currid = user.uid;
    await addFeedBack(remarks, starRating, uid).then((feedBackID) => {
      let newFeedBackJson = {
        id: feedBackID,
        Remarks: remarks,
        rating: starRating,
        user_name: myData.userName,
        user_image: myData.userImage,
        user_id: uid,
        currUserID: currid,
      }
      if (feedBackArray.length == 0) {
        setFeedBackArray([newFeedBackJson]);

      } else {
        setFeedBackArray((old) => [...old, newFeedBackJson]);
      }

    })
    setIsModelVisible(false)
  }

  const isFocused = useIsFocused();
  useEffect(() => {
    isSmsAvailable()
    fetchuserInfo()
    calculatePreciseDistance();

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
          <View style={styles.nameAndFeedBack}>
            <Text style={styles.userName}> {currUserInfo.name}</Text>

            <Button
              style={styles.ButtonFeedBack}
              labelStyle={styles.buttonFeedBackFont}
              mode="contained"
              onPress={() => setIsModelVisible(true)}
            >
              משוב החלפה

            </Button>
          </View>


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
            <MaterialIcons style={styles.icon} name={"location-pin"} size={40} color={"#ff914d"} /> 
            <Text style={styles.detailsFont}> {pdis / 1000} ק"מ</Text>

           </View>

          <View style={styles.buttonContiner}>
            <View>

              <Button
                style={styles.viewPostsButton}
                labelStyle={styles.buttonFont}
                mode="contained"
                onPress={() => navigation.navigate("OtherUserPost", { userId: route.params.userId })}
              >
                ספרים של {currUserInfo.name}

              </Button>
              <Ionicons name='list' style={styles.IconList} size={30} color={"#ffffff"} />
            </View>
            <View>

              <Button
                style={styles.ButtonSendSms}
                labelStyle={styles.buttonFont}
                mode="contained"
                onPress={smsSend}
              >
                שלח הודעה

              </Button>

              <MaterialIcons name='sms' style={styles.iconSMS} size={30} color={"#ffffff"} />


            </View>
          </View>
        </View>


      </View>
      {feedBackArray.length ? <Text style = {styles.feedBackLebal}>מושבים:</Text> : null}
      <FlatList

        refreshControl={<RefreshControl
          colors={["#ff914d", "#ff914d"]}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
        />}
        data={feedBackArray}
        renderItem={renderItem}
        keyExtractor={item => item.id}


        style={styles.flatList}

      />
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
                <Text style={styles.ratingText} >הדירוג שלך ל{currUserInfo.name}:</Text>
                <Rating

                  startingValue={3}
                  ratingCount={5}
                  imageSize={30}


                  onFinishRating={setStarRating}

                />

              </View>

            }
            <Button
              style={styles.ButtonClose}
              labelStyle={styles.ButtonCloseFont}
              mode="contained"
              onPress={sendFeedBack}

            >

              לשלוח
            </Button>
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
    </View>
  );
}
