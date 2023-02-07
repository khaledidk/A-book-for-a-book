import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Keyboard, Pressable } from "react-native";
import styles from "./styles";
import { DBReal, auth } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";
import { MaterialIcons } from '@expo/vector-icons';
import BackButton from "../../components/BackButton/BackButton";
import TextInput from "../../components/TextInput/TextInput"
import { off } from "firebase/database";
export default function ChatRoom({ navigation, route }) {

    const [users, setUsers] = useState([]);
    let [searchUsersList, setSearchUsersList] = useState([])
    const [oneTime, setOneTime] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [myData, setMyData] = useState(null);
    useEffect(() => {
        fetchtUserNameAndImage(auth.currentUser.uid).then((userInfo) => {
            userInfo["id"] = auth.currentUser.uid
            setMyData(userInfo)
        })
        ListenerData()
        
        console.log(users)


    }, [])
    const onRefresh = async () => {

        console.log("Refreshing");

        setIsRefreshing(true);

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
            <TouchableOpacity onPress={() => navigation.navigate("SingleChat", { selectedUser: item, MyData : myData, chatRoomID: item.chatroomId })} style={styles.row}>
                <Image style={styles.avatar} source={{ uri: item.avatar }} />
                <Text style={styles.userName} >{item.username}</Text>
            </TouchableOpacity>
        );
    };

    const ListenerData = async () => {

        const myUserRef = ref(DBReal, '/users/' + auth.currentUser.uid);

        onValue(myUserRef, snapshot => {
            console.log("enterLister")
            const array = [];
            setUsers([])
            setSearchUsersList([])
            const userData = snapshot.val();
            const friendList = userData.friends;

            if (friendList) {


                friendList.forEach(element => {

                    fetchtUserNameAndImage(element.id).then((userInfo) => {
                        element["username"] = userInfo.userName
                        element["avatar"] = userInfo.userImage
                        array.push(element)

                        setSearchUsersList((oldArray) => [...oldArray, element])

                        setUsers((oldArray) => [...oldArray, element])

                    })


                });



            } else {
                setUsers([])
                setSearchUsersList([])

            }




        });

        return () => off(ref);
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