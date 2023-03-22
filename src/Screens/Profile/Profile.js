import React, { useState, useEffect } from "react";
import { FlatList, Text, View, Image, TouchableOpacity, ImageBackground , RefreshControl } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';

import { SignOut } from "../../config/AuthDB";
import { Button } from "react-native-paper";
import BottomTab from '../../components/BottomTab/BottomTab'
import styles from "./styles";
import { fetchCurrentUserInfo } from "../../config/FireStoreDB";
import { updateUser } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../config/firebase';
import { Modal } from "react-native-paper";
import { Rating } from 'react-native-ratings';
import { fetchFeedBackWithUserDetails } from "../../config/FireStoreDB";

export default function Profile({ navigation, route }) {

  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
  const [isEdite, setIsEdite] = useState(false);
  const [currUserInfo, setCurrUserInfo] = useState({ name: "", image: profileDefaultImageUri, email: "", phoneNumber: "" });
  const [userName, setUserName] = useState({ value: "", error: "" });
  const [isAleretVisible, setIsAlertVisible] = useState(false);
  const [feedBackArray, setFeedBackArray] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  const fetchuserInfo = async () => {

    const user = auth.currentUser;
    const uid = user.uid;

   await fetchCurrentUserInfo(uid).then((userInfo) => {

      let userJSONObj = { name: userInfo.name, image: userInfo.image === null ? profileDefaultImageUri : userInfo.image, email: userInfo.email, date: userInfo.date, phoneNumber: userInfo.phoneNumber === null ? "" : userInfo.phoneNumber };

      setCurrUserInfo(() => userJSONObj);

    })

    await fetchFeedBackWithUserDetails(uid).then((feedBackArray) => {
      console.log("feedBackArray", feedBackArray)
      setFeedBackArray(feedBackArray)

    })


  };

  const onRefresh = async () => {


    const user = auth.currentUser;
    const uid = user.uid;
    setIsRefreshing(true);

    await fetchFeedBackWithUserDetails(uid).then((feedBackArray) => {

      setIsRefreshing(false);
      setFeedBackArray(feedBackArray)

    })
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    fetchuserInfo()
    
  }, []);
  useEffect(() => {
    if (route.params?.updateUserJson) {
      let updateInfo = route.params?.updateUserJson
      updateInfo["email"] = currUserInfo.email
     
      setCurrUserInfo(() => updateInfo);
      updateUser(route.params?.updateUserJson)
      navigation.setParams({ updateUserJson: "" })

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

          {/* <View style={styles.Details}>
            <Entypo name='calendar' style={styles.icon} size={40} color={"#ff914d"} />
            <Text style={styles.detailsFont}> {currUserInfo.date}</Text>
          </View> */}
          <View>
            <Button
              style={styles.signOutButton}
              labelStyle={styles.ButtonsignOutFont}
              mode="contained"
              onPress={() => setIsAlertVisible(true)}
            >התנתק

            </Button>
{/* 
            <Button
              style={styles.mapButton}
              labelStyle={styles.ButtonsignOutFont}
              mode="contained"
              onPress={() => navigation.navigate('Map')}
            >map

            </Button> */}
            <FontAwesome name='sign-out' style={styles.iconSignOut} size={50} color={"#ffffff"} />
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
    </View>
  );
}
