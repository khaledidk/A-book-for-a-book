import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import BottomTab from '../../components/BottomTab/BottomTab'
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

    const delete_post_handler = () => {


        console.log("delet id =>>", CurrId, "index ==>", getPostIndex(CurrId))
        bookData.splice(getPostIndex(CurrId), 1);
        setBookData(() => bookData);
        setSearchBookData(() => bookData)
        deletePost(CurrId)
        setIsAlertVisible(false)



    }
    const GfGApp = () => {
        const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {

            setKeyboardOpen(true)


        }
        );
        const keyboardHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {

                setKeyboardOpen(false)

            }
        );
    }
    const getPostIndex = (PostID) => {

        for (let currIndex = 0; currIndex < bookData.length; currIndex++) {

            if (bookData[currIndex].id === PostID) {
                return currIndex;
            }
        }

        return -1;
    }
    const renderItem = ({ item }) => {
        return (
            <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} id={item.id} language={item.book_language} starRating = {item.rating_value}/>

        );
    }
    const Item = ({ title, author, type, status, image, id, language , starRating }) => (
        <View style={styles.item}>

            {/* <View style={styles.firstPartItem}> */}

            <View style={styles.itemIcons}>
                <TouchableOpacity onPress={() => setIsAlertVisible(true) || setCurrId(id)} >
                    <Ionicons name={"trash-outline"} size={28} color={"red"} />
                </TouchableOpacity>

                <FontAwesome style={styles.Icons} name={"edit"} size={30} color={"#ff914d"} onPress={() => navigation.navigate('EditPost', { title: title, author: author, type: type, status: status, image: image, id: id, language: language , starRating : starRating})} />

            </View>
            {/* </View> */}


            <View style={styles.itemImageAndeDerails} >
                {image && <Image source={{ uri: image }} style={styles.imageIteam} />}
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.txt}>שם הסופר: {author}</Text>
                    <Text style={styles.txt}>סוג הספר: {type}</Text>
                    <Text style={styles.txt}>מצב הספר: {status}</Text>
                    <Text style={styles.txt}>שפת הספר: {language}</Text>
                    <View style={styles.starRating}>
                        <View style={styles.ratingFontContiner}>
                            <Text style={styles.ratingFont}> {starRating} </Text>
                            <Text style={styles.txt} >/5</Text>
                        </View>
                        <Image
                            style={styles.imageStar}
                            source={require("../../../assets/star.png")}
                        />
                    </View>
                </View>
            </View>

        </View>
    );
    const fetchAllBooksDocuments = async () => {
        const user = auth.currentUser;
        const uid = user.uid;
        setSearchBookData([])
        setBookData([])
        await fetchByUserId(uid).then((booksList) => {

            setBookData(() => booksList);
            setSearchBookData(() => booksList)
        });;



    };
    const onRefresh = async () => {



        setIsRefreshing(true);

        fetchAllBooksDocuments().then(() => {
            console.log("Refreshing");
            setIsRefreshing(false);
        });
    }
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

            // if(!isSuitable && getUserRankString(currBookInfoObj.rank).toLowerCase().includes(searchString)){
            //   newBookList.push(currBookInfoObj);
            // }

        });

        setSearchBookData(() => newBookList);

    };

    // useFocusEffect(

    //     React.useCallback(() => {
    //   if(route.params?.status !== 'update'){
    //         console.log("route.params?.updateBookJson status===>" ,route.params?.status )
    //         setIsLoading(() => true);
    //     fetchAllBooksDocuments().then(() => {

    //         setIsLoading(() => false);
    //     });
    //     GfGApp();
    //   }


    // }, [])

    // );
    const isFocused = useIsFocused();
    useEffect(() => {




        if (route.params?.status !== 'update' && route.params?.status !== 'end') {
            // console.log("navigation", isFocused)
            // console.log("route.params?.status", route.params?.status)
            setIsLoading(() => true);

            fetchAllBooksDocuments().then(() => {

                setIsLoading(() => false);
            });

        } else {
            navigation.setParams({ status: "" })
        }
        GfGApp();



    }, [isFocused]);
    useEffect(() => {
        if (route.params?.updateBookJson) {

            console.log("============== enter update local =======")
            let updatedInfo = route.params?.updateBookJson;

            bookData.splice(getPostIndex(updatedInfo.id), 1, updatedInfo);
            // setBookData(oldArray => [updatedInfo, ...oldArray]);
            // searchBookData.splice(getPostIndex(updatedInfo.id), 1);
            // setSearchBookData(oldArray => [updatedInfo, ...oldArray]);
            updateListBySearch("")


            console.log("book:", bookData)
            navigation.setParams({ status: "end" })
            navigation.setParams({ updateBookJson: "" })


        }

    }, [route.params?.updateBookJson])
    // useEffect(() => {
    //     if (status && CurrId) {
    //         console.log("status =>>", status, "currId ==>", CurrId)
    //         if (status == 'delete') {
    //             console.log("delet id =>>", CurrId, "index ==>", getPostIndex(CurrId))
    //             bookData.splice(getPostIndex(CurrId), 1);
    //             setBookData(() => bookData);
    //             setSearchBookData(() => bookData)
    //             deletePost(CurrId)
    //             setStatus("")

    //         }

    //     }

    // }, [status]);


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
                    style={styles.SearchInput}
                    onChangeText={(searchString) => { updateListBySearch(searchString) }}
                    placeholder="חיפוש"
                    // textColor = "#ddb07f"
                    placeholderTextColor="#ddb07f"
                />


                <MaterialIcons style={styles.searchIcon} name={"search"} size={30} color={"#ddb07f"} />
            </View>
            {!keyboardOpen ? <FlatList
                //  onRefresh={onRefresh}
                //  refreshing={isRefreshing}
                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} />}
                data={searchBookData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                //Platform.OS === "ios" ? getStatusBarHeight() + 90 :

                style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 40 : 65 }, styles.flatList]}

            /> :
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
                    //Platform.OS === "ios" ? getStatusBarHeight() + 90 :

                    style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 200 : 10 }, styles.flatList]}

                />}
                   <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBook")} >
        <Ionicons size={50} name={"add"} color={"#ffffff"} />
      </TouchableOpacity>

            <Modal visible={isAleretVisible}>

                <View style={styles.alertContainer}>


                    <View style={styles.alertContentContainer}>

                        {/* <Ionicons name={"trash-outline"} size={100} color={"red"} /> */}
                        {/* <Entypo style={styles.IconError} name='circle-with-cross' size={100} />  */}
                        <Text style={styles.alertContentTextError}>האם אתה בטוח רוצה למחוק את הפוסט הזה?</Text>
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
