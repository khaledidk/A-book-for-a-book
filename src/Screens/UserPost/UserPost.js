import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import BottomTab from '../../components/BottomTab/BottomTab'
import TextInput from "../../components/TextInput/TextInput";
import { AntDesign, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import { fetchBookSorted } from "../../config/FireStoreDB";
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { fetchByUserId } from "../../config/FireStoreDB";
import { auth } from '../../config/firebase';
import { deletePost } from "../../config/FireStoreDB";

export default function UserPost({ navigation, route }) {


    const [bookData, setBookData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [status, setStatus] = useState("");
    const [CurrId, setCurrId] = useState("");

    const StatusHandler = (id, status) => {
        setCurrId(id)
        setStatus(status)
        console.log("status change plzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")


        // bookData.splice(getPostIndex(id), 1);
        // deletePost(id)

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
            <Item title={item.title} author={item.author_name} type={item.book_type} status={item.book_status} image={item.image} id={item.id} />

        );
    }
    const Item = ({ title, author, type, status, image, id }) => (
        <View style={styles.item}>

            <View style={styles.firstPartItem}>
                <Image
                    source={require('../../../assets/book.jpg')}
                    style={styles.imageProfile}
                />
                <View style={styles.itemIcons}>
                    <TouchableOpacity onPress={() => StatusHandler(id, "delete")} >
                        <Ionicons name={"trash-outline"} size={28} color={"red"} />
                    </TouchableOpacity>

                    <FontAwesome style={styles.Icons} name={"edit"} size={30} color={"#ff914d"} onPress={() => navigation.navigate('EditPost', { title: title, author: author, type: type, status: status, image: image, id: id }) || StatusHandler(id, "update")} />

                </View>
            </View>


            <TouchableOpacity style={styles.seconPartItem} onPress={() => navigation.navigate("Item", { title: title, author: author })}>
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
        const user = auth.currentUser;
        const uid = user.uid;
        setBookData([])
        await fetchByUserId(uid).then((booksList) => {

            setBookData(() => booksList);
        });;



    };
    const onRefresh = async () => {

        console.log("Refreshing");

        setIsRefreshing(true);

        fetchAllBooksDocuments().then(() => {

            setIsRefreshing(false);
        });
    }
    useEffect(() => {

        fetchAllBooksDocuments().then(() => {

            setIsLoading(() => false);
        });


    }, []);
    useEffect(() => {
        if (status && CurrId) {
            console.log("status =>>", status, "currId ==>", CurrId)
            if (status == 'delete') {
                console.log("delet id =>>", CurrId, "index ==>", getPostIndex(CurrId))
                bookData.splice(getPostIndex(CurrId), 1);
                setBookData(() => bookData);
                deletePost(CurrId)
                setStatus("")

            }

        }

    }, [status]);
    useEffect(() => {
        if (route.params?.updateBookJson) {
           
            let updatedInfo = route.params?.updateBookJson;
            bookData.splice(getPostIndex(updatedInfo.id), 1);
            // bookData.splice(getPostIndex(updatedInfo.id), 1, updatedInfo);
            setBookData(oldArray => [updatedInfo, ...oldArray]);
            console.log("bookData =>>", bookData)

        }

    }, [route.params?.updateBookJson])

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

            {/* <BottomTab navigation = {navigation}/> */}

        </View>
    );
}
