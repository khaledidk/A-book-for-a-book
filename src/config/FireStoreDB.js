import { collection, addDoc } from "firebase/firestore";
import { DBFire } from "./firebase";
// Add a new document with a generated id.
export async function addNewItem(bookName) {


    const docRef = await addDoc(collection(DBFire, 'book'), {
        name: bookName,

    })
        .catch(alert);
}