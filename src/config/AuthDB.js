import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, getIdToken } from "firebase/auth";
import addNewUser from './FireStoreDB'
import { db, auth, storage, app, } from "./firebase";
import { Alert } from "react-native";
// import { auth } from "./firebase";
export async function signIn(email, password) {


    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });


}
export async function SignOut() {

    await signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

export default async function createUser(email, password, name, number , date) {
  

    await createUserWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            // Signed in 
            console.log("Signed in")
            sendEmailVerification(auth.currentUser )

            const userID = userCredential.user.uid;

            addNewUser(userID, name, email, number , date)
            console.log(userID)
            //  addNewUser(userID, name, email, phoneNumber);

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
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

// document.addEventListener('DOMContentLoaded', () => {
//     // TODO: Implement getParameterByName()
  
//     // Get the action to complete.
//     const mode = getParameterByName('mode');
//     // Get the one-time code from the query parameter.
//     const actionCode = getParameterByName('oobCode');
//     // (Optional) Get the continue URL from the query parameter if available.
//     const continueUrl = getParameterByName('continueUrl');
//     // (Optional) Get the language code if available.
//     const lang = getParameterByName('lang') || 'en';
  
//     // Configure the Firebase SDK.
//     // This is the minimum configuration required for the API to be used.
//     const config = {
//       'apiKey': "YOU_API_KEY" // Copy this key from the web initialization
//                               // snippet found in the Firebase console.
//     };

    
//         handleVerifyEmail(auth, actionCode, continueUrl, lang);
     
    
//   }, false);