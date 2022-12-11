
import { collection, setDoc, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, increment, query, orderBy, where, Timestamp } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes, getStorage, deleteObject } from "firebase/storage";
import { DBFire, storage } from "./firebase";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
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
export async function addNewbook(bookName, authorName, bookType, bookStatus, date, bookImgUri) {
  const imageRef = await uploadImageAsync(bookImgUri);

  const docRef = await addDoc(collection(DBFire, 'books'), {
    title: bookName,
    image: imageRef.URL,
    author_Name: authorName,
    book_type: bookType,
    book_status: bookStatus,
    Date: date,
  })
    .catch(alert);

  return docRef.id;

}
export async function fetchBookSorted() {
  const qry = query(collection(DBFire, 'books'), orderBy('Date', "desc"));

  let Mycollection = await getDocs(qry);

  let arr = [];
  Mycollection.forEach(element => {
    let elementWithID = element.data();
    elementWithID["id"] = element.id //add ID to JSON
    arr.push(elementWithID);
  });


  return arr;
}
function generateName() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
async function compressImage(imageURI) {
  console.log("compressing image...");
  const resizedPhoto = await manipulateAsync(
    imageURI,
    [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio 
    { compress: 0.7, format: "jpeg" },
  );
  console.log("end compressing.");
  return resizedPhoto.uri;
}
export async function uploadImageAsync(imageURI) {
  imageURI = await compressImage(imageURI);
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", imageURI, true);
    xhr.send(null);
  });
  let imgName = generateName();
  const fileRef = ref(storage, imgName);
  const result = await uploadBytes(fileRef, blob);
  // We're done with the blob, close and release it
  blob.close();
  let imgURL = await getDownloadURL(fileRef);
  console.log("Image URL: " + imgURL);
  return { name: imgName, URL: imgURL };

}