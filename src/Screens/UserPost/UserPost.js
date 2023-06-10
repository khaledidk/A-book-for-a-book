import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, I18nManager, Alert } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

import TextInput from "../../components/TextInput/TextInput";
import { MaterialIcons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { fetchBookSorted } from "../../config/FireStoreDB";
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { fetchByUserId } from "../../config/FireStoreDB";
import { auth } from '../../config/firebase';
import { deletePost } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';

export default function UserPost({ navigation, route }) {

    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [status, setStatus] = useState("");
    const [Startstatus, setStartStatus] = useState(false);
    const [CurrId, setCurrId] = useState("");
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    let [searchBookData, setSearchBookData] = useState([])
    const [isAleretVisible, setIsAlertVisible] = useState(false);


    // this function handle to delete post
    const delete_post_handler = () => {
        console.log("delet id =>>", CurrId, "index ==>", getPostIndex(CurrId))
        bookData.splice(getPostIndex(CurrId), 1);
        setBookData(() => bookData);
        setSearchBookData(() => bookData)
        deletePost(CurrId).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל למחוק הספר נא לנסה שוב", [{ text: "בסדר" }])
        });
        setIsAlertVisible(false)

    }

    // this function return index of post in array 
    const getPostIndex = (PostID) => {

        for (let currIndex = 0; currIndex < bookData.length; currIndex++) {

            if (bookData[currIndex].id === PostID) {
                return currIndex;
            }
        }

        return -1;
    }

    // this function return the books in homr page
    const renderItem = ({ item }) => {
        return (
            <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} id={item.id} language={item.book_language} starRating={item.rating_value} />

        );
    }

    // this function to disgin the books and books details like cards
    const Item = ({ title, author, type, status, image, id, language, starRating }) => (
        <View style={styles.item}>

            {/* <View style={styles.firstPartItem}> */}

            <View style={styles.itemIcons}>
                <TouchableOpacity onPress={() => setIsAlertVisible(true) || setCurrId(id)} >
                    <Ionicons name={"trash-outline"} size={28} color={"red"} />
                </TouchableOpacity>

                <FontAwesome style={styles.Icons} name={"edit"} size={30} color={"#ff914d"} onPress={() => navigation.navigate('EditPost', { title: title, author: author, type: type, status: status, image: image, id: id, language: language, starRating: starRating })} />

            </View>
            {/* </View> */}


            <View style={styles.itemImageAndeDerails} >
                {image && I18nManager.isRTL ? <Image source={{ uri: image }} style={styles.imageIteam2} /> : null}
                {image && !I18nManager.isRTL ? <Image source={{ uri: image }} style={styles.imageIteam} /> : null}
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.txt}>שם הסופר: {author}</Text>
                    <Text style={styles.txt}>סוג הספר: {type}</Text>
                    <Text style={styles.txt}>מצב הספר: {status}</Text>
                    <Text style={styles.txt}>שפת הספר: {language}</Text>
                    <View style={styles.starRating}>
                        <Image
                            style={styles.imageStar}
                            source={require("../../../assets/star.png")}
                        />
                        <View style={styles.ratingFontContiner}>

                            <Text style={styles.txt} >/5</Text>
                            <Text style={styles.ratingFont}> {starRating} </Text>

                        </View>

                    </View>
                </View>
            </View>

        </View>
    );


    // this function fetch all books then fill the bookData array and searckBookData array 
    const fetchAllBooksDocuments = async () => {
        const user = auth.currentUser;
        const uid = user.uid;
        setSearchBookData([])
        setBookData([])
        await fetchByUserId(uid).then((booksList) => {

            setBookData(() => booksList);
            setSearchBookData(() => booksList)
        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;



    };



    // this function fetch books on refresh flatlist then fill the bookData array and searckBookData array
    const onRefresh = async () => {

        setIsRefreshing(true);

        fetchAllBooksDocuments().then(() => {
            console.log("Refreshing");
            setIsRefreshing(false);
        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
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

        let searcheableFileds = ["title", "author_name", "book_type", "book_status", "book_language"];
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

    const isFocused = useIsFocused();
    // this useEffect when open the screen
    useEffect(() => {


        if (route.params?.status !== 'update' && route.params?.status !== 'end') {

            setIsLoading(() => true);

            fetchAllBooksDocuments().then(() => {

                setIsLoading(() => false);
            }).catch(() => {

                Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
            });

        } else {
            navigation.setParams({ status: "" })
        }




    }, [isFocused]);

    // this use effect when add new book
    useEffect(() => {
        if (route.params?.updateBookJson) {

            console.log("============== enter update local =======")
            let updatedInfo = route.params?.updateBookJson;

            bookData.splice(getPostIndex(updatedInfo.id), 1, updatedInfo);

            updateListBySearch("")


            console.log("book:", bookData)
            navigation.setParams({ status: "end" })
            navigation.setParams({ updateBookJson: "" })


        }

    }, [route.params?.updateBookJson])


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
            <View style={{ flexDirection: "column", justifyContent: 'center', }} >
                <Button
                    style={styles.ChangeRequestButton}
                    labelStyle={styles.ChangeRequestButtonText}
                    mode="Outlined"
                    onPress={() => navigation.navigate("ChangeRequest")}>
                    הבקשות שמגיעות אלי
                </Button>
                <Button
                    style={styles.ChangeRequestButton}
                    labelStyle={styles.ChangeRequestButtonText}
                    mode="Outlined"
                    onPress={() => navigation.navigate("MyChangeRequest")}>
                    הבקשות שאני מציע
                </Button>
                <Button
                    style={styles.ChangeRequestButton}
                    labelStyle={styles.ChangeRequestButtonText}
                    mode="Outlined"
                    onPress={() => navigation.navigate("RequestHistory")}>
                    היסטוריה של בקשות
                </Button>
            </View>
            <Text style={styles.CounterFont}> {searchBookData.length} ספר שמופרסם</Text>

            <FlatList

                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} />}
                data={searchBookData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={listEmptyComponent}
                style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 30 : 65 }, styles.flatList]}

            />
            {/* {!searchBookData.length ? <Text style={styles.emptyFont} >לא נמצא ספרים</Text> : null} */}

            {!I18nManager.isRTL ?
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBook")} >
                    <Ionicons size={50} name={"add"} color={"#ffffff"} />
                </TouchableOpacity>
                :

                <TouchableOpacity style={styles.addButton2} onPress={() => navigation.navigate("AddBook")} >
                    <Ionicons size={50} name={"add"} color={"#ffffff"} />
                </TouchableOpacity>

            }

            <Modal visible={isAleretVisible}>

                <View style={styles.alertContainer}>


                    <View style={styles.alertContentContainer}>


                        <Text style={styles.alertContentTextError}> את/ה בטוח שרוצה למחוק את הפוסט הזה?</Text>
                        <Button
                            style={styles.ButtonClose}
                            labelStyle={styles.ButtonCloseFont}
                            mode="contained"
                            onPress={() => setIsAlertVisible(false)}

                        >

                            לסגור
                        </Button>
                        <Button
                            style={styles.ButtonDelete}
                            labelStyle={styles.ButtonDeleteFont}
                            mode="contained"
                            onPress={delete_post_handler}
                        >

                            למחוק
                        </Button>



                    </View>

                </View>

            </Modal>

        </View>
    );
}
