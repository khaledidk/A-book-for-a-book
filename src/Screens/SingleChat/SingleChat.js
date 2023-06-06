import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View, Image, TouchableOpacity, Dimensions, Pressable, I18nManager, Alert } from "react-native";
import styles from "./styles";
import { DBReal, auth } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import { GiftedChat, Bubble, Send, Day } from 'react-native-gifted-chat';
import { DeleteMassage, fetchMessages, IsSeenMessage, NewNotifyCounter, UpdateNotify } from "../../config/RealTimeDB";
import { UpdateMassage } from "../../config/RealTimeDB";
import BackButton from "../../components/BackButton/BackButton";
import { useIsFocused } from '@react-navigation/native';
import { off } from "firebase/database";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AddFriendWhenFirstMassage } from "../../config/RealTimeDB";
import BackButton2 from "../../components/BackButton2/BackButton2";
import * as Clipboard from 'expo-clipboard';
import dayjs from 'dayjs';
import dayhe from 'dayjs/locale/he'
import moment from "moment";

export default function SingleChat({ navigation, route }) {

    const [myData, setMyData] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [isSeen, setIsSeen] = useState(false);

    //load old messages
    const loadData = async () => {
        const myChatroom = await fetchMessages(route.params.chatRoomID , route.params.selectedUser.id).catch((e) => {
            console.log(e)
            Alert.alert("קרתה שגיה", "נכשל להביא הודעות נא לנסה שוב", [{ text: "בסדר" }])
        });

        console.log("After my data maydata")
        if (myChatroom) {
            { I18nManager.isRTL ? setMessages(renderMessages(myChatroom.messages)) : setMessages(renderMessages(myChatroom.messages)) }
        }
    };

    // this function update the Notify to user
    const notifiction = async (flag, seen, status) => {
        await NewNotifyCounter(route.params.selectedUser.id, flag).then(() => {
            if (seen) {
                UpdateNotify(auth.currentUser.uid).catch(() => {

                    Alert.alert("קרתה שגיה", "נכשל לעדכן דאטה נא לנסה שוב", [{ text: "בסדר" }])
                });
                IsSeenMessage(auth.currentUser.uid, route.params.selectedUser.id, status, 1).catch(() => {

                    Alert.alert("קרתה שגיה", "נכשל  דאטה נא לנסה שוב", [{ text: "בסדר" }])
                });
            } else {
                UpdateNotify(route.params.selectedUser.id).catch(() => {

                    Alert.alert("קרתה שגיה", "נכשל לעדכן דאטה נא לנסה שוב", [{ text: "בסדר" }])
                });
                IsSeenMessage(route.params.selectedUser.id, auth.currentUser.uid, status, 0).catch(() => {

                    Alert.alert("קרתה שגיה", "נכשל לעדכן דאטה נא לנסה שוב", [{ text: "בסדר" }])
                });
            }


        }).catch(() => {

            Alert.alert("קרתה שגיה", "נכשל לעדכן דאטה נא לנסה שוב", [{ text: "בסדר" }])
        });




    };

    // this function format the message style
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

    // this function implement when user send message
    const onSend = useCallback(
        async (msg = []) => {
            setMessages(prevMessages => GiftedChat.append(prevMessages, msg));

            //fetch fresh messages from server
            const currentChatroom = await fetchMessages(route.params.chatRoomID , route.params.selectedUser.id);

            const lastMessages = currentChatroom.messages || [];
            console.log("route.params.MyData", route.params.MyData)

            await notifiction(1, false, false);
            UpdateMassage(route.params.chatRoomID, lastMessages, msg, route.params.MyData).catch(() => {

                Alert.alert("קרתה שגיה", "נכשל לטעון דאטה נא לנסה שוב", [{ text: "בסדר" }])
            });





        }, []);
    const isFocused = useIsFocused();
    useEffect(() => {

        console.log("enter chat single", route.params?.from)
        notifiction(0, true, true)

        loadData();



        // set chatroom change listener
        const chatroomRef = ref(DBReal, '/chatrooms/' + route.params.chatRoomID);
        onValue(chatroomRef, snapshot => {
            const data = snapshot.val();
            if (data) {
                if (data.messages) {

                    AddFriendWhenFirstMassage(route.params.selectedUser.id, route.params.chatRoomID, data.messages[data.messages.length - 1].text)

                }


                setMessages(renderMessages(data.messages));
            }
        });

        return () => off(chatroomRef)

    }, [isFocused]);


    // this function custmize the send button for ltr
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
    // this function custmize the send button for rtl 
    const renderSend2 = (props) => {
        return (
            <Send {...props}

                containerStyle={{
                    position: "absolute",
                    zIndex: 1,
                    right: 10,


                }}
            >
                <View style={styles.sendingButtonContainer}  >

                    <MaterialCommunityIcons name='send-circle' color="#ff914d" size={40} style={styles.rotate90} />
                </View>

            </Send>
        );
    }

    // this function custmize the bubble for ltr
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
                onLongPress={(context, message) => onLongPress(context, message)}
            />
        );
    }
    // this function custmize the bubble  for rtl 
    const renderBubble2 = (props) => {
        return (
            // Step 3: return the component
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        // Here is the color change
                        backgroundColor: "grey"
                    },
                    left: {
                        // Here is the color change

                        backgroundColor: "#ff914d"

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
                onLongPress={(context, message) => onLongPress(context, message)}


            />
        );
    }

    // this function splite date LLLL ltr
    const splite = (str) => {
        let n = 4; // second space
        let first;

        if (str) {

            let a = str.split(' ')
            first = a.slice(0, n).join(' ')
            let second = a.slice(n).join(' ');
        }
        return first

    }
    // this function splite date LLLL for rtl
    const splite2 = (str) => {
        let n = 4; // second space
        let first;
        let second;

        if (str) {

            let a = str.split(' ')
            first = a.slice(0, n).join(' ')
            second = a.slice(n).join(' ');
        }
        return second

    }

    // this function handler navigation when press on user profile
    const PressOnUserProfileHandler = (userId) => {
        const user = auth.currentUser;
        const uid = user.uid;
        console.log("userid", userId)
        if (uid == userId) {
            navigation.navigate("Profile")
        } else {

            navigation.navigate("ViewProfile", { userId: userId })
        }
    }

    // this function help to copy messages
    const copyToClipboard = async (message) => {

        await Clipboard.setStringAsync(message)
    };

    // this function implement when onLongPress on add messsage to copy it
    const onLongPress = (context, message) => {
        console.log(context, message);
        const options = ['copy', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        context.actionSheet().showActionSheetWithOptions({
            options,
            cancelButtonIndex
        }, (buttonIndex) => {
            switch (buttonIndex) {
                case 0:
                    copyToClipboard(message.text)
                    break;

            }
        });
    }

    return (
        <View style={styles.container}>
            {I18nManager.isRTL && route.params?.from == "ChatRoom" ?
                <BackButton2 navigation={navigation} goBack={navigation.goBack} color={"#ffffff"} params={route.params.chatRoomID} />
                : null}
            {!I18nManager.isRTL && route.params?.from == "ChatRoom" ?
                <BackButton navigation={navigation} goBack={navigation.goBack} color={"#ffffff"} params={route.params.chatRoomID} />
                : null}

            {I18nManager.isRTL && route.params?.from == "ViewProfile" ?
                <BackButton2 goBack={navigation.goBack} color={"#ffffff"} />
                : null}
            {!I18nManager.isRTL && route.params?.from == "ViewProfile" ?
                <BackButton goBack={navigation.goBack} color={"#ffffff"} />
                : null}


            <View onPress={() => PressOnUserProfileHandler(route.params.selectedUser.id)} style={styles.label}>
                <TouchableOpacity onPress={() => PressOnUserProfileHandler(route.params.selectedUser.id)} style={styles.nameAndImage}>
                    <Text style={styles.name} >{route.params.selectedUser.username}</Text>
                    <Image style={styles.avatar} source={{ uri: route.params.selectedUser.avatar }} />

                </TouchableOpacity  >
            </View>

            {I18nManager.isRTL ? <GiftedChat
                messages={messages}
                onSend={newMessage => onSend(newMessage)}
                user={{
                    _id: route.params.selectedUser.id,

                }}
                locale='he'
                alwaysShowSend
                showUserAvatar={true}
                showAvatarForEveryMessage={true}
                textInputStyle={styles.inputSend}
                textInputProps={{ placeholder: "הודעת טקסט" }}
                renderSend={I18nManager.isRTL ? renderSend2 : renderSend}
                renderBubble={I18nManager.isRTL ? renderBubble2 : renderBubble}
                renderDay={(props) => {

                    let str = splite(props.currentMessage.createdAt + '')

                    let strPrev = splite(props.previousMessage.createdAt + '')
                    if (strPrev != str) {
                        return (


                            <Text style={styles.day}> {`${str}`}</Text>


                        )
                    }
                }}
                renderTime={(props) => {

                    let str = splite2(props.currentMessage.createdAt + '')

                    return (


                        <Text style={{ fontSize: 10, marginHorizontal: 10, marginBottom: 5 }} > {`${str}`}</Text>


                    )
                }}
            /> :

                <GiftedChat
                    messages={messages}
                    onSend={newMessage => onSend(newMessage)}
                    user={{
                        _id: route.params.MyData.id,

                    }}
                    locale='he'
                    alwaysShowSend
                    showUserAvatar={true}
                    showAvatarForEveryMessage={true}
                    textInputStyle={styles.inputSend}
                    textInputProps={{ placeholder: "הודעת טקסט" }}
                    renderSend={I18nManager.isRTL ? renderSend2 : renderSend}
                    renderBubble={I18nManager.isRTL ? renderBubble2 : renderBubble}
                    renderDay={(props) => {

                        let str = splite(props.currentMessage.createdAt + '')
                        let strPrev = splite(props.previousMessage.createdAt + '')
                        if (strPrev != str) {
                            return (


                                <Text style={styles.day}> {`${str}`}</Text>


                            )
                        }
                    }}
                    renderTime={(props) => {

                        let str = splite2(props.currentMessage.createdAt + '')
                        return (


                            <Text style={{ fontSize: 10, marginHorizontal: 10, marginBottom: 5 }}> {`${str}`}</Text>


                        )
                    }}


                />


            }


        </View>
    );
}