import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { DBFire } from "./firebase";
// Add a new document with a generated id.
export async function addNewItem(bookName) {


  const docRef = await addDoc(collection(DBFire, 'book'), {
    name: bookName,

  })
    .catch(alert);
}


export default async function addNewUser(userID, UserName, userEmail, userPhoneNumber, date, verificationId, code) {

  console.log("enter yesssssssssssss")

  if (userEmail == 'None') {

    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      phoneNumber: userPhoneNumber,
      date: date,
      verificationId: verificationId,
      code: code,


    }).catch((error) => {
      console.log(error)
    });
  } else if (!userPhoneNumber) {
    console.log("userPhoneNumber: " + userPhoneNumber)
    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      email: userEmail,
      date: date,

    }).catch((error) => {
      console.log(error)
    });

  } else {

    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      date: date,

    }).catch((error) => {
      console.log(error)
    });

  }

}
export async function addNewUserByPhone(user, userID) {

}