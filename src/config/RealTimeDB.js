


import { DBReal, auth } from "./firebase";
import { Image } from "react-native";
import { set, ref, child, push, update, get, onValue, increment } from "firebase/database";

const profileDefaultImageUri = Image.resolveAssetSource(require('../../assets/defult_Profile.png')).uri;
export default async function CreatUserInRealDB(userID, UserName) {

    const newUserObj = {
        id: userID,
        username: UserName,

    };

    set(ref(DBReal, '/users/' + userID), newUserObj).catch((error) => {
        console.log(error)
    });

}
// export async function getRoomChat(userID) {
//     let friendList;

//     const mySnapshot = await get(ref(DBReal, '/users/' + auth.currentUser.uid));

//     const array = [];

//     const userData = mySnapshot.val();
//     friendList = userData.friends;

//     if (friendList) {


//         // friendList.forEach(element => {
//         for (let i = 0; i < friendList.length; i++) {
//             let element = friendList[i];
//             await fetchtUserNameAndImage(element.id).then((userInfo) => {
//                 element["username"] = userInfo.userName
//                 element["avatar"] = userInfo.userImage
//                 array.push(element)


//             })
//         }






//     }

//     return array;

// }
// find data 
export async function FindUser(userID) {



    const mySnapshot = await get(ref(DBReal, '/users/' + userID));

    return mySnapshot.val();

}
export async function FindUserOnFriendList(myId, userID, flag) {


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

}

// add data

export async function AddFriendWhenFirstMassage(userID, newChatroomId, lastMassage) {
    const checkOnListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 0);
    const checkOnMuListFriends = await FindUserOnFriendList(auth.currentUser.uid, userID, 0);
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
        notifyCounter: 1
    });
}
export async function AddFriend(userID) {



    //find user and add it to my friends and also add me to his friends
    let chatRoom;
    const myData = await FindUser(auth.currentUser.uid)
    const otherUserData = await FindUser(userID);
    const checkOnListFriends = await FindUserOnFriendList(auth.currentUser.uid, userID, 1);
    const checkOnOtherListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 1);
    console.log("chekk ", checkOnListFriends);
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

        console.log("emteeeer")

        // create a chatroom and store the chatroom id

        const newChatroomRef = push(ref(DBReal, 'chatrooms'), {
            firstUser: myData.username,
            secondUser: otherUserData.username,
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

};




// featch data 
export async function fetchMessages(chatRoomID) {


    const snapshot = await get(
        ref(DBReal, '/chatrooms/' + chatRoomID),
    );

    return snapshot.val();


}


// update data

export async function IsSeenMessage(myId, userID, isFocused) {

    const checkOnListFriends = await FindUserOnFriendList(myId, userID, 0);
    console.log("isFocused", isFocused)

    if (checkOnListFriends != null) {
        update(ref(DBReal, '/users/' + myId + '/friends/' + checkOnListFriends), {

            seen: isFocused,

        });
    }



}
export async function UpdateMassage(chatRoomID, lastMessages, msg, myData) {

    console.log("myData", myData.id)

    update(ref(DBReal, '/chatrooms/' + chatRoomID), {
        messages: [
            ...lastMessages,
            {
                SenderId: myData.id,
                text: msg[0].text,
                sender: myData.userName,
                createdAt: new Date(),
            },
        ],
    });
}
export async function NewNotifyCounter(userID, flag, newChatroomId, lastMassage) {


    console.log("=======lastMassage===========", lastMassage)

    if (flag == 1) {
        const checkOnListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 0);

        if (checkOnListFriends != null) {
            console.log("checkOnListFriends", checkOnListFriends)
            const myRef = ref(DBReal, '/users/' + userID + '/friends/' + checkOnListFriends);
            update(myRef, {
                notifyCounter: increment(1)
            });
        }
    }

    if (flag == 0) {
        const checkOnListFriends = await FindUserOnFriendList(auth.currentUser.uid, userID, 0);
        const myRef = ref(DBReal, '/users/' + auth.currentUser.uid + '/friends/' + checkOnListFriends);
        const data = await get(myRef);


        if (data.val() && data.val().notifyCounter) {
            let counter = data.val().notifyCounter
            console.log("counter", counter)
            update(myRef, {
                notifyCounter: increment(-counter)
            });
            // update(ref(DBReal, '/users/' + auth.currentUser.uid), {
            //     notifyCounter: increment(-counter)
            // });
        }
    }
}

export async function countNotify(userID) {
    // const checkOnListFriends = await FindUserOnFriendList(userID, auth.currentUser.uid, 0);
    const data = await get(ref(DBReal, '/users/' + userID));
    let friendsList = data.val().friends;
    let connter = 0;
    console.log("friendsList", friendsList)
    if (friendsList) {
        friendsList.forEach((friend) => {
            if (friend.notifyCounter) {
                connter += friend.notifyCounter;
            }

        });
    }
    return connter;
}
export async function UpdateNotify(userID) {
    const counter = await countNotify(userID);
    console.log("counter========", counter, userID)

    update(ref(DBReal, '/users/' + userID), {
        notifyCounter: counter
    });

}





