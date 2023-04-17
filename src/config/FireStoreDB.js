
import { collection, setDoc, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, Timestamp } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes, getStorage, deleteObject } from "firebase/storage";

import { DBFire, storage, auth, DBReal } from "./firebase";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { Image } from "react-native";
import CreatUserInRealDB from "./RealTimeDB";
import { UpdateAvater } from "./RealTimeDB";
const profileDefaultImageUri = Image.resolveAssetSource(require('../../assets/defult_Profile.png')).uri;

//add  to data base
export default async function addNewUser(userID, UserName, userEmail, userPhoneNumber, latitude, longitude) {

  CreatUserInRealDB(userID, UserName)

  if (!userPhoneNumber) {
    console.log("userPhoneNumber: " + userPhoneNumber)
    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      email: userEmail,


    }).catch((error) => {
      console.log(error)
    });

  } else {

    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      email: userEmail,
      phoneNumber: userPhoneNumber,


    }).catch((error) => {
      console.log(error)
    });

  }

}

export async function addNewbook(bookName, authorName, bookType, bookStatus, date, bookImgUri, userId, userImage, userName, bookLanguage, ratingValue) {
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
    user_image: userImage,
    user_name: userName,
    book_language: bookLanguage,
    rating_value: ratingValue,
  })
    .catch(alert);

  return docRef.id;

}

export async function addFeedBack(Remarks, rating, userID) {


  const docRef = await addDoc(collection(DBFire, 'feedBack'), {
    user_id: userID,// feedback gives for this id
    currUserID: auth.currentUser.uid, // who write
    rating: rating,
    Remarks: Remarks,
  }).catch(alert);

  return docRef.id;

}
//fetch from data base
export async function fetchBookSorted() {
  const qry = query(collection(DBFire, 'books'), orderBy('Date', "desc"));


  const Mycollection = await getDocs(qry);
  let arr = [];

  Mycollection.forEach(element => {
    let elementWithID = element.data();
    elementWithID["id"] = element.id //add ID to JSON 
    arr.push(elementWithID);
  });
  //  console.log("arr" , arr)
  return arr;
}
export async function fetchOtherUsers() {
  const qry = query(collection(DBFire, 'users'));


  const Mycollection = await getDocs(qry);
  let arr = [];

  Mycollection.forEach(element => {
    let elementWithID = element.data();
    if (element.id != auth.currentUser.uid) {
      elementWithID["id"] = element.id //add ID to JSON 
      arr.push(elementWithID);
    }


  });


  return arr;
}

