import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import addNewUser from './FireStoreDB'
import { db, auth, storage, app, } from "./firebase";
import { Alert } from "react-native";
// import { auth } from "./firebase";
export async function signIn(email, password) {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });

}

export default async function createUser(email, password, name, number) {




    await createUserWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            // Signed in 
            console.log("Signed in")
            const userID = userCredential.user.uid;
            addNewUser(userID, name, email, number)
            console.log(userID)
            //  addNewUser(userID, name, email, phoneNumber);

        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode == "auth/email-already-in-use") {
                throw "דוא״ל כבר בשימוש"

            } else {
                throw "דוא״ל או סיסמה לא חוקי "
            }


        });




}


export function resetEmailPassword(email) {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            Alert.alert("Password reset email has been sent to " + email);
        }, (error) => {
            Alert.alert(error.message);
        });
}