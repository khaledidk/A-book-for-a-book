import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Keyboard } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import BottomTab from '../../components/BottomTab/BottomTab'
import { TextInput } from "react-native-paper";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { fetchBookSorted } from "../../config/FireStoreDB";
import { fetchByLisner } from "../../config/FireStoreDB";
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { getDocs, onSnapshot, query, orderBy, where, collection } from "firebase/firestore"
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
      <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} userImage={item.user_image} userName={item.user_name} userId={item.user_id} />

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
  const Item = ({ title, author, type, status, image, userImage, userName, userId }) => (
    <View>
      <View style={styles.item} onPress={() => navigation.navigate("Item", { title: title, author: author })}>
        <TouchableOpacity style={styles.userNameAndImage} onPress={() => navigation.navigate("ViewProfile", { userId: userId })}>
          <Text style={styles.userName}> {userName} </Text>
          {userImage ? <Image
            source={{ uri: userImage }}
            style={styles.imageProfile}
          /> :
            <Image
              source={{ uri: profileDefaultImageUri }}
              style={styles.imageProfile}
            />
          }

        </TouchableOpacity>
        <View  style={styles.itemImageAndeDerails} >
        {image && <Image source={{ uri: image }} style={styles.imageIteam} />}
        <View style={styles.details}>
          <Text style={styles.title}>כותרת: {title} </Text>
          <Text style={styles.title}>שם מחבר: {author}</Text>
          <Text style={styles.title}>סוג הספר: {type}</Text>
          <Text style={styles.title}>מצב הספר: {status}</Text>
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
  // const fetchAllBooksDocumentsBylisner = async () => {


  //   const q = query(collection(DBFire, "books"), orderBy('Date', "desc"));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       // if (change.type === "added" && statusAdd) {
  //       //   console.log("added ", change.doc.data());
  //       //   if (change.doc.data().user_id !== auth.currentUser.uid) {
  //       //     let newBookJson = {
  //       //       id: change.doc.id,
  //       //       image: change.doc.data().image,
  //       //       title: change.doc.data().title,
  //       //       author_name: change.doc.data().author_name,
  //       //       book_type: change.doc.data().book_type,
  //       //       book_status: change.doc.data().book_status,

  //       //     }
  //       //     setBookData(oldArray => [newBookJson, ...oldArray]);
  //       //     setSearchBookData(oldArray => [newBookJson, ...oldArray]);

  //       //   }
  //       // }
  //       // if (change.type === "added" && !statusAdd && change.doc.data().user_id !== auth.currentUser.uid) {
  //       //   fetchAllBooksDocuments().then(() => {

  //       //     setIsLoading(() => false);
  //       //   });

  //       // }
  //       if (change.type === "modified") {
  //         console.log("Modified city: ", change.doc.data());
  //       }
  //       if (change.type === "removed") {
  //         console.log("Removed c: ", change.doc.data());
  //         fetchAllBooksDocuments().then(() => {

  //           setIsLoading(() => false);
  //         });

  //       }
  //     })

  //   });

  //   return () => unsubscribe();
  // };
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

    // if (route.params?.status !== 'add' && route.params?.status !== 'end') {

    //   setIsLoading(() => true);

    //   fetchAllBooksDocuments().then(() => {

    //     setIsLoading(() => false);
    //   });
    // } else {

    //   navigation.setParams({ status: "" })
    // }
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
        //  onRefresh={onRefresh}
        //  refreshing={isRefreshing}
        refreshControl={<RefreshControl
          colors={["#ff914d", "#ff914d"]}
          refreshing={isRefreshing}
          onRefresh={onRefresh} />}
        data={searchBookData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={onRefresh}
        onEndReachedThreshold={-0.5}
      //  ListFooterComponent={renderItem}
        //Platform.OS === "ios" ? getStatusBarHeight() + 90 :

        style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 90 : 100 }, styles.flatList]}

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
      {/* <BottomTab navigation = {navigation}/> */}

    </View>
  );
}
