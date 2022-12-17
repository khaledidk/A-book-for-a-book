
import { collection, setDoc, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, Timestamp } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes, getStorage, deleteObject } from "firebase/storage";
import { DBFire, storage, auth } from "./firebase";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

// Add a new document with a generated id.
export async function addNewItem(bookName) {


  const docRef = await addDoc(collection(DBFire, 'book'), {
    name: bookName,

  })
    .catch(alert);
}

//add  to data base
export default async function addNewUser(userID, UserName, userEmail, userPhoneNumber, date) {

  console.log("enter yesssssssssssss")

  if (userEmail == 'None') {

    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      phoneNumber: userPhoneNumber,
      date: date,

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

export async function addNewbook(bookName, authorName, bookType, bookStatus, date, bookImgUri, userId) {
  const imageRef = await uploadImageAsync(bookImgUri);

  const docRef = await addDoc(collection(DBFire, 'books'), {
    title: bookName,
    image: imageRef.URL,
    image_name: imageRef.name,
    author_name: authorName,
    book_type: bookType,
    book_status: bookStatus,
    Date: Timestamp.fromDate(date).toDate(),
    user_id: userId,
  })
    .catch(alert);

  return docRef.id;

}
//fetch from data base
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
export async function fetchByUserId(userId) {

  const qry = query(collection(DBFire, 'books'), where('user_id', '==', userId));

  let Mycollection = await getDocs(qry);

  let arr = [];
  Mycollection.forEach(element => {
    let elementWithID = element.data();
    elementWithID["id"] = element.id //add ID to JSON
    arr.push(elementWithID);
  });

  return arr
}
export async function fetchByLisner() {

  const q = query(collection(DBFire, "books"), orderBy('Date', "desc"));
  // let arr = [];
  const unsubscribe = onSnapshot(q, (querySnapshot) => {

    console.log("new update");

  });



}
export async function fetchCurrentUserInfo() {
  const docRef = doc(DBFire, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  let userName = docSnap.data()["name"];
  let userEmail = docSnap.data()["email"];
  let userDate = docSnap.data()["date"];
  let userImage = null;
  let userPhone = null;
  if (docSnap.data()["image"]) {
    userImage = docSnap.data()["image"];
  } else {

  }
  if (docSnap.data()["phoneNumber"]) {
    userPhone = docSnap.data()["phoneNumber"];
  }
  // let userImage = docSnap.data()["image"];

  return { "name": userName, "email": userEmail, "date": userDate, "image": userImage, "phoneNumber": userPhone };
}

// delete from data base
function deleteFileFromStorage(fileName) {
  let fileRef = ref(storage, '/' + fileName);
  deleteObject(fileRef)
    .then(() => {
      console.log(`${fileName}has been deleted successfully.`);
    })
    .catch((e) => console.log('error on file deletion => ', e));

}

export async function deletePost(documentID) {
  let docRef = doc(DBFire, "books", documentID);
  const docSnap = await getDoc(docRef);
  let itemImgName = docSnap.data()["image_name"];
  deleteFileFromStorage(itemImgName);
  deleteDoc(doc(DBFire, "books", documentID));

}


export async function updatePost(bookId, updated_fields, date) {
  updated_fields["Date"] = Timestamp.fromDate(date).toDate();
  const itemRef = doc(DBFire, 'books', bookId);
  const docSnap = await getDoc(itemRef);
  console.log("========>", bookId)

  if (updated_fields.image === docSnap.data()['image']) { // no new image
    console.log("emterr")
    updateDoc(itemRef, updated_fields).catch(alert);
    return;
  }

  if (docSnap.data()["image_name"] !== null) {
    deleteFileFromStorage(docSnap.data()["image_name"]); //delete old image
  }

  const imageRef = await uploadImageAsync(updated_fields.image);
  updated_fields.image = imageRef.URL;
  updated_fields.image_name = imageRef.name;

  updateDoc(itemRef, updated_fields).catch(alert);

}
export async function updateUser(updated_fields) {
  const userDocRef = doc(DBFire, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(userDocRef);
  if (updated_fields.image === docSnap.data()['image']) { // no new image
    updateDoc(userDocRef, updated_fields).catch(alert);
    return;
  }


  if (docSnap.data()["imageName"] !== null) {
    deleteFileFromStorage(docSnap.data()["imageName"]); //delete old image
  }

  const imageRef = await uploadImageAsync(updated_fields.image);
  updated_fields.image = imageRef.URL;
  updated_fields.imageName = imageRef.name;

  updateDoc(userDocRef, updated_fields).catch(alert);

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