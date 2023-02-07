


import { DBReal, auth } from "./firebase";
import { Image } from "react-native";
import { set, ref, child, push, update, get, onValue } from "firebase/database";
const profileDefaultImageUri = Image.resolveAssetSource(require('../../assets/defult_Profile.png')).uri;
export default async function CreatUserInRealDB(userID, UserName) {

    const newUserObj = {
        id: userID,

    };

    set(ref(DBReal, '/users/' + userID), newUserObj).catch((error) => {
        console.log(error)
    });

}

// find data 
export async function FindUser(userID) {



    const mySnapshot = await get(ref(DBReal, '/users/' + userID));

    return mySnapshot.val();

}

// add data
export async function AddFriend(userID) {

    try {

        //find user and add it to my friends and also add me to his friends

        const myData = await FindUser(auth.currentUser.uid)
        const otherUserData = await FindUser(userID);

        if (otherUserData) {


            // if (myData.friends && myData.friends.findIndex(f => f.username === otherUserData.username) > 0) {
            //     // don't let user add a user twice
            //     return;
            // }

            // create a chatroom and store the chatroom id

            const newChatroomRef = push(ref(DBReal, 'chatrooms'), {
                firstUser: myData.username,
                secondUser: otherUserData.username,
                messages: [],
            });

            const newChatroomId = newChatroomRef.key;

            const userFriends = otherUserData.friends || [];
            //join myself to this user friend list
            update(ref(DBReal, '/users/' + userID), {
                friends: [
                    ...userFriends,
                    {
                        id: auth.currentUser.uid,
                        chatroomId: newChatroomId,
                    },
                ],
            });
            const myFriends = myData.friends || [];
            //add this user to my friend list
            update(ref(DBReal, '/users/' + auth.currentUser.uid), {
                friends: [
                    ...myFriends,
                    {
                        id: userID,
                        chatroomId: newChatroomId,
                    },
                ],
            });
        }

    } catch (error) {
        console.error(error);
    }
};

// lisner
// export async function FriendsListListener() {

//     // set friends list change listener
//     const myUserRef = ref(DBReal, '/users/' + auth.currentUser.uid);
//     let userData = null;
//     onValue(myUserRef, snapshot => {
//         console.log("enterLister")

//         userData = snapshot.val();
//         return userData;
//     });


// }


// featch data 
export async function fetchMessages(chatRoomID) {


    const snapshot = await get(
        ref(DBReal, '/chatrooms/' + chatRoomID),
    );

    return snapshot.val();


}


// update data
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







// }