import { collection, addDoc , setDoc , doc } from "firebase/firestore";
import { DBFire } from "./firebase";
// Add a new document with a generated id.
export async function addNewItem(bookName) {


    const docRef = await addDoc(collection(DBFire, 'book'), {
        name: bookName,

    })
        .catch(alert);
}


export default async function addNewUser(userID, UserName, userEmail,  userPhoneNumber , date) {
 
     console.log("enter yesssssssssssss")
    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      date : date,

    }).catch((error) => {
  console.log(error)
    });
  
   
  }
  