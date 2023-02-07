import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import BackButton from "../../components/BackButton/BackButton";


import TextInput from "../../components/TextInput/TextInput";
import { MaterialIcons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { fetchByUserId } from "../../config/FireStoreDB";

export default function OtherUserPost({ navigation, route }) {


    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
  
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    let [searchBookData, setSearchBookData] = useState([])


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
 
    const renderItem = ({ item }) => {
        return (
            <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} id={item.id} />

        );
    }
    const Item = ({ title, author, type, status, image, id }) => (
        <View style={styles.item}>

         


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
    const fetchAllBooksDocuments = async () => {
       
        const uid = route.params.userId
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
                    style={styles.SearchInput}
                    onChangeText={(searchString) => { updateListBySearch(searchString) }}
                    placeholder="חיפוש"
                    // textColor = "#ddb07f"
                    placeholderTextColor="#ddb07f"
                />


                <MaterialIcons style={styles.searchIcon} name={"search"} size={30} color={"#ddb07f"} />
            </View>
            <BackButton goBack={navigation.goBack} />
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

          

        </View>
    );
}
