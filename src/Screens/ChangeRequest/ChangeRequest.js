import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, I18nManager, Alert } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import { MaterialIcons, Ionicons, FontAwesome, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import Checkbox from 'expo-checkbox';
import { auth } from '../../config/firebase';
import BackButton from "../../components/BackButton/BackButton";
import moment from 'moment-timezone';
import 'moment/locale/he'
import { Rating } from "react-native-rating-element";
import { addFeedBack, addToRequestHistory, fetchBooksRequestsAndData, updateBookRequest } from "../../config/FireStoreDB";
import BackButton2 from "../../components/BackButton2/BackButton2";
const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
export default function ChangeRequest({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [bookId1, setBookId1] = useState("");
    const [bookId2, setBookId2] = useState("");
    const [requestId, setRequestId] = useState("");
    const [bookRequestArray, setBookRequestArray] = useState([]);// flatlist array
    const [isAleretVisible1, setIsAlertVisible1] = useState(false);// for modael
    const [isAleretVisible2, setIsAlertVisible2] = useState(false);// for modael
    let [searchBookData, setSearchBookData] = useState([])// flatlist array and search
    const [isFeedBackModelVisible, setIsFeedBackModelVisible] = useState(false);
    const [isCheckedYes, setisCheckedYes] = useState(false);
    const [isCheckedNo, setisCheckedNo] = useState(false);
    const [currUserName, setCurrUserName] = useState("");
    const [currUserID, setCurrUserID] = useState("");
    const [remarks, setRemarks] = useState("");
    const [starRating, setStarRating] = useState(3)
    const [item, setItem] = useState("");

    // this function handle the search 
    const updateListBySearch = (searchString) => {

        searchString = searchString.toLowerCase().trim();

        setSearchBookData(() => []);

        if (searchString === "") {
            setSearchBookData(() => bookRequestArray);
            return;
        }

        let searcheableFileds1 = ["title", "user_name"];
        let searcheableFileds2 = ["title2", "user_name2"];
        let newBookList = [];
        let isSuitable = false;

        bookRequestArray.forEach((currBookInfoObj) => {

            isSuitable = false;

            for (let i = 0; i < searcheableFileds1.length; i++) {

                if ((currBookInfoObj[0][searcheableFileds1[i]]).toLowerCase().includes(searchString) || (currBookInfoObj[1][searcheableFileds2[i]]).toLowerCase().includes(searchString)) {

                    newBookList.push(currBookInfoObj);
                    isSuitable = true;
                    break;
                }

            }


        });

        setSearchBookData(() => newBookList);

    };

    // this function diplay the books on screen
    const renderItem = ({ item }) => {

        return (
            <Item item={item} requestId={item[0].id} bookId1={item[0].bookId1} bookId2={item[1].bookId2} title1={item[0].title} title2={item[1].title2} image1={item[0].image} image2={item[1].image2} userImage={item[1].user_image2} userName={item[1].user_name2} userId={item[1].user_id2} requestDate={item[0].requestDate} />

        );
    }

    // this function to disgin the books and books details like cards
    const Item = ({ item, title1, title2, requestDate, image1, image2, userImage, userName, userId, requestId, bookId1, bookId2 }) => (
        <View style={styles.item}>
            <Text style={styles.txt}> {requestDate}</Text>
            <View style={styles.itemUpper} >

                <View style={styles.itemIcons}>
                    <TouchableOpacity onPress={() => setRequestId(requestId) || setIsAlertVisible2(true)} >
                        <Entypo name={"circle-with-cross"} size={30} color={"red"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setRequestId(requestId) || setIsAlertVisible1(true) || setBookId1(bookId1) || setBookId2(bookId2) || setCurrUserName(userName) || setCurrUserID(userId) || setItem(item)} >
                        <FontAwesome5 style={styles.Icons} name={"check-circle"} size={30} color={"green"} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.profile} onPress={() => PressOnUserProfileHandler(userId)}  >
                    {userImage ? <Image
                        style={styles.imageProfile}
                        source={{ uri: userImage }}

                    /> :
                        <Image
                            source={{ uri: profileDefaultImageUri }}
                            style={styles.imageProfile}
                        />
                    }
                   <View style = {{   flexShrink : 1,}}>
                    <Text style={styles.title}>{userName}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.Books}>
                <TouchableOpacity style={styles.Book} onPress={() => navigation.navigate("Item", { item: item[0], status: false })}>
                    {image1 && <Image source={{ uri: image1 }} style={styles.imageIteam} />}
                    <Text style={styles.title}>{title1}</Text>
                </TouchableOpacity>
                <FontAwesome size={30} name={"exchange"} color={"#ff914d"} />
                <TouchableOpacity style={styles.Book} onPress={() => navigation.navigate("Item", { item: item[1], status: false })}>
                    {image1 && <Image source={{ uri: image2 }} style={styles.imageIteam} />}
                    <Text style={styles.title}>{title2}</Text>

                </TouchableOpacity>
            </View>



        </View>
    );

    // this function get the request index in bookRequestArray
    const getPostIndex = (PostID) => {

        for (let currIndex = 0; currIndex < bookRequestArray.length; currIndex++) {
            console.log("req ID", PostID)
            if (bookRequestArray[currIndex][0].id === PostID) {
                console.log("req ID", currIndex)
                return currIndex;
            }
        }

        return -1;
    }

    // this function implement when the user accept the request
    const acceptChange = () => {



        let a = moment.tz('Asia/Jerusalem'); // hebrew
        console.log("item,", item)


        let requestObj = {
            sender_ID: item[1].user_id2,
            receive_ID: item[0].user_id,
            creat_date: item[0].requestDate,
            accepted_date: a.format("LL"),
            FirstBook_ID: item[0].bookId1,
            SecondBook_ID: item[1].bookId2,
          
        }

       
        addToRequestHistory(requestObj).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל לטעון דאטה נא לנסה שוב", [{ text: "בסדר" }])
            return;
        });
        updateBookRequest(requestId, { status: "מקובל" })
        bookRequestArray.splice(getPostIndex(requestId), 1);
        setBookRequestArray(() => bookRequestArray);
        setSearchBookData(() => bookRequestArray);
        setIsAlertVisible1(false)
        setIsFeedBackModelVisible(true)
    }

    // this function implement after the user accept or reject the request, to do feedback
    const sendFeedBack = async () => {
        const uid = currUserID;
        const user = auth.currentUser;
        const currid = user.uid;
        await addFeedBack(remarks, starRating, uid).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל לטעון דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });
        setIsFeedBackModelVisible(false)
    }

    // this function implement when the user reject the request
    const rejectChange = () => {

        updateBookRequest(requestId, { status: "נדחה" }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל לעדכן דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });
        bookRequestArray.splice(getPostIndex(requestId), 1);
        setBookRequestArray(() => bookRequestArray);
        setSearchBookData(() => bookRequestArray);
        setIsAlertVisible2(false)

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
    // this function handle when flatlist is empty
    const listEmptyComponent = () => {
        return (
            <Text style={styles.emptyFont} >לא נמצא בקשות</Text>
        )
    }

    // this function fetch all requests from DB
    const fetchAllBooksRequests = async () => {
        setIsLoading(true)

        await fetchBooksRequestsAndData(auth.currentUser.uid).then((booksList) => {
            booksList.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
          
                return  b[0].requestAT - a[0].requestAT  ;
              });
            setBookRequestArray(() => booksList);
            setSearchBookData(() => booksList)
            setIsLoading(false)

        }).catch(() => {

            Alert.alert("קרתה שגיה", " נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;
    };

    // this function fetch request on refresh flatlist then fill the bookRequestArray array and searchBookData array 
    const onRefresh = async () => {


        setIsRefreshing(true);

        await fetchBooksRequestsAndData(auth.currentUser.uid).then((booksList) => {

            console.log("Refreshing");

            setBookRequestArray(() => booksList);
            setSearchBookData(() => booksList)
            setIsRefreshing(false);
        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });;



    }


    // this useEffect fetch the data hen open screen
    useEffect(() => {
        fetchAllBooksRequests()


    }, []);



    return (
        <View style={styles.container}>
            {I18nManager.isRTL ?
                <BackButton2 goBack={navigation.goBack} />
                : <BackButton goBack={navigation.goBack} />}
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
            {searchBookData.length > 0 && <Text style={styles.ChangeRequestText}>כל הבקשות שמגיעות אליך:</Text>}
            <FlatList

                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} />}
                data={searchBookData}
                renderItem={renderItem}
                keyExtractor={item => item[0].id}

                ListEmptyComponent={listEmptyComponent}
                style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 20 : 20 }, styles.flatList]}

            />


            <Modal visible={isAleretVisible1}>

                <View style={styles.alertContainer}>


                    <View style={styles.alertContentContainer}>


                        <Text style={styles.alertContentTextError}>האם את/ה בטוח שרוצה לחליף עם הספר הזה?</Text>

                        <View style={styles.modelAnswer}>

                            <Button
                                style={styles.ModealButtons}
                                labelStyle={styles.filterButtonFont}
                                mode="Outlined"
                                onPress={() => acceptChange()}
                            >

                                כן
                            </Button>
                            <Button
                                style={styles.ModealButtons}
                                labelStyle={styles.filterButtonFont}
                                mode="Outlined"
                                onPress={() => setIsAlertVisible1(false)}
                            >

                                לא
                            </Button>



                        </View>


                    </View>

                </View>

            </Modal>

            <Modal visible={isAleretVisible2}>

                <View style={styles.alertContainer}>


                    <View style={styles.alertContentContainer}>


                        <Text style={styles.alertContentTextError}>האם את/ה בטוח שלא רוצה לחליף עם הספר הזה?</Text>


                        <View style={styles.modelAnswer}>


                            <Button
                                style={styles.ModealButtons}
                                labelStyle={styles.filterButtonFont}
                                mode="Outlined"
                                onPress={() => rejectChange()}
                            >

                                כן
                            </Button>
                            <Button
                                style={styles.ModealButtons}
                                labelStyle={styles.filterButtonFont}
                                mode="Outlined"
                                onPress={() => setIsAlertVisible2(false)}
                            >

                                לא
                            </Button>



                        </View>


                    </View>

                </View>

            </Modal>


            <Modal visible={isFeedBackModelVisible}>

                <View style={styles.modelContainer}>


                    <View style={styles.modelContentContainer}>


                        <Text style={styles.alertContentTextError}>האם בצעת החלפה עם {currUserName}?</Text>
                        <View style={styles.checkboxContiner} >

                            <View style={styles.checkboxAndText}>
                                <Text style={styles.checkBoxText} >כן</Text>
                                <Checkbox
                                    style={styles.checkbox} value={isCheckedYes} onValueChange={() => setisCheckedYes(!isCheckedYes) || setisCheckedNo(false)}
                                />
                            </View>
                            <View style={styles.checkboxAndText}>
                                <Text style={styles.checkBoxText} >לא</Text>
                                <Checkbox
                                    style={styles.checkbox} value={isCheckedNo} onValueChange={() => setisCheckedYes(false) || setisCheckedNo(!isCheckedNo)}
                                />
                            </View>
                        </View>

                        {isCheckedYes &&
                            <TextInput
                                label="הערות"
                                returnKeyType="next"
                                value={remarks}
                                onChangeText={(text) => setRemarks(text)}
                                autoCapitalize="none"
                                style={styles.input}

                                underlineColor="#ddb07f"
                                mode="outlined"
                                activeOutlineColor="#ddb07f"
                                outlineColor="#ddb07f"


                            />}

                        {isCheckedYes &&
                            <View style={styles.starRating}>
                                <Text style={styles.ratingText} >הדירוג שלך ל{currUserName}:</Text>
                                {I18nManager.isRTL ? <Rating

                                    rated={starRating}
                                    totalCount={5}
                                    size={25}
                                    icon="ios-star"
                                    direction="row-reverse"
                                    onIconTap={(position) => setStarRating(position)}



                                /> :
                                    <Rating

                                        rated={starRating}
                                        totalCount={5}
                                        size={25}
                                        icon="ios-star"
                                        direction="row"
                                        onIconTap={(position) => setStarRating(position)}



                                    />


                                }

                            </View>

                        }
                        {isCheckedYes && <Button
                            style={styles.ButtonClose}
                            labelStyle={styles.ButtonCloseFont}
                            mode="contained"
                            onPress={sendFeedBack}

                        >

                            לשלוח
                        </Button>}

                        <Button
                            style={styles.ButtonClose}
                            labelStyle={styles.ButtonCloseFont}
                            mode="contained"
                            onPress={() => setIsFeedBackModelVisible(false)}
                        >
                            לסגור
                        </Button>




                    </View>

                </View>

            </Modal>

        </View>





    );
}
