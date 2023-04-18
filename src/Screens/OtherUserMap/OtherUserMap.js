import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, Alert, Image } from 'react-native';
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { fetchCurrentUserAllInfo } from '../../config/FireStoreDB';
import { Svg, Image as ImageSvg } from 'react-native-svg';
import { auth } from '../../config/firebase';
import styles from "./styles";
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
    const fetchData = async () => {
        const user = auth.currentUser;
        const uid = user.uid;
        console.log("route.params.otherUserInfo", route.params.otherUserInfo)
        const temp = route.params.otherUserInfo;
        temp["latitude"] = route.params.otherUserCor.latitude
        temp["longitude"] = route.params.otherUserCor.longitude
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
        })
    }
    // const isFocused = useIsFocused();


    useEffect(() => {

        fetchData()


    }, [])
    return (


        <View style={styles.container}>
            {isLoading && <OurActivityIndicator />}
            <BackButton goBack={navigation.goBack} />
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