async function fetchFeedBack(userId) {
  const qry = query(collection(DBFire, 'feedBack'), where('user_id', '==', userId));


  const Mycollection = await getDocs(qry);
  let arr = [];

  Mycollection.forEach(element => {
    let elementWithID = element.data();
    if (element.id != auth.currentUser.uid) {
      elementWithID["id"] = element.id //add ID to JSON 
      arr.push(elementWithID);
    }


  });


  return arr;
}
export async function fetchFeedBackWithUserDetails(userId) {
  
  let temp_array = await fetchFeedBack(userId);
  let result_array = [], element, temp;
  for (let i = 0; i < temp_array.length; i++) {
    element = temp_array[i];
    temp = await fetchtUserNameAndImage(element.currUserID)
   
    element["user_name"] = temp.userName;
    element["user_image"] = temp.userImage;
    result_array.push(element)

  }



  return result_array;
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

export async function fetchCurrentUserInfo(userId) {
  const docRef = doc(DBFire, "users", userId);
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
export async function fetchCurrentUserAllInfo(userId) {
  const docRef = doc(DBFire, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}
export async function fetchCurrentUserLoction(userId) {
  const docRef = doc(DBFire, "users", userId);
  const docSnap = await getDoc(docRef);
  let latitude, longitude;
  if (docSnap.data()["latitude"] && docSnap.data()["longitude"]) {
    latitude = docSnap.data()["latitude"];
    longitude = docSnap.data()["longitude"];
  }else{
    return null;
  }


  return { "latitude": latitude, "longitude": longitude };
}

export async function fetchtUserNameAndImage(userID) {
  const docRef = doc(DBFire, "users", userID);
  const docSnap = await getDoc(docRef);
  let userName = docSnap.data()["name"];

  let userImage = null;
  if (docSnap.data()["image"]) {
    userImage = docSnap.data()["image"];
  } else {
    userImage = profileDefaultImageUri;
  }

  // let userImage = docSnap.data()["image"];

  return { "userName": userName, "userImage": userImage };
}
export async function fetchBookByLanguage(bookLanguage) {
  const qry = query(collection(DBFire, 'books'), where('book_language', 'in', bookLanguage));


  const Mycollection = await getDocs(qry);
  let arr = [];

  Mycollection.forEach(element => {
    let elementWithID = element.data();
    elementWithID["id"] = element.id //add ID to JSON 
    arr.push(elementWithID);
  });



  //  console.log("arr" , arr)
  return arr;
}
export async function fetchBookLoction() {
  let result_array = []

  let books_array = await fetchBookSorted();

  for (let i = 0; i < books_array.length; i++) {
    let element = books_array[i];
    let user_loction = await fetchCurrentUserLoction(books_array[i].user_id);
   if(user_loction){
    element["latitude"] = user_loction.latitude;
    element["longitude"] = user_loction.longitude;
    result_array.push(element);
   }
  }

  return result_array;
}

// delete from data base
function deleteFileFromStorage(fileName) {
  let fileRef = ref(storage, '/' + fileName);
  console.log("enter image delet")
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

  console.log(" image local =======", updated_fields.image)
  if (updated_fields.image === docSnap.data()['image']) { // no new image
    console.log("no new image")
    updateDoc(itemRef, updated_fields).catch(alert);

    return;
  }

  if (docSnap.data()["image_name"]) {
    deleteFileFromStorage(docSnap.data()["image_name"]); //delete old image
  }

  const imageRef = await uploadImageAsync(updated_fields.image);
  updated_fields.image = imageRef.URL;
  updated_fields.image_name = imageRef.name;

  updateDoc(itemRef, updated_fields).catch(alert);

}
export async function updateUser(updated_fields) {
  let UpdatePost = {

    user_name: updated_fields.name,
  }

  const userDocRef = doc(DBFire, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(userDocRef);
  if (updated_fields.image === docSnap.data()['image']) { // no new image
    updateDoc(userDocRef, updated_fields).catch(alert);
    updatePostByuser(auth.currentUser.uid, UpdatePost)
    return;
  }


  if (docSnap.data()["imageName"]) {
    deleteFileFromStorage(docSnap.data()["imageName"]); //delete old image
  }

  const imageRef = await uploadImageAsync(updated_fields.image);
  updated_fields.image = imageRef.URL;
  updated_fields.imageName = imageRef.name;
  console.log("UpdatePost ====================== ")
  UpdatePost["user_image"] = imageRef.URL


  updateDoc(userDocRef, updated_fields).catch(alert);
  updatePostByuser(auth.currentUser.uid, UpdatePost)


}

export async function updateUserLoction(updated_fields) {
  const userDocRef = doc(DBFire, 'users', auth.currentUser.uid);
  const docSnap = await getDoc(userDocRef);
  updateDoc(userDocRef, updated_fields).catch(alert);

}


export async function updatePostByuser(userId, updated_fields) {
  console.log("updated_fields post ========: ", updated_fields)
  const qry = query(collection(DBFire, 'books'), where('user_id', '==', userId));

  let Mycollection = await getDocs(qry);


  Mycollection.forEach(element => {
    const itemRef = doc(DBFire, 'books', element.id);
    updateDoc(itemRef, updated_fields).catch(alert);

  });

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