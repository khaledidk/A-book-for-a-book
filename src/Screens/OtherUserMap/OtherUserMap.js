import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, Alert, Image, I18nManager } from 'react-native';
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { fetchCurrentUserAllInfo } from '../../config/FireStoreDB';
import { Svg, Image as ImageSvg } from 'react-native-svg';
import { auth } from '../../config/firebase';
import styles from "./styles";
import BackButton2 from "../../components/BackButton2/BackButton2";
import BackButton from "../../components/BackButton/BackButton";
export default function OtherUserMap({ navigation, route }) {
    const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
    const [currUserInfo, setCurrUserInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [otherUsersInfo, setOtherUsersInfo] = useState([])

    // this function fetch the user data and loction
    const fetchData = async () => {
        const user = auth.currentUser;
        const uid = user.uid;

        let temp = {
            latitude: route.params.otherUserCor.latitude,
            longitude: route.params.otherUserCor.longitude,
            email: route.params.otherUserInfo.email,
            image: route.params.otherUserInfo.image,
            name: route.params.otherUserInfo.name,
            phoneNumber: route.params.otherUserInfo.phoneNumber,
        }
        // temp = route.params.otherUserInfo;
        // if (!route.params.otherUserInfo.latitude && !route.params.otherUserInfo.latitude) {
        // temp["latitude"] = route.params.otherUserCor.longitude
        // temp["longitude"] = route.params.otherUserCor.longitude
        // }

        console.log("route.params.otherUserCor", route.params.otherUserCor)
        console.log("route.params.otherUserInfo", route.params.otherUserInfo)
        console.log("temp", temp)
        setOtherUsersInfo(() => [temp])
        await fetchCurrentUserAllInfo(uid).then((userInfo) => {
            console.log("user info =======", userInfo);
            setMapRegion({
                latitude: userInfo.latitude,
                longitude: userInfo.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            setCurrUserInfo(() => [userInfo])
            setIsLoading(() => false)


        }).catch(() => {
            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;
    }


    useEffect(() => {

        fetchData()
        navigation.setParams({ otherUserInfo: "" })
        navigation.setParams({ otherUserCor: "" })
    }, [])
    return (


        <View style={styles.container}>
            {isLoading && <OurActivityIndicator />}
            {I18nManager.isRTL ?
                <BackButton2 goBack={navigation.goBack} />
                : <BackButton goBack={navigation.goBack} />}
            {!isLoading && <MapView style={styles.map}
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
                                <Text style={styles.txtFont}>אני</Text>


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
                        <Callout onPress={() => navigation.navigate("ViewProfile", { userId: route.params.userId })} >
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
                ))
                }
            </MapView>}


        </View>


    );

}
