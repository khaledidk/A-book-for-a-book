import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, I18nManager, Alert } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import { MaterialIcons, Ionicons, FontAwesome, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import Checkbox from 'expo-checkbox';
import { auth } from '../../config/firebase';
import BackButton from "../../components/BackButton/BackButton";
import { Rating } from "react-native-rating-element";
import { fetchRequestHistory, fetchRequestHistoryAndUserData } from "../../config/FireStoreDB";
import BackButton2 from "../../components/BackButton2/BackButton2";
const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
export default function RequestHistory({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [requestHistoryArray, setRequestHistoryArray] = useState([]);
    let [searchRequestHistoryArray, setSearchRequestHistoryArray] = useState([])


    // this function handle the search 
    const updateListBySearch = (searchString) => {

        searchString = searchString.toLowerCase().trim();

        setSearchRequestHistoryArray(() => []);

        if (searchString === "") {
            setSearchRequestHistoryArray(() => requestHistoryArray);
            return;
        }

        let searcheableFileds = ["FirstBook_title", "SecondBook_title" , "receive_userName" , "sender_userName" , "creat_date" , "accepted_date"];

        let newBookList = [];
        let isSuitable = false;
           console.log("searchRequestHistoryArray" , searchRequestHistoryArray)
        requestHistoryArray.forEach((currBookInfoObj) => {

            isSuitable = false;
               
            for (let i = 0; i < searcheableFileds.length; i++) {
                    

                if ((currBookInfoObj[searcheableFileds[i]]).toLowerCase().includes(searchString)) {

                    newBookList.push(currBookInfoObj);
                    isSuitable = true;
                    break;
                }

            }



        });

        setSearchRequestHistoryArray(() => newBookList);

    };

    // this function display the requests on screen
    const renderItem = ({ item }) => {

        return (
            <Item title1={item.FirstBook_title} title2={item.SecondBook_title} image1={item.FirstBook_image} image2={item.SecondBook_image} sender_userImage={item.sender_userImage} sender_userName={item.sender_userName} receive_userImage={item.receive_userImage} receive_userName={item.receive_userName} creat_date={item.creat_date} accepted_date={item.accepted_date} sender_ID = {item.sender_ID} receive_ID = {item.receive_ID} />

        );
    }

    // this function to disgin the requests like cards
    const Item = ({ receive_ID , sender_ID ,title1, title2, image1, image2, sender_userImage, sender_userName, receive_userImage, receive_userName, creat_date, accepted_date }) => (
        <View style={styles.item}>
            <Text style={styles.txt}> הבקשה נוצרת: {creat_date} </Text>
            <Text style={styles.txt_accepted}> הבקשה נקבלת: {accepted_date}</Text>
            <View style={styles.itemUpper} >

            <TouchableOpacity style={styles.profile} onPress={() => PressOnUserProfileHandler(receive_ID)}  >
                    {receive_userImage ? <Image
                        style={styles.imageProfile}
                        source={{ uri: receive_userImage }}

                    /> :
                        <Image
                            source={{ uri: profileDefaultImageUri }}
                            style={styles.imageProfile}
                        />
                    }
              <View style = {{  flex : 1, }}>
  
                    <Text style={styles.title}>{receive_userName}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profile} onPress={() => PressOnUserProfileHandler(sender_ID)}  >
                    {sender_userImage ? <Image
                        style={styles.imageProfile}
                        source={{ uri: sender_userImage }}

                    /> :
                        <Image
                            source={{ uri: profileDefaultImageUri }}
                            style={styles.imageProfile}
                        />
                    }
     <View style = {{  flex : 1,  }}>
                    <Text style={styles.title}>{sender_userName}</Text>
                    </View>
                </TouchableOpacity>

               
            </View>

            <View style={styles.Books}>

                <View style={styles.Book} >
                    {image1 && <Image source={{ uri: image2 }} style={styles.imageIteam} />}
                    <Text style={styles.title}>{title2}</Text>

                </View>
                <FontAwesome size={30} name={"exchange"} color={"#ff914d"} />
                <View style={styles.Book} >
                    {image1 && <Image source={{ uri: image1 }} style={styles.imageIteam} />}
                    <Text style={styles.title}>{title1}</Text>
                </View>

            </View>



        </View>
    );
    // this function get requests index in bookRequestArray
    const getPostIndex = (PostID) => {
        console.log("req ID", PostID)
        for (let currIndex = 0; currIndex < requestHistoryArray.length; currIndex++) {
            console.log("bookRequestArray[0][currIndex]", requestHistoryArray[currIndex][0])
            if (requestHistoryArray[currIndex][0].id === PostID) {
                console.log("currIndex", currIndex)
                return currIndex;
            }
        }

        return -1;
    }




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

    // this function fetch all books requests
    const fetchAllRequestsHistory = async () => {

        setIsLoading(true)
        await fetchRequestHistoryAndUserData().then((booksList) => {

            setRequestHistoryArray(() => booksList);
            setSearchRequestHistoryArray(() => booksList)
            setIsLoading(false)

        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });
    };

    // this function fetch request on refresh flatlist then fill the bookRequestArray array and searchBookData array
    const onRefresh = async () => {


        setIsRefreshing(true);

        await fetchRequestHistoryAndUserData().then((booksList) => {

            console.log("Refreshing");

            setRequestHistoryArray(() => booksList);
            setSearchRequestHistoryArray(() => booksList)

            setIsRefreshing(false);
        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });



    }
    // this function handle when flatlist is empty
    const listEmptyComponent = () => {
        return (
            <Text style={styles.emptyFont} >לא נמצא בקשות</Text>
        )
    }


    // this useEffect fetch the data when open screen
    useEffect(() => {
        fetchAllRequestsHistory()


    }, []);



    return (
        <View style={styles.container}>
            {I18nManager.isRTL ?
                <BackButton2 goBack={navigation.goBack} />
                : <BackButton goBack={navigation.goBack} />}
            {isLoading && <OurActivityIndicator />}
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
           
            <FlatList

                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} />}
                data={searchRequestHistoryArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={listEmptyComponent}

                style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 20 : 20 }, styles.flatList]}

            />





        </View>





    );
}
