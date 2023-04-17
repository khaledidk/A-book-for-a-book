import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Keyboard, Pressable } from "react-native";
import styles from "./styles";
import { DBReal, auth } from "../../config/firebase";
import { ref, onValue, onChildChanged } from "firebase/database";
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";
import { MaterialIcons } from '@expo/vector-icons';
import BackButton from "../../components/BackButton/BackButton";
import TextInput from "../../components/TextInput/TextInput"
import { getRoomChat } from "../../config/RealTimeDB";

import { useIsFocused } from '@react-navigation/native';
import { UpdateNotify } from "../../config/RealTimeDB";
export default function ChatRoom({ navigation, route }) {

    const [users, setUsers] = useState([]);
    let [searchUsersList, setSearchUsersList] = useState([])
    const [oneTime, setOneTime] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [myData, setMyData] = useState(null);
    const isFocused = useIsFocused();
    useEffect(() => {
        fetchtUserNameAndImage(auth.currentUser.uid).then((userInfo) => {
            userInfo["id"] = auth.currentUser.uid
            setMyData(userInfo)
        })
        ListenerData();
        // getData();
        // onUpdateLister();
        console.log("is foucos", isFocused)
        if (!isFocused) {

            UpdateNotify(auth.currentUser.uid, 0)
        }

    }, [isFocused])
    const onRefresh = async () => {

        console.log("Refreshing");

        setIsRefreshing(true);
        // getData().then(() => {

        //     setIsRefreshing(false);
        // });
        ListenerData().then(() => {

            setIsRefreshing(false);
        });
    }
    const updateListBySearch = (searchString) => {

        searchString = searchString.toLowerCase().trim();

        setSearchUsersList(() => []);

        if (searchString === "") {
            setSearchUsersList(() => users);
            return;
        }

        let searcheableFileds = ["username"];
        let newUsersList = [];


        users.forEach((currBookInfoObj) => {



            for (let i = 0; i < searcheableFileds.length; i++) {

                if ((currBookInfoObj[searcheableFileds[i]]).toLowerCase().includes(searchString)) {

                    newUsersList.push(currBookInfoObj);

                    break;
                }
            }


        });

        setSearchUsersList(() => newUsersList);

    };
    const renderUser = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("SingleChat", { selectedUser: item, MyData: myData, chatRoomID: item.chatroomId })} style={styles.row}>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <View style={styles.userNameAndLastMassage} >
                    <Text style={styles.userName} >{item.username}</Text>
                    {item.seen ? <Text style={styles.lastMassageSeen} >{item.lastMassage}</Text> :
                        <Text style={styles.lastMassageNotSeen} >{item.lastMassage}</Text>}
                </View>
            </TouchableOpacity>
        );
    };
    const getPostIndex = (PostID) => {
        console.log("searchUsersList", searchUsersList)
        for (let currIndex = 0; currIndex < searchUsersList.length; currIndex++) {

            if (searchUsersList[currIndex].chatroomId === PostID) {
                return currIndex;
            }
        }

        return -1;
    }
    // const onUpdateLister = async () => {
    //     const myUserRef = ref(DBReal, '/users/' + auth.currentUser.uid + '/friends/');

    //     onChildChanged(myUserRef, snapshot => {
    //         const snapshotChange = snapshot.val();
    //         console.log("=======change=============", snapshotChange.chatroomId);
    //         // users.splice(getPostIndex(snapshot.id), 1, snapshot);
    //         const index = getPostIndex(snapshotChange.chatroomId)

    //         console.log("index", index)
    //         // let temp = users[index];
    //         // console.log("temp", temp)
    //         // temp.lastMassage = snapshotChange.lastMassage;

    //         // searchUsersList.splice(index, 1, temp);
    //         // users.splice(index, 1, temp);
    //         // console.log("searchUsersList", searchUsersList)
    //         // searchUsersList.splice(getPostIndex(snapshot.id), 1, snapshot);



    //     });
    //     return () => off(myUserRef);

    // }

    const getData = async () => {

        getRoomChat().then((dataArray) => {

            setSearchUsersList(dataArray)
            setUsers(dataArray)
        })
    }
    const ListenerData = async () => {
        let friendList;
        const myUserRef = ref(DBReal, '/users/' + auth.currentUser.uid);

        onValue(myUserRef, snapshot => {

            const array = [];
            setUsers([])
            setSearchUsersList([])
            const userData = snapshot.val();
            friendList = userData.friends;

            if (friendList) {


                friendList.forEach(element => {

                    fetchtUserNameAndImage(element.id).then((userInfo) => {
                        element["username"] = userInfo.userName
                        element["avatar"] = userInfo.userImage
                        array.push(element)
                        setSearchUsersList(() => array)
                        setUsers(() => array)
                        // setSearchUsersList(() => [...oldArray, element])

                        // setUsers((oldArray) => [...oldArray, element])

                    })


                });



            } else {
                setUsers([])
                setSearchUsersList([])

            }




        });



        return () => off(myUserRef);
    };
    return (
        <View style={styles.container}>

            <View style={styles.label}>

                {/* <BackButton goBack={navigation.goBack} color={"#ffffff"} /> */}

            </View>
            <View>
                <TextInput
                    underlineColor="ff914d"
                    mode="outlined"
                    activeOutlineColor="#ff914d"
                    outlineColor="#ff914d"
                    style={styles.SearchInput}
                    onChangeText={(searchString) => { updateListBySearch(searchString) }}
                    placeholder="חיפוש"
                    placeholderTextColor="#ddb07f"
                />



                <MaterialIcons style={styles.searchIcon} name={"search"} size={30} color={"#ddb07f"} />
            </View>
            <FlatList
                data={searchUsersList}
                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} />}
                renderItem={renderUser}
                style={styles.flatList}
                keyExtractor={item => item.chatroomId}
            />
        </View>
    );
}