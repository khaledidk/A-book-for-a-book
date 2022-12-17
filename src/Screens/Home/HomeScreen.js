import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import BottomTab from '../../components/BottomTab/BottomTab'
import TextInput from "../../components/TextInput/TextInput";
import { Ionicons } from '@expo/vector-icons';
import { fetchBookSorted } from "../../config/FireStoreDB";
import { fetchByLisner } from "../../config/FireStoreDB";
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { getDocs, onSnapshot, query, orderBy, where, collection } from "firebase/firestore"
import { auth, DBFire } from "../../config/firebase";
import { set } from "lodash";
export default function HomeScreen({ navigation, route }) {

  const [isModelVisible, setIsModelVisible] = useState(false);
  const [bookData, setBookData] = useState([
    //   {
    //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    //   title: 'חאלד',
    //   author: 'שלום',
    //   book_Type: "book_Type",
    //   book_Status: "bookStatusVal"

    // }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [statusAdd, setStatusAdd] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} />

    );
  }
  const Item = ({ title, author, type, status, image }) => (
    <View>
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Item", { title: title, author: author })}>
        <Image
          source={require('../../../assets/book.jpg')}
          style={styles.imageProfile}
        />

        {image && <Image source={{ uri: image }} style={styles.imageIteam} />}
        <View style={styles.details}>
          <Text style={styles.title}>כותרת: {title} </Text>
          <Text style={styles.title}>שם מחבר: {author}</Text>
          <Text style={styles.title}>סוג הספר: {type}</Text>
          <Text style={styles.title}>מצב הספר: {status}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
  const fetchAllBooksDocuments = async () => {

    setBookData([])
    await fetchBookSorted().then((booksList) => {

      setBookData(() => booksList);
    });;


    console.log("araay =============================================================================");

  };
  const fetchAllBooksDocumentsBylisner = async () => {


    const q = query(collection(DBFire, "books"), orderBy('Date', "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" && statusAdd) {
          console.log("added ", change.doc.data());
          if (change.doc.data().user_id !== auth.currentUser.uid) {
            let newBookJson = {
              id: change.doc.id,
              image: change.doc.data().image,
              title: change.doc.data().title,
              author_name: change.doc.data().author_name,
              book_type: change.doc.data().book_type,
              book_status: change.doc.data().book_status,

            }
            setBookData(oldArray => [newBookJson, ...oldArray]);

          }
        }
        if (change.type === "added" && !statusAdd && change.doc.data().user_id !== auth.currentUser.uid) {
          fetchAllBooksDocuments().then(() => {

            setIsLoading(() => false);
          });

        }
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed c: ", change.doc.data());
          fetchAllBooksDocuments().then(() => {

            setIsLoading(() => false);
          });

        }
      })

    });

    return () => unsubscribe();
  };
  const onRefresh = async () => {

    console.log("Refreshing");

    setIsRefreshing(true);

    fetchAllBooksDocuments().then(() => {

      setIsRefreshing(false);
    });
  }
  useEffect(() => {

    let unsubscribe = fetchAllBooksDocumentsBylisner()
  
    //   fetchAllBooksDocuments().then(() => {
    //   setIsLoading(() => false);
    // });
   
  }, []);
  // useEffect(() => {

  //   fetchAllBooksDocumentsBylisner()

  //   //   fetchAllBooksDocuments().then(() => {

  //   //   setIsLoading(() => false);
  //   // });

  // });
  useEffect(() => {
    if (route.params?.newBookJson) {
      // console.log("data array before : ", bookData)
      let newBook = route.params?.newBookJson;

      // bookData.push(route.params?.newBookJson)
      setBookData(oldArray => [newBook, ...oldArray]);
      setStatusAdd(newBook.status)

    }


  }, [route.params?.newBookJson]);

  return (
    <View style={styles.container}>
      {isLoading && <OurActivityIndicator />}
      <FlatList
        //  onRefresh={onRefresh}
        //  refreshing={isRefreshing}
        refreshControl={<RefreshControl
          colors={["#ff914d", "#ff914d"]}
          refreshing={isRefreshing}
          onRefresh={onRefresh} />}
        data={bookData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.flatList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AddBook")} >
        <Ionicons size={50} name={"add"} color={"#ffffff"} />
      </TouchableOpacity>
      {/* <BottomTab navigation = {navigation}/> */}

    </View>
  );
}
