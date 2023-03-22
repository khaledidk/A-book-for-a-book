import { signInWithEmailAndPassword, createUserWithEmailAndPassword, PhoneAuthProvider, signInWithCredential, signOut, sendEmailVerification, sendPasswordResetEmail, signInWithPhoneNumber } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import addNewUser from './FireStoreDB'
import { DBFire, auth } from "./firebase";
import { Alert } from "react-native";




// sign in by email and password
export async function SignIn(email, password) {


    await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if (!user.emailVerified) {
                console.log("aaaaaaaaaaaaaaaaaaaaaaaa")
                throw new Error('* דוא״ל לא אומת.');

            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('errror code:' + error.code)
            console.log('errror massage:' + error.message)
            if (errorMessage == '* דוא״ל לא אומת.') {
                throw errorMessage;

            }
            if (errorCode == "auth/user-not-found") {
                throw "* דוא״ל לא נמצא."

            } else if (errorCode == "auth/wrong-password") {
                throw "* סיסמה אינו נכונה."
            } else {
                throw "* דוא״ל או סיסמה לא חוקי "
            }

        });


}

// sign out
export async function SignOut() {

    await signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

// creat user by email and password
export default async function createUser(email, password, name, number ) {


    await createUserWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
            // Signed in 
            console.log("Signed in")
            sendEmailVerification(auth.currentUser)


            const userID = userCredential.user.uid;

            addNewUser(userID, name, email, number)

            //  addNewUser(userID, name, email, phoneNumber);

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
            if (errorCode == "auth/email-already-in-use") {
                throw "* דוא״ל כבר בשימוש"

            } else {
                throw "* דוא״ל או סיסמה לא חוקי "
            }

        });

}

// reset password 
export async function resetEmailPassword(email) {
    await sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("wow")

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode == "auth/user-not-found") {
                throw "* דוא״ל לא נמצא."

            } else {
                throw "* דוא״ל לא חוקי."
            }



        });

}

// creat user by phone
export async function createUserbyPhone(userID, name, PhoneNumber, date, verificationId, code) {

    await addNewUser(userID, name, 'None', PhoneNumber, date, verificationId, code)

}
// sign in with phone number

export async function SignInWithPhoneNumber(phoneNumber) {

    let verificationId;
    let code;

    
   
    let docId = null;
     await getDocs(collection(DBFire, 'users')).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data()['phoneNumber'] == phoneNumber) {
                console.log(doc.id)
                docId = doc.id;
            }

        })
    })
    
    return docId;


}