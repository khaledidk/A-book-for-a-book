import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Dimensions, Pressable } from "react-native";
import styles from "./styles";
import { DBReal, auth } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { fetchMessages } from "../../config/RealTimeDB";
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";
import { UpdateMassage } from "../../config/RealTimeDB";
import BackButton from "../../components/BackButton/BackButton";
import { useIsFocused } from '@react-navigation/native';
import { off } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AddFriendWhenFirstMassage } from "../../config/RealTimeDB";
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
            if(data){
            if( data.messages){
              
                AddFriendWhenFirstMassage( route.params.selectedUser.id , route.params.chatRoomID ,  data.messages[ data.messages.length-1].text)
               
            }
            
        
            setMessages(renderMessages(data.messages));
        }
        });

        return () => {
            //remove chatroom listener
            off(chatroomRef);
        };
    }, [isFocused]);
    const renderSend = (props) => {
        return (
            <Send {...props}

                containerStyle={{
                    position: "absolute",
                    zIndex: 1,
                    left: 10,


                }}
            >
                <View style={styles.sendingButtonContainer}  >

                    <MaterialCommunityIcons name='send-circle' color="#ff914d" size={40} style={styles.rotate90} />
                </View>

            </Send>
        );
    }
    const renderBubble = (props) => {
        return (
            // Step 3: return the component
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        // Here is the color change
                        backgroundColor: "#ff914d"
                    },
                    left: {
                        // Here is the color change
                        backgroundColor: "grey"
                    }

                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    },
                    left: {
                        // Here is the color change
                        color: '#fff'
                    }
                }}
            />
        );
    }


    return (
        <View style={styles.container}>
          <BackButton goBack={navigation.goBack} color = {"#ffffff"}/>
            <View style={styles.label}>
            <View style={styles.nameAndImage}>
                <Text style={styles.name} >{route.params.selectedUser.username}</Text>
                <Image style={styles.avatar} source={{ uri: route.params.selectedUser.avatar }} />
            
                </View>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessage => onSend(newMessage)}
                user={{
                    _id: route.params.MyData.id,

                }}
                alwaysShowSend
                textInputStyle={styles.inputSend}
                textInputProps={{ placeholder: "הודעת טקסט" }}
                renderSend={renderSend}
                renderBubble={renderBubble}
            />
        </View>
    );
}