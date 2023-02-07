import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Keyboard, Pressable } from "react-native";
import styles from "./styles";
import { DBReal, auth } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { GiftedChat } from 'react-native-gifted-chat';
import { fetchMessages } from "../../config/RealTimeDB";
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";
import { UpdateMassage } from "../../config/RealTimeDB";
import { FindUser } from "../../config/RealTimeDB";
import { useIsFocused } from '@react-navigation/native';
import { off } from "firebase/database";
export default function SingleChat({ navigation, route }) {

    const [myData, setMyData] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);

    //load old messages
    const loadData = async () => {


        // await fetchtUserNameAndImage(route.params.selectedUserID).then((userInfo) => {
        //     userInfo["id"] = route.params.selectedUserID
        //     setSelectedUser(() => [userInfo])

        //     console.log("maydata", myData)
        // })
        const myChatroom = await fetchMessages(route.params.chatRoomID);

        console.log("After my data maydata")
        setMessages(renderMessages(myChatroom.messages));
    };

    const renderMessages = (msgs) => {


        return msgs ? msgs.reverse().map((msg, index) => (


            {
                ...msg,
                _id: index,
                user: {
                    _id:
                        msg.SenderId === route.params.MyData.id ? route.params.MyData.id : route.params.selectedUser.id,
                    avatar:
                        msg.SenderId === route.params.MyData.id ? route.params.MyData.userImage : route.params.selectedUser.avatar,
                    name:
                        msg.SenderId === route.params.MyData.id ? route.params.MyData.userName : route.params.selectedUser.username,
                },
            }

        )) : [];
    };
    const onSend = useCallback(
        async (msg = []) => {
            setMessages(prevMessages => GiftedChat.append(prevMessages, msg));

            //fetch fresh messages from server
            const currentChatroom = await fetchMessages(route.params.chatRoomID);

            const lastMessages = currentChatroom.messages || [];



            UpdateMassage(route.params.chatRoomID, lastMessages, msg, route.params.MyData);



        }, []);
    const isFocused = useIsFocused();
    useEffect(() => {

        console.log("enter")
        loadData();



        // set chatroom change listener
        const chatroomRef = ref(DBReal, '/chatrooms/' + route.params.chatRoomID);
        onValue(chatroomRef, snapshot => {
            const data = snapshot.val();

            setMessages(renderMessages(data.messages));
        });

        return () => {
            //remove chatroom listener
            off(chatroomRef);
        };
    }, [isFocused]);



    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={newMessage => onSend(newMessage)}
                user={{
                    _id: route.params.MyData.id,

                }}
            />
        </View>
    );
}