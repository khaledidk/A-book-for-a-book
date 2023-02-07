import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, Alert, Image } from 'react-native';
import styles from "./styles";
import BackButton from '../../components/BackButton/BackButton';
import * as Location from 'expo-location';
import { fetchOtherUsers } from "../../config/FireStoreDB";
import { fetchByUserId } from "../../config/FireStoreDB";
import { auth } from '../../config/firebase';
import { updateUserLoction } from "../../config/FireStoreDB";
import { fetchCurrentUserInfo } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';
import { Svg, Image as ImageSvg } from 'react-native-svg';
export default function MapUser({ navigation, route }) {
  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [otherUsersInfo, setOtherUsersInfo] = useState([])
  // const [defultImage, setDefultImage] = useState()
  const [currUserInfo, setCurrUserInfo] = useState([])
  const userLocation = async () => {
    const user = auth.currentUser;
    const uid = user.uid;


    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert('', "סירבת לאפליקציה הזו לגשת למיקום שלך, עליך לשנות זאת ולאפשר גישה על מנת לקבל ביצועים טובים יותר", [, , { text: "אישור" }]);
      return;
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

    let currUserLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    // setMarkers(() => [currUserLocation])
    await fetchCurrentUserInfo(uid).then((userInfo) => {
      userInfo["latitude"] = location.coords.latitude
      userInfo["longitude"] = location.coords.longitude
      setCurrUserInfo(() => [userInfo])
    })

    console.log("currUserInfo", currUserInfo)

    await fetchallUserLoctions();
    updateUserLoction(currUserLocation)
  }

  const fetchallUserLoctions = async () => {
    await fetchOtherUsers().then((arrayUserInfo) => {
      // setUser_info(() => arrayUserInfo)

      setOtherUsersInfo(() => []);

      arrayUserInfo.forEach((user, i) => {
        if (user.latitude && user.longitude) {


          if (i === 0) {
            setOtherUsersInfo(() => [user]);
          } else {
            setOtherUsersInfo(oldArray => [user, ...oldArray]);

          }
        }

      })
      // console.log("User_info", otherUsersInfo)


    })

  }
  const isFocused = useIsFocused();


  useEffect(() => {
    userLocation();
    // setDefultImage(profileDefaultImageUri)

  }, [])
  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      <MapView style={styles.map}
        region={mapRegion}

        provider={PROVIDER_GOOGLE}

      >

        {currUserInfo.map((user) => (
          <Marker
            key={0}
            coordinate={user}
            pinColor='blue'

          >
            <Callout onPress={() => navigation.navigate("Profile")}  >
              <View style={styles.bubble}>
                <Text style={styles.txtFont}>{user.name}</Text>


                <Svg width={100} height={100}  >
                  <ImageSvg
                    width={'100%'}
                    height={'100%'}


                    preserveAspectRatio="xMidYMid slice"
                    style={styles.image}
                    href={{ uri: !user.image ? profileDefaultImageUri : user.image }}
                  />
                </Svg>

              </View>

            </Callout>
          </Marker>
        ))}
        {otherUsersInfo.map((user, i) => (
          <Marker
            key={i + 1}
            coordinate={user}
          >
            <Callout onPress={() => navigation.navigate("ViewProfile", { userId: user.id })} >
              <View style={styles.bubble}>
                <Text style={styles.txtFont}>{user.name}</Text>


                <Svg width={100} height={100}>
                  <ImageSvg
                    width={'100%'}
                    height={'100%'}
                    preserveAspectRatio="xMidYMid slice"
                    href={{ uri: !user.image ? profileDefaultImageUri : user.image }}
                  />
                </Svg>

              </View>

            </Callout>

          </Marker>
        ))}

      </MapView>

    </View>
  );

}