import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import BackButton from "../../components/BackButton/BackButton";


import TextInput from "../../components/TextInput/TextInput";
import { MaterialIcons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { checkBook, fetchByUserId } from "../../config/FireStoreDB";
import { auth } from "../../config/firebase";
import { I18nManager } from "react-native";
import BackButton2 from "../../components/BackButton2/BackButton2";

export default function OtherUserPost({ navigation, route }) {


    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [keyboardOpen, setKeyboardOpen] = useState(false);
    let [searchBookData, setSearchBookData] = useState([])



    // this function display the users on screen
    const renderItem = ({ item }) => {
        return (
            <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} id={item.id} />

        );
    }
    const checkBookExists = async (userId, id) => {
        let check = await checkBook(id)
    
        if (check == true) {
          navigation.navigate("ChooseBookToChange", { user_id: userId, firstBook_id: id })
        } else {
          Alert.alert("לצערי", "את/ה לא יכול לחליף עם הספר הזה כי הוא נמחק", [{ text: "בסדר" }])
        }
      }

    // this function to disgin the books and books details like cards
    const Item = ({ title, author, type, status, image, id }) => (
        <View style={styles.item}>



            {route.params.userId === auth.currentUser.uid ? null : <TouchableOpacity onPress={() => checkBookExists(route.params.userId,  id)} >
                <FontAwesome size={30} name={"exchange"} color={"#ff914d"} />
            </TouchableOpacity>}
            <View style={styles.itemImageAndeDerails} >
                {image && <Image source={{ uri: image }} style={styles.imageIteam} />}
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.txt}>שם הסופר: {author}</Text>
                    <Text style={styles.txt}>סוג הספר: {type}</Text>
                    <Text style={styles.txt}>מצב הספר: {status}</Text>
                </View>
            </View>

        </View>
    );


    // this function fetch all book for specific user
    const fetchAllBooksDocuments = async () => {

        const uid = route.params.userId
        setSearchBookData([])
        setBookData([])
        await fetchByUserId(uid).then((booksList) => {

            setBookData(() => booksList);
            setSearchBookData(() => booksList)
        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;



    };

    // this function fetch books on refresh flatlist then fill the bookRequestArray array and searchBookData array
    const onRefresh = async () => {



        setIsRefreshing(true);

        fetchAllBooksDocuments().then(() => {
            console.log("Refreshing");
            setIsRefreshing(false);
        });
    }

    // this function handle the search 
    const updateListBySearch = (searchString) => {

        searchString = searchString.toLowerCase().trim();

        setSearchBookData(() => []);

        if (searchString === "") {
            setSearchBookData(() => bookData);
            return;
        }

        let searcheableFileds = ["title", "author_name", "book_type", "book_status"];
        let newBookList = [];
        let isSuitable = false;

        bookData.forEach((currBookInfoObj) => {

            isSuitable = false;

            for (let i = 0; i < searcheableFileds.length; i++) {

                if ((currBookInfoObj[searcheableFileds[i]]).toLowerCase().includes(searchString)) {

                    newBookList.push(currBookInfoObj);
                    isSuitable = true;
                    break;
                }
            }



        });

        setSearchBookData(() => newBookList);

    };
      // this function handle when flatlist is empty
  const listEmptyComponent = () => {
    return (
        <Text style={styles.emptyFont} >לא נמצא ספרים</Text>
    )
}


    // this useEffect fetch the data when open screen
    useEffect(() => {




        if (route.params?.status !== 'update' && route.params?.status !== 'end') {

            setIsLoading(() => true);

            fetchAllBooksDocuments().then(() => {

                setIsLoading(() => false);
            });

        } else {
            navigation.setParams({ status: "" })
        }




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
                //  onRefresh={onRefresh}
                //  refreshing={isRefreshing}
                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} />}
                data={searchBookData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent = {listEmptyComponent}

                style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 20 : 20 }, styles.flatList]}

            />



        </View>
    );
}
