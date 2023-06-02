import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, I18nManager, Alert } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import { MaterialIcons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { addBookRequest, checkBookRequest, fetchByUserId } from "../../config/FireStoreDB";
import { auth } from '../../config/firebase';
import BackButton from "../../components/BackButton/BackButton";
import BackButton2 from "../../components/BackButton2/BackButton2";
import moment from 'moment-timezone';
import 'moment/locale/he'
export default function ChooseBookToChange({ navigation, route }) {
    const [bookData, setBookData] = useState([]);// flatlist array
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [clickedBookId, setClickedBookId] = useState('');
    const [clickedUserId, setClickedUserId] = useState('');
    let [searchBookData, setSearchBookData] = useState([]) // flatlist array
    const [isAleretVisible, setIsAlertVisible] = useState(false);
    const [isAleretVisible2, setIsAlertVisible2] = useState(false);


    // this function display the books on screen
    const renderItem = ({ item }) => {
        return (
            <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} id={item.id} />

        );
    }

    // this function check if already they have request with this two books
    const ChooseBook = async (id) => {
        setClickedBookId(id)
        setClickedUserId(route.params.user_id)

        const check = await checkBookRequest(route.params.firstBook_id, id).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });

        if (check) {
            setIsAlertVisible(true)
        } else {
            setIsAlertVisible2(true)
        }
    }
    // this function handle when flatlist is empty
    const listEmptyComponent = () => {
        return (
            <Text style={styles.emptyFont} >לא נמצא ספרים</Text>
        )
    }

    // this function add a request to DB
    const changeRequest = () => {
        console.log("enter ==== chose")
        let a = moment.tz('Asia/Jerusalem'); // hebrew
        let changeRequestObj = {
            SecondBook_ID: clickedBookId,
            FirstBook_ID: route.params.firstBook_id,
            sender_ID: auth.currentUser.uid,
            receive_ID: clickedUserId,
            date: a.format("LL"),
        }
       

        console.log("date===========",
            a.format("LL"),
        );

        setIsAlertVisible(false);
        addBookRequest(changeRequestObj).catch(() => {
            Alert.alert("קרתה שגיה", "נכשל לטעון דאטה נא לנסה שוב", [{ text: "בסדר" }])
        })
        navigation.navigate("Home")
    }

    // this function to disgin the books and books details like cards
    const Item = ({ title, author, type, status, image, id  , date}) => (
        <TouchableOpacity style={styles.item} onPress={() => ChooseBook(id)}>
            <View style={styles.itemImageAndeDerails} >
      
                {image && <Image source={{ uri: image }} style={styles.imageIteam} />}
                <View style={styles.details}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.txt}>שם הסופר: {author}</Text>
                    <Text style={styles.txt}>סוג הספר: {type}</Text>
                    <Text style={styles.txt}>מצב הספר: {status}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );

    // this function fetch all books the current user have
    const fetchAllBooksDocuments = async () => {

        const uid = auth.currentUser.uid
        setSearchBookData([])
        setBookData([])
        setIsLoading(true)
        await fetchByUserId(uid).then((booksList) => {

            setBookData(() => booksList);
            setSearchBookData(() => booksList)
            setIsLoading(false)
        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });

    };

    // this function fetch books on refresh flatlist then fill the bookData array and searckBookData array 
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

    // this useEffect fetch the data when open screen

    useEffect(() => {

        setIsLoading(() => true);

        fetchAllBooksDocuments().then(() => {

            setIsLoading(() => false);
        });



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
            {searchBookData.length > 0 && <Text style={styles.ChangeRequestText}>תבחר ספר להחלפה:</Text>}
            {I18nManager.isRTL ?
                <BackButton2 goBack={navigation.goBack} />
                : <BackButton goBack={navigation.goBack} />}
            {!searchBookData ? <Text style={styles.emptyFont} >לא נמצא ספרים להחלפה</Text> :
                <FlatList

                    refreshControl={<RefreshControl
                        colors={["#ff914d", "#ff914d"]}
                        refreshing={isRefreshing}
                        onRefresh={onRefresh} />}
                    data={searchBookData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={listEmptyComponent}

                    style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 20 : 20 }, styles.flatList]}

                />}

            <Modal visible={isAleretVisible}>

                <View style={styles.alertContainer}>


                    <View style={styles.alertContentContainer}>


                        <Text style={styles.alertContentTextError}>האם את/ה רוצה לשלוח בקשת החלפה עם הספר הזה?</Text>

                        <View style={styles.modelAnswer}>

                         
                            <Button
                                style={styles.ModealButtons}
                                labelStyle={styles.filterButtonFont}
                                mode="Outlined"
                                onPress={() => setIsAlertVisible(false)}
                            >

                                לא
                            </Button>
                            <Button
                                style={styles.ModealButtons}
                                labelStyle={styles.filterButtonFont}
                                mode="Outlined"
                                onPress={changeRequest}
                            >

                                כן
                            </Button>



                        </View>


                    </View>

                </View>

            </Modal>

            <Modal visible={isAleretVisible2}>

                <View style={styles.alertContainer}>


                    <View style={styles.alertContentContainer}>


                        <Text style={styles.alertContentTextError1}>כבר יש בקשת החלפה עם הספר שבחרת!</Text>
                        <Text style={styles.txt2} >* תבדוק את הבקשות שמגיעים אלך או שאת\ה מציע\ה (מסך ספרים שלי)</Text>

                        <View style={styles.modelAnswer}>


                            <Button
                                style={styles.ModealButtons}
                                labelStyle={styles.filterButtonFont}
                                mode="Outlined"
                                onPress={() => setIsAlertVisible2(false)}
                            >

                                סגור
                            </Button>



                        </View>


                    </View>

                </View>

            </Modal>

        </View>
    );
}
