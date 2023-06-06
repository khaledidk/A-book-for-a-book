


import { DBReal, auth } from "./firebase";
import { Image } from "react-native";
import { set, ref, child, push, update, get, onValue, increment } from "firebase/database";
// import moment from 'moment';
// import 'moment/locale/he'
import moment from 'moment-timezone';
import 'moment/locale/he'

const profileDefaultImageUri = Image.resolveAssetSource(require('../../assets/defult_Profile.png')).uri;


//*********************** creat *********************************//

// this function creat new user 
export default async function CreatUserInRealDB(userID) {
    try {
        const newUserObj = {
            id: userID,
            // username: UserName,

        };

        set(ref(DBReal, '/users/' + userID), newUserObj).catch((error) => {
            console.log(error)
        });
    } catch (error) {
        throw new Error(error.message);
    }

}

//*********************** find *********************************//

// this function search for user in DB by ID
export async function FindUser(userID) {

    try {

        const mySnapshot = await get(ref(DBReal, '/users/' + userID));

        return mySnapshot.val();
    } catch (error) {
        throw new Error(error.message);
    }

}

// this function find specific user in other user frient list by user ID
export async function FindUserOnFriendList(myId, userID, flag) {

    try {

        let returnValue = null;
        const mySnapshot = await get(ref(DBReal, '/users/' + myId + '/friends'));
        let indexNum, chatRoom;
        if (mySnapshot.val()) {
            mySnapshot.val().forEach((user, index) => {

                if (userID == user.id) {
                    returnValue = user;
                    indexNum = index;
                    chatRoom = user.chatroomId;
                }

            })
            if (returnValue) {
                if (flag == 0) {
                    return indexNum;
                } else {
                    return chatRoom
                }
            }
        }


        return null;
    } catch (error) {
        throw new Error(error.message);
    }

}
//*********************** add *********************************//

// this functioin add new friend when first message

export async function AddFriendWhenFirstMassage(userID, newChatroomId, lastMassage) {

    try {

        const checkOnListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 0);
        const checkOnMuListFriends = await FindUserOnFriendList(auth.currentUser.uid, userID, 0);

        console.log("====================enter===================2")
        if (checkOnMuListFriends != null) {
            update(ref(DBReal, '/users/' + auth.currentUser.uid + '/friends/' + checkOnMuListFriends), {
                lastMassage: lastMassage,


            });
        }
        if (checkOnListFriends != null) {
            update(ref(DBReal, '/users/' + userID + '/friends/' + checkOnListFriends), {
                lastMassage: lastMassage,


            });
            return;
        }


        //const myData = await FindUser(auth.currentUser.uid)
        const otherUserData = await FindUser(userID);
        const userFriends = otherUserData.friends || [];



        //join myself to this user friend list
        update(ref(DBReal, '/users/' + userID), {
            friends: [
                ...userFriends,
                {
                    id: auth.currentUser.uid,
                    chatroomId: newChatroomId,
                    lastMassage: lastMassage,
                    notifyCounter: 1


                },
            ],

        });
        UpdateNotify(userID)
    } catch (error) {
        throw new Error(error.message);
    }
}

// this function add new friend
export async function AddFriend(userID) {

    try {
        //find user and add it to my friends and also add me to his friends
        let chatRoom;
        const myData = await FindUser(auth.currentUser.uid)
        const otherUserData = await FindUser(userID);
        const checkOnListFriends = await FindUserOnFriendList(auth.currentUser.uid, userID, 1);
        const checkOnOtherListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 1);

        if (checkOnListFriends != null) {
            return checkOnListFriends;
        }

        if (checkOnOtherListFriends != null) {
            //add this user to my friend list
            const myFriends = myData.friends || [];
            update(ref(DBReal, '/users/' + auth.currentUser.uid), {
                friends: [
                    ...myFriends,
                    {
                        id: userID,
                        chatroomId: checkOnOtherListFriends,
                        lastMassage: "",

                    },
                ],
            });
            return checkOnOtherListFriends;
        }

        if (otherUserData) {



            // create a chatroom and store the chatroom id

            const newChatroomRef = push(ref(DBReal, 'chatrooms'), {
                firstUser: myData.id,
                secondUser: otherUserData.id,
                messages: [],
            });

            const newChatroomId = newChatroomRef.key;
            chatRoom = newChatroomRef.key;

            const myFriends = myData.friends || [];
            //add this user to my friend list
            update(ref(DBReal, '/users/' + auth.currentUser.uid), {
                friends: [
                    ...myFriends,
                    {
                        id: userID,
                        chatroomId: newChatroomId,
                        lastMassage: "",

                    },
                ],
            });
        }
        return chatRoom;
    } catch (error) {
        throw new Error(error.message);
    }

};


