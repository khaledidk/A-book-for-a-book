import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, I18nManager, Keyboard, Alert } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import { MaterialIcons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { Rating } from 'react-native-ratings';
import { fetchByUserId, fetchFeedBackWithUserDetails } from "../../config/FireStoreDB";
import { auth } from '../../config/firebase';
import BackButton from "../../components/BackButton/BackButton";
import BackButton2 from "../../components/BackButton2/BackButton2";

export default function FeedBack({ navigation, route }) {
    const [feedBackArray, setFeedBackArray] = useState([]);// flatlist array and search
    const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
    let [searchfeedBackArray, setSearchfeedBackArray] = useState([])// flatlist array and search
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // this function handler navigation when press on user profile
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

    // this function display the books on screen
    const renderItem = ({ item }) => {
        return (
            <Item remarks={item.Remarks} rating={item.rating} userName={item.user_name} userImage={item.user_image} currUserID={item.currUserID} />

        );
    }

    // this function to disgin the books and books details like cards
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

    // this function fetch books on refresh flatlist then fill the feedBackArray array and searchfeedBackArray array 
    const onRefresh = async () => {

        const uid = route.params.userId;


        await fetchFeedBackWithUserDetails(uid).then((feedBackArray) => {

            setIsRefreshing(false);
            setFeedBackArray(feedBackArray)
            setSearchfeedBackArray(feedBackArray)
        }).catch(() => {

            Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;
    }

    // this function fetch the feedBack for specific user
    const fetchFeedBack = async () => {

        const uid = route.params.userId;
        await fetchFeedBackWithUserDetails(uid).then((feedBackArray) => {
            console.log("feedBackArray", feedBackArray)
            setFeedBackArray(feedBackArray)
            setSearchfeedBackArray(feedBackArray)

        }).catch(() => {

            Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;
    }

    // this function handle the search 
    const updateListBySearch = (searchString) => {

        searchString = searchString.toLowerCase().trim();


        setSearchfeedBackArray(() => [])

        if (searchString === "") {
            setSearchfeedBackArray(feedBackArray)
            return;
        }

        let searcheableFileds = ["user_name", "Remarks"];
        let newFeedBackList = [];
        let isSuitable = false;

        feedBackArray.forEach((currFeedBackInfoObj) => {

            isSuitable = false;

            for (let i = 0; i < searcheableFileds.length; i++) {

                if ((currFeedBackInfoObj[searcheableFileds[i]]).toLowerCase().includes(searchString)) {

                    newFeedBackList.push(currFeedBackInfoObj);
                    isSuitable = true;
                    break;
                }
            }



        });

        setSearchfeedBackArray(() => newFeedBackList)

    };

      // this function handle when flatlist is empty
  const listEmptyComponent = () => {
    return (
        <Text style={styles.emptyFont} >לא נמצא משובים</Text>
    )
}


    // this useEffect fetch the data when open screen
    useEffect(() => {

        setIsLoading(() => true);

        fetchFeedBack().then(() => {

            setIsLoading(() => false);
        }).catch(() => {

            Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;


    }, []);




    return (
        <View style={styles.container}>
            {isLoading && <OurActivityIndicator />}
            <View>
                <TextInput
                    //ddb07f
                    underlineColor="ff914d"
                    mode="outlined"
                    activeOutlineColor="#ff914d"
                    outlineColor="#ff914d"
                    style={[!I18nManager.isRTL && styles.SearchInput, I18nManager.isRTL && styles.SearchInput2]}
                    onChangeText={(searchString) => { updateListBySearch(searchString) }}
                    placeholder="חיפוש"
                    // textColor = "#ddb07f"
                    placeholderTextColor="#ddb07f"
                />


                <MaterialIcons style={[!I18nManager.isRTL && styles.searchIcon, I18nManager.isRTL && styles.searchIcon2]} name={"search"} size={30} color={"#ddb07f"} />
            </View>

            {I18nManager.isRTL ?
                <BackButton2 goBack={navigation.goBack} />
                : <BackButton goBack={navigation.goBack} />}
             <FlatList

                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />}
                data={searchfeedBackArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent = {listEmptyComponent}

                style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 20 : 20 }, styles.flatList]}

            />


        </View>
    );
}
