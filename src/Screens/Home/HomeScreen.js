import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Keyboard } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { TextInput } from "react-native-paper";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { fetchBookSorted } from "../../config/FireStoreDB";

import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";

import { auth, DBFire } from "../../config/firebase";

import { useIsFocused } from '@react-navigation/native';
export default function HomeScreen({ navigation, route }) {

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusAdd, setStatusAdd] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  let [searchBookData, setSearchBookData] = useState([])

  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
  const renderItem = ({ item }) => {
    return (
      <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} userImage={item.user_image} userName={item.user_name} userId={item.user_id} language = {item.book_language} starRating = {item.rating_value} />

    );
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
  const PressOnUserProfileHandler = (userId) => {
    const user = auth.currentUser;
    const uid = user.uid;

    if (uid === userId) {
      navigation.navigate("Profile")
    } else {
      navigation.navigate("ViewProfile", { userId: userId })
    }
  }
  const Item = ({ title, author, type, status, image, userImage, userName, userId , language , starRating }) => (
    <View>
      <View style={styles.item} onPress={() => navigation.navigate("Item", { title: title, author: author })}>
        <TouchableOpacity style={styles.userNameAndImage} onPress={() => PressOnUserProfileHandler(userId)}>
          <Text style={styles.userName}> {userName} </Text>
          {userImage ? <Image
            style={styles.imageProfile}
            source={{ uri: userImage }}
          
          /> :
            <Image
              source={{ uri: profileDefaultImageUri }}
              style={styles.imageProfile}
            />
          }

        </TouchableOpacity>
        <View style={styles.itemImageAndeDerails} >
          {image && <Image source={{ uri: image }} style={styles.imageIteam} />}
          <View style={styles.details}>
            <Text style={styles.title}>{title} </Text>
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

    </View>
  );
  const fetchAllBooksDocuments = async () => {
    setSearchBookData([])
    setBookData([])

    await fetchBookSorted().then((booksList) => {

      setBookData(() => booksList);
      setSearchBookData(() => booksList)
    

    });;




  };

  const onRefresh = async () => {

    console.log("Refreshing");

    setIsRefreshing(true);

    await fetchAllBooksDocuments().then(() => {

      setIsRefreshing(false);
    });
  }
  const onFocused = async () => {

    if (route.params?.status !== 'add' && route.params?.status !== 'end') {

      setIsLoading(() => true);

      fetchAllBooksDocuments().then(() => {
        console.log("is load", isLoading)
        setIsLoading(() => false);
      });
    } else {

      navigation.setParams({ status: "" })
    }
  }
  const updateListBySearch = (searchString) => {

    searchString = searchString.toLowerCase().trim();

    setSearchBookData(() => []);

    if (searchString === "") {
      setSearchBookData(() => bookData);
      return;
    }

    let searcheableFileds = ["title", "author_name", "book_type", "book_status", "user_name"];
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
  useEffect(() => {

    onFocused()

    GfGApp()


  }, [isFocused])


  useEffect(() => {
    if (route.params?.newBookJson) {
      console.log("=================local=================")
      let newBook = route.params?.newBookJson;

      // bookData.push(route.params?.newBookJson)
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
          style={styles.SearchInput}
          onChangeText={(searchString) => { updateListBySearch(searchString) }}
          placeholder="חיפוש"
          // textColor = "#ddb07f"
          placeholderTextColor="#ddb07f"
        />



        <MaterialIcons style={styles.searchIcon} name={"search"} size={30} color={"#ddb07f"} />
      </View>
      {!keyboardOpen ? <FlatList

        refreshControl={<RefreshControl
          colors={["#ff914d", "#ff914d"]}
          refreshing={isRefreshing}
          onRefresh={onRefresh} />}
        data={searchBookData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={onRefresh}
        onEndReachedThreshold={-0.5}

        style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 40 : 65 }, styles.flatList]}

      /> :
        <FlatList

          refreshControl={<RefreshControl
            colors={["#ff914d", "#ff914d"]}
            refreshing={isRefreshing}
            onRefresh={onRefresh} />}
          data={searchBookData}
          renderItem={renderItem}
          keyExtractor={item => item.id}


          style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 200 : 10 }, styles.flatList]}

        />}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBook")} >
        <Ionicons size={50} name={"add"} color={"#ffffff"} />
      </TouchableOpacity>
      {/* <BottomTab navigation = {navigation}/> */}

    </View>
  );
}