//*********************** fetch *********************************//

// this function fetch messages 
export async function fetchMessages(chatRoomID, userID) {

    try {
        console.log("userID", userID)

        const checkOnListFriendsIndex = await FindUserOnFriendList(auth.currentUser.uid, userID, 0);
        const checkOnListFriends = await FindUserOnFriendList(auth.currentUser.uid, userID, 1);
        const checkOnOtherListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 1);
        console.log("checkOnOtherListFriends", checkOnOtherListFriends)

        if (checkOnListFriends != null && checkOnOtherListFriends != null && checkOnOtherListFriends != checkOnListFriends) {
            console.log("===============enter our bug===================")

            update(ref(DBReal, '/users/' + auth.currentUser.uid + '/friends/' + checkOnListFriendsIndex), {



                id: userID,
                chatroomId: checkOnOtherListFriends,
                lastMassage: "",



            });

        }
        const snapshot = await get(
            ref(DBReal, '/chatrooms/' + chatRoomID),
        );

        return snapshot.val();
    } catch (error) {
        throw new Error(error.message);
    }

}
export async function checkIsSeen(myId, userID) {

    try {


        const mySnapshot = await get(ref(DBReal, '/users/' + myId + '/friends/' + userID));
        return mySnapshot.val().seen
        console.log("mySnapshot.val", mySnapshot.val())
    } catch (error) {
        throw new Error(error.message);
    }


}

//*********************** update *********************************//

// this function update status seen the message
export async function IsSeenMessage(myId, userID, isFocused, falg) {

    try {
        const checkOnListFriends = await FindUserOnFriendList(myId, userID, 0);
        console.log("isFocused", isFocused)

        if (checkOnListFriends != null) {


            update(ref(DBReal, '/users/' + myId + '/friends/' + checkOnListFriends), {

                seen: isFocused,

            });
        }
    } catch (error) {
        throw new Error(error.message);
    }


}

// this function update the messages to DB
export async function UpdateMassage(chatRoomID, lastMessages, msg, myData) {

    try {
        //Asia/Jerusalem 
        let a = moment.tz('Asia/Jerusalem'); // hebrew
        console.log("date===========",
            a.format("LLLL"),
        );


        update(ref(DBReal, '/chatrooms/' + chatRoomID), {
            messages: [
                ...lastMessages,
                {
                    SenderId: myData.id,
                    text: msg[0].text,
                    sender: myData.userName,
                    createdAt: a.format("LLLL"),
                },
            ],
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

// this function increment send notify to user per new message 
export async function NewNotifyCounter(userID, flag, newChatroomId, lastMassage) {

    try {
        console.log("=================enter NewNotifyCounter ===========")

        if (flag == 1) {
            const checkOnListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 0);

            if (checkOnListFriends != null) {

                const myRef = ref(DBReal, '/users/' + userID + '/friends/' + checkOnListFriends);
                update(myRef, {
                    notifyCounter: increment(1)
                });
            }
        }

        if (flag == 0) {
            console.log("=================enter NewNotifyCounter 0 ===========")
            const checkOnListFriends = await FindUserOnFriendList(auth.currentUser.uid, userID, 0);
            const myRef = ref(DBReal, '/users/' + auth.currentUser.uid + '/friends/' + checkOnListFriends);
            const data = await get(myRef);


            if (data.val() && data.val().notifyCounter) {
                let counter = data.val().notifyCounter

                update(myRef, {
                    notifyCounter: increment(-counter)
                });
                // update(ref(DBReal, '/users/' + auth.currentUser.uid), {
                //     notifyCounter: increment(-counter)
                // });
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


// this function count how many notify
export async function countNotify(userID) {
    // const checkOnListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 0);
    const data = await get(ref(DBReal, '/users/' + userID));
    let friendsList = data.val().friends;
    let connter = 0;

    if (friendsList) {
        friendsList.forEach((friend) => {
            if (friend.notifyCounter) {
                connter += friend.notifyCounter;
            }

        });
    }
    return connter;
}

// this function count how many notify then update
export async function UpdateNotify(userID) {

    try {
        const counter = await countNotify(userID);


        update(ref(DBReal, '/users/' + userID), {
            notifyCounter: counter
        });
    } catch (error) {
        throw new Error(error.message);
    }
}





