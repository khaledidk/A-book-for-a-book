import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, I18nManager } from "react-native";
import styles from "./styles";
import BackButton from "../../components/BackButton/BackButton";
import { auth } from "../../config/firebase";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import BackButton2 from "../../components/BackButton2/BackButton2";

export default function Item({ navigation, route }) {

    const [isModelVisible, setIsModelVisible] = useState(false);
    const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;

    useEffect(() => {

        console.log("asd", route.params.item.rating_value2
        )

    }, [])


    // this function handler navigation when press on user profile
    const PressOnUserProfileHandler = (userId) => {
        const user = auth.currentUser;
        const uid = user.uid;
        console.log("userid", userId)
        if (uid == userId) {
            navigation.navigate("Profile")
        } else {

            navigation.navigate("ViewProfile", { userId: userId })
        }
    }

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : ""}

        >

            <ScrollView
                style={styles.container}

                showsVerticalScrollIndicator={false}
            >


                {I18nManager.isRTL ?
                    <BackButton2 goBack={navigation.goBack} />
                    : <BackButton goBack={navigation.goBack} />}

                <ImageBackground

                    style={styles.ImageBackGround} >

                </ImageBackground>
                <View style={styles.BootomView}>

                    {!route.params.item.bookId2 ?

                        <View style={styles.item} >
                            <View style={styles.itemUpperPart} >
                                <TouchableOpacity style={styles.userNameAndImage} onPress={() => PressOnUserProfileHandler(route.params.item.user_id)}>
                                    <Text style={styles.userName}> {route.params.item.user_name} </Text>
                                    {route.params.item.user_image ? <Image
                                        style={styles.imageProfile}
                                        source={{ uri: route.params.item.user_image }}

                                    /> :
                                        <Image
                                            source={{ uri: profileDefaultImageUri }}
                                            style={styles.imageProfile}
                                        />
                                    }

                                </TouchableOpacity>

                                {route.params.item.status || route.params.item.user_id === auth.currentUser.uid ? null : <TouchableOpacity onPress={() => navigation.navigate("ChooseBookToChange", { user_id: route.params.item.user_id, firstBook_id: route.params.item.id })} >
                                    <FontAwesome size={30} name={"exchange"} color={"#ff914d"} />
                                </TouchableOpacity>}

                            </View>

                            <View style={styles.imageAndDetails} >
                                {route.params.item.image && <Image source={{ uri: route.params.item.image }} style={styles.imageIteam} />}
                                <View style={styles.details}>
                                    <Text style={styles.title}>{route.params.item.title} </Text>
                                    <Text style={styles.txt}>שם הסופר: {route.params.item.author_name}</Text>
                                    <Text style={styles.txt}>סוג הספר: {route.params.item.book_type}</Text>
                                    <Text style={styles.txt}>מצב הספר: {route.params.item.book_status}</Text>
                                    <Text style={styles.txt}>שפת הספר: {route.params.item.book_language}</Text>
                                    <View style={styles.starRating}>
                                    <Image
                                            style={styles.imageStar}
                                            source={require("../../../assets/star.png")}
                                        />
                                        <View style={styles.ratingFontContiner}>
                                        <Text style={styles.txt} >/5</Text>
                                            <Text style={styles.ratingFont}> {route.params.item.rating_value} </Text>
                                           
                                        </View>
                                     
                                    </View>
                                </View>
                            </View>
                        </View> :
                        <View style={styles.item} >
                            <View style={styles.itemUpperPart} >
                                <TouchableOpacity style={styles.userNameAndImage} onPress={() => PressOnUserProfileHandler(route.params.item.user_id)}>
                                    <Text style={styles.userName}> {route.params.item.user_name2} </Text>
                                    {route.params.item.user_image ? <Image
                                        style={styles.imageProfile}
                                        source={{ uri: route.params.item.user_image }}

                                    /> :
                                        <Image
                                            source={{ uri: profileDefaultImageUri }}
                                            style={styles.imageProfile}
                                        />
                                    }

                                </TouchableOpacity>



                            </View>
                            <View style={styles.imageAndDetails} >
                                {route.params.item.image2 && <Image source={{ uri: route.params.item.image2 }} style={styles.imageIteam} />}
                                <View style={styles.details}>
                                    <Text style={styles.title}>{route.params.item.title2} </Text>
                                    <Text style={styles.txt}>שם הסופר: {route.params.item.author_name2}</Text>
                                    <Text style={styles.txt}>סוג הספר: {route.params.item.book_type2}</Text>
                                    <Text style={styles.txt}>מצב הספר: {route.params.item.book_status2}</Text>
                                    <Text style={styles.txt}>שפת הספר: {route.params.item.book_language2}</Text>
                                    <View style={styles.starRating}>
                                        <Image
                                            style={styles.imageStar}
                                            source={require("../../../assets/star.png")}
                                        />

                                        <View style={styles.ratingFontContiner}>
                                        <Text style={styles.txt} >/5</Text>
                                            <Text style={styles.ratingFont}> {route.params.item.rating_value2}</Text>
                                          
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                    }





                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}
