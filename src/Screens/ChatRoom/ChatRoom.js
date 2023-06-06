import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Keyboard, I18nManager, Alert } from "react-native";
import styles from "./styles";
import { DBReal, auth } from "../../config/firebase";
import { ref, onValue, onChildChanged, get } from "firebase/database";
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";
import { MaterialIcons } from '@expo/vector-icons';
import BackButton from "../../components/BackButton/BackButton";
import TextInput from "../../components/TextInput/TextInput"
import { fetchChatRoom, getRoomChat } from "../../config/RealTimeDB";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useIsFocused } from '@react-navigation/native';
import { UpdateNotify } from "../../config/RealTimeDB";
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";

export default function ChatRoom({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);// flatlist array
    let [searchUsersList, setSearchUsersList] = useState([]) // flatlist array and search
    const [oneTime, setOneTime] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [myData, setMyData] = useState(null);// current user data
    const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
    const isFocused = useIsFocused();

    // this useEffect fetch the data hen open screen
    useEffect(() => {
        fetchtUserNameAndImage(auth.currentUser.uid).then((userInfo) => {
            userInfo["id"] = auth.currentUser.uid
            if (!userInfo.userImage) {
                userInfo["userImage"] = profileDefaultImageUri;
            }
            setMyData(userInfo)
        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });

        fetchChatRoomData()
        console.log("==========params========", route.params?.from)

        if (!isFocused) {
            navigation.setParams({ from: "" })
        }

    }, [isFocused])

    // this function fetch chatrooms on refresh flatlist then fill the users array and SearchUsersList array 
    const onRefresh = async () => {

        console.log("Refreshing");

        setIsRefreshing(true);

        await fetchChatRoom().then(ChatRoomarray => {
            setSearchUsersList(() => ChatRoomarray)
            setUsers(() => ChatRoomarray)
            setIsRefreshing(false);
        });
        navigation.setParams({ from: "" })
    }
    // this function handle the search 
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

    // this function display the chatrooms on screen
    const renderUser = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate("SingleChat", { selectedUser: item, MyData: myData, chatRoomID: item.chatroomId, from: "ChatRoom" })} style={styles.row}>

                {item.avatar ? <Image
                    style={styles.avatar}
                    source={{ uri: item.avatar }}

                /> :
                    <Image
                        style={styles.avatar}
                        source={{ uri: profileDefaultImageUri }}

                    />

                }
                <View style={styles.userNameAndLastMassage} >
                    <Text style={styles.userName} >{item.username}</Text>

                    {route.params?.from == item.chatroomId || item.seen ? <Text style={styles.lastMassageSeen} >{item.lastMassage}</Text> :
                        <Text style={styles.lastMassageNotSeen} >{item.lastMassage}</Text>}
                </View>
            </TouchableOpacity>
        );
    };


    // this function fetch all chatrooms from DB
    const fetchChatRoom = async () => {


        let element;
        const mySnapshot = await get(ref(DBReal, '/users/' + auth.currentUser.uid));
        let array = [];
        if (mySnapshot.val()) {
            const userData = mySnapshot.val();
            let friendList = userData.friends;
            if (friendList) {
                for (let i = 0; i < friendList.length; i++) {
                    element = friendList[i]

                    await fetchtUserNameAndImage(element.id).then((userInfo) => {
                        element["username"] = userInfo.userName
                        if (userInfo.userImage) {
                            element["avatar"] = userInfo.userImage;
                        } else {
                            element["avatar"] = profileDefaultImageUri;
                        }

                        array.push(element)



                    }).catch(() => {

                        Alert.alert("קרתה שגיה", "נכשל להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
                    });;
                }
            }



        }
        return array;

    }
    // this function handle when flatlist is empty
    const listEmptyComponent = () => {
        return (
            <Text style={styles.emptyFont} >לא נמצא משתמשים</Text>
        )
    }

    // this function fetch all chatrooms from DB
    const fetchChatRoomData = async () => {
        setIsLoading(true);
        setUsers([])
        setSearchUsersList([])

        await fetchChatRoom().then((ChatRoomarray) => {

            setSearchUsersList(() => ChatRoomarray)
            setUsers(() => ChatRoomarray)
            setIsLoading(false);
        })

    }

    return (
        <View style={styles.container}>
            {isLoading && <OurActivityIndicator />}
            <View style={styles.label}>



            </View>
            <View>
                <TextInput
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
                data={searchUsersList}
                refreshControl={<RefreshControl
                    colors={["#ff914d", "#ff914d"]}
                    refreshing={isRefreshing}
                    onRefresh={onRefresh} />}
                renderItem={renderUser}
                ListEmptyComponent={listEmptyComponent}
                style={[{ marginBottom: Platform.OS === "ios" ? getStatusBarHeight() + 40 : 65 }, styles.flatList]}
                keyExtractor={item => item.chatroomId}
            />
        </View>
    );
}
