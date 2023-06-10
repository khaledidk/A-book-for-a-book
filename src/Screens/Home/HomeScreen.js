import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Keyboard, I18nManager, Alert } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TextInput } from "react-native-paper";
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { checkBook, fetchBookSorted } from "../../config/FireStoreDB";
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { auth, DBFire } from "../../config/firebase";
import { useIsFocused } from '@react-navigation/native';


export default function HomeScreen({ navigation, route }) {


  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  let [searchBookData, setSearchBookData] = useState([])
  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;

  // this function display the books on screen
  const renderItem = ({ item }) => {
    return (
      <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} userImage={item.user_image} userName={item.user_name} userId={item.user_id} language={item.book_language} starRating={item.rating_value} id={item.id} />

    );
  }

  // this function handler navigation when press on user profile
  const PressOnUserProfileHandler = (userId) => {
    const user = auth.currentUser;
    const uid = user.uid;

    if (uid == userId) {
      navigation.navigate("Profile")
    } else {

      navigation.navigate("ViewProfile", { userId: userId })
    }
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
  const Item = ({ title, author, type, status, image, userImage, userName, userId, language, starRating, id }) => (
    <View>
      <View style={styles.item} onPress={() => navigation.navigate("Item", { title: title, author: author })}>
        <View style={[!I18nManager.isRTL && styles.itemUpperPart, I18nManager.isRTL && styles.itemUpperPart2]} >
          <TouchableOpacity style={[!I18nManager.isRTL && styles.userNameAndImage, I18nManager.isRTL && styles.userNameAndImage2]} onPress={() => PressOnUserProfileHandler(userId)}>

            {userImage ? <Image
              style={styles.imageProfile}
              source={{ uri: userImage }}

            /> :
              <Image
                style={styles.imageProfile}
                source={{ uri: profileDefaultImageUri }}

              />

            }
            <View style={[!I18nManager.isRTL && styles.userNameContainer, I18nManager.isRTL && styles.userNameContainer2]} >
              <Text style={styles.userName}> {userName} </Text>

            </View>

          </TouchableOpacity>

          {userId === auth.currentUser.uid ? null : <TouchableOpacity onPress={() => checkBookExists(userId, id)} >
            <FontAwesome size={30} name={"exchange"} color={"#ff914d"} />
          </TouchableOpacity>}


        </View>
        <View style={styles.itemImageAndeDerails} >
          {image && I18nManager.isRTL ? <Image source={{ uri: image }} style={styles.imageIteam2} /> : null}
          {image && !I18nManager.isRTL ? <Image source={{ uri: image }} style={styles.imageIteam} /> : null}
          <View style={styles.details}>
            <Text style={styles.title}>{title} </Text>
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
                <Text style={styles.ratingFont}> {starRating}</Text>

              </View>

            </View>
          </View>
        </View>
      </View>

    </View>
  );

  // this function fetch all books then fill the bookData array and searckBookData array 
  const fetchAllBooksDocuments = async () => {
    setSearchBookData([])
    setBookData([])

    await fetchBookSorted().then((booksList) => {

      setBookData(() => booksList);
      setSearchBookData(() => booksList)

    }).catch(() => {

      Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });


  };

  // this function fetch books on refresh flatlist then fill the bookData array and searckBookData array 
  const onRefresh = async () => {
    setIsRefreshing(true);

    await fetchAllBooksDocuments().then(() => {

      setIsRefreshing(false);
    });
  }

  // this function fetch books when foucs on screen
  const onFocused = async () => {
    if (route.params?.status !== 'add' && route.params?.status !== 'end') {

      setIsLoading(() => true);

      fetchAllBooksDocuments().then(() => {
        setIsLoading(() => false);
      });
    } else {

      navigation.setParams({ status: "" })
    }
  }
  // this function handle when flatlist is empty
  const listEmptyComponent = () => {
    return (
      <Text style={styles.emptyFont} >לא נמצא ספרים</Text>
    )
  }

  // this function handle the search 
  const updateListBySearch = (searchString) => {

    searchString = searchString.toLowerCase().trim();

    setSearchBookData(() => []);

    if (searchString === "") {
      setSearchBookData(() => bookData);
      return;
    }
    let searcheableFileds = ["title", "author_name", "book_type", "book_status", "user_name", "book_language"];
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


  const isFocused = useIsFocused();
  // this useEffect fetch the data when open screen
  useEffect(() => {

    onFocused()

  }, [isFocused])

  // this useEffect when add new book
  useEffect(() => {
    if (route.params?.newBookJson) {
      console.log("=================local=================")
      let newBook = route.params?.newBookJson;


      setBookData(oldArray => [newBook, ...oldArray]);
      setSearchBookData(oldArray => [newBook, ...oldArray]);

      navigation.setParams({ status: "end" })
      navigation.setParams({ newBookJson: "" })
    }


  }, [route.params?.newBookJson]);

  return (
    <View style={styles.container}>
      {isLoading ? <OurActivityIndicator /> : null}

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
          placeholderTextColor="#ddb07f"
        />



        <MaterialIcons style={[!I18nManager.isRTL && styles.searchIcon, I18nManager.isRTL && styles.searchIcon2]} name={"search"} size={30} color={"#ddb07f"} />
      </View>

      <FlatList

        refreshControl={<RefreshControl
          colors={["#ff914d", "#ff914d"]}
          refreshing={isRefreshing}
          onRefresh={onRefresh} />}
        data={searchBookData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={onRefresh}
        onEndReachedThreshold={-0.5}
        ListEmptyComponent={listEmptyComponent}
        style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 40 : 65 }, styles.flatList]}

      />

      {!I18nManager.isRTL ?
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBook")} >
          <Ionicons size={50} name={"add"} color={"#ffffff"} />
        </TouchableOpacity>
        :

        <TouchableOpacity style={styles.addButton2} onPress={() => navigation.navigate("AddBook")} >
          <Ionicons size={50} name={"add"} color={"#ffffff"} />
        </TouchableOpacity>

      }

    </View>
  );
}
