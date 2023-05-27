
import { collection, setDoc, doc, addDoc, getDocs, getDoc, updateDoc, deleteDoc, onSnapshot, query, orderBy, where, Timestamp } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytesResumable, uploadBytes, getStorage, deleteObject } from "firebase/storage";

import { DBFire, storage, auth, DBReal } from "./firebase";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import { Image } from "react-native";
import CreatUserInRealDB from "./RealTimeDB";

const profileDefaultImageUri = Image.resolveAssetSource(require('../../assets/defult_Profile.png')).uri;

//*********************** Add *********************************//

//this function add new user to firestore
export default async function addNewUser(userID, UserName, userEmail, userPhoneNumber, latitude, longitude) {
  try {
    CreatUserInRealDB(userID)

    if (!userPhoneNumber) {
      console.log("userPhoneNumber: " + userPhoneNumber)
      await setDoc(doc(DBFire, "users", userID), {
        name: UserName,
        email: userEmail,


      })

    } else {

      await setDoc(doc(DBFire, "users", userID), {
        name: UserName,
        email: userEmail,
        phoneNumber: userPhoneNumber,


      })

    }
  } catch (error) {
    throw new Error(error.message);
  }

}

export async function addNewUserWithPhone(userID, UserName, userPhoneNumber) {
  try {
    CreatUserInRealDB(userID)


    await setDoc(doc(DBFire, "users", userID), {
      name: UserName,
      phoneNumber: userPhoneNumber,
      status: "phone"


    })


  } catch (error) {
    throw new Error(error.message);
  }

}

// this function add new book to firestore
export async function addNewbook(bookName, authorName, bookType, bookStatus, date, bookImgUri, userId, userImage, userName, bookLanguage, ratingValue) {
  try {
    const imageRef = await uploadImageAsync(bookImgUri);
    let docRef;
    if (userImage) {

      docRef = await addDoc(collection(DBFire, 'books'), {
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

    } else {
      docRef = await addDoc(collection(DBFire, 'books'), {
        title: bookName,
        image: imageRef.URL,
        image_name: imageRef.name,
        author_name: authorName,
        book_type: bookType,
        book_status: bookStatus,
        Date: Timestamp.fromDate(date).toDate(),
        user_id: userId,
        user_name: userName,
        book_language: bookLanguage,
        rating_value: ratingValue,
      })



    }

    return docRef.id;
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function add feedback to firestore 
export async function addFeedBack(Remarks, rating, userID) {

  try {
    const docRef = await addDoc(collection(DBFire, 'feedBack'), {
      user_id: userID,// feedback gives for this id
      currUserID: auth.currentUser.uid, // who write
      rating: rating,
      Remarks: Remarks,
    })

    return docRef.id;
  } catch (error) {
    throw new Error(error.message);
  }

}



export async function addBookRequest(requestObj) {

  try {
    const docRef = await addDoc(collection(DBFire, 'BookRequest'), {
      FirstBook_ID: requestObj.FirstBook_ID,
      SecondBook_ID: requestObj.SecondBook_ID,
      sender_ID: requestObj.sender_ID,
      receive_ID: requestObj.receive_ID,
    })

  } catch (error) {
    throw new Error(error.message);
  }

}
//*********************** fetch *********************************//
export async function fetchBookSorted() {


  try {
    const qry = query(collection(DBFire, 'books'), orderBy('Date', "desc"))
    const Mycollection = await getDocs(qry)
    let arr = [];

    Mycollection.forEach(element => {
      let elementWithID = element.data();
      elementWithID["id"] = element.id //add ID to JSON 
      arr.push(elementWithID);
    });

    return arr;
  } catch (error) {
    throw new Error(error.message);
  }

}
// this function fetch book data by book ID
export async function fetchBookDataById(bookId) {
  try {
    let booksArray = await fetchBookSorted()

    let temp = booksArray.filter(element => element.id == bookId);

    return temp;
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch user data
export async function fetchOtherUsers() {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch all user feedback
async function fetchFeedBack(userId) {

  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch book request for sender  buy  user ID
export async function fetchMyBooksRequestsById(userId) {

  try {
    const qry = query(collection(DBFire, 'BookRequest'), where('sender_ID', '==', userId));


    const Mycollection = await getDocs(qry);
    let arr = [];

    Mycollection.forEach(element => {
      let elementWithID = element.data();
      elementWithID["id"] = element.id //add ID to JSON 
      if (!elementWithID.status) {
        elementWithID["status"] = "בתהליך"
      }

      arr.push(elementWithID);


    });


    return arr;
  } catch (error) {
    throw new Error(error.message);
  }

}

// this function fetch book request for receiver buy  user ID
export async function fetchBooksRequestsById(userId) {

  try {
    const qry = query(collection(DBFire, 'BookRequest'), where('receive_ID', '==', userId));


    const Mycollection = await getDocs(qry);
    let arr = [];

    Mycollection.forEach(element => {
      let elementWithID = element.data();
      elementWithID["id"] = element.id //add ID to JSON 
      if (!elementWithID.status) {
        arr.push(elementWithID);
      }



    });


    return arr;
  } catch (error) {
    throw new Error(error.message);
  }

}

// this function fetch current user  book request and data
export async function fetchMyBooksRequestsAndData(userId) {

  try {
    let requestArray = await fetchMyBooksRequestsById(userId);
    let resultArray = [], temp1, temp2;
    for (let i = 0; i < requestArray.length; i++) {
      temp1 = await fetchBookDataById(requestArray[i].FirstBook_ID)
      temp2 = await fetchBookDataById(requestArray[i].SecondBook_ID)
      if (temp2.length == 0 || temp1.length == 0) {

        continue;
      }

      let temp2obj = [{
        Data2: temp2[0].Date,
        id: requestArray[i].id,
        bookId2: temp2[0].id,
        author_name2: temp2[0].author_name,
        book_language2: temp2[0].book_language,
        book_status2: temp2[0].book_status,
        book_type2: temp2[0].book_type,
        image2: temp2[0].image,
        image_name2: temp2[0].image_name,
        rating_value2: temp2[0].rating_value,
        title2: temp2[0].title,
        user_id2: temp2[0].user_id,
        user_image2: temp2[0].user_image,
        user_name2: temp2[0].user_name,
      }]

      temp1[0]["bookId1"] = temp1[0].id
      temp1[0]["id"] = requestArray[i].id
      temp1[0]["status"] = requestArray[i].status

      resultArray.push(temp1.concat(temp2obj))
    }

    return resultArray;
  } catch (error) {
    throw new Error(error.message);
  }

}

// this function fetch other user book request and data
export async function fetchBooksRequestsAndData(userId) {

  try {
    let requestArray = await fetchBooksRequestsById(userId);
    let resultArray = [], temp1, temp2;
    for (let i = 0; i < requestArray.length; i++) {
      temp1 = await fetchBookDataById(requestArray[i].FirstBook_ID)
      temp2 = await fetchBookDataById(requestArray[i].SecondBook_ID)
      if (temp2.length == 0 || temp1.length == 0) {
        console.log("enterr", temp1, temp2)
        continue;
      }
      let temp2obj = [{
        Data2: temp2[0].Date,
        bookId2: temp2[0].id,
        author_name2: temp2[0].author_name,
        book_language2: temp2[0].book_language,
        book_status2: temp2[0].book_status,
        book_type2: temp2[0].book_type,
        image2: temp2[0].image,
        image_name2: temp2[0].image_name,
        rating_value2: temp2[0].rating_value,
        title2: temp2[0].title,
        user_id2: temp2[0].user_id,
        user_image2: temp2[0].user_image,
        user_name2: temp2[0].user_name,
      }]

      temp1[0]["bookId1"] = temp1[0].id
      temp1[0]["id"] = requestArray[i].id

      resultArray.push(temp1.concat(temp2obj))
    }
    // console.log("resultArray"  ,  resultArray)
    return resultArray;
  } catch (error) {
    throw new Error(error.message);
  }

}

// this function fetch feedbacj with user data
export async function fetchFeedBackWithUserDetails(userId) {

  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch book data bu suer ID
export async function fetchByUserId(userId) {
  try {
    const qry = query(collection(DBFire, 'books'), where('user_id', '==', userId));

    let Mycollection = await getDocs(qry);

    let arr = [];
    Mycollection.forEach(element => {
      let elementWithID = element.data();
      elementWithID["id"] = element.id //add ID to JSON
      arr.push(elementWithID);
    });

    return arr
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch current user data
export async function fetchCurrentUserInfo(userId) {

  try {
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
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch current user data
export async function fetchCurrentUserAllInfo(userId) {
  try {
    const docRef = doc(DBFire, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch current user loction
export async function fetchCurrentUserLoction(userId) {
  try {
    const docRef = doc(DBFire, "users", userId);
    const docSnap = await getDoc(docRef);
    let latitude, longitude;
    if (docSnap.data()["latitude"] && docSnap.data()["longitude"]) {
      latitude = docSnap.data()["latitude"];
      longitude = docSnap.data()["longitude"];
    } else {
      return null;
    }


    return { "latitude": latitude, "longitude": longitude };
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch user name and image by user ID
export async function fetchtUserNameAndImage(userID) {

  try {
    const docRef = doc(DBFire, "users", userID);
    const docSnap = await getDoc(docRef);
    let userName = docSnap.data()["name"];

    let userImage = null;
    if (docSnap.data()["image"]) {
      userImage = docSnap.data()["image"];
      return { "userName": userName, "userImage": userImage };
    } else {
      return { "userName": userName };
    }



  } catch (error) {
    throw new Error(error.message);
  }
}

// this function fetch books loctions 
export async function fetchBookLoction() {
  try {
    let result_array = []

    let books_array = await fetchBookSorted();

    for (let i = 0; i < books_array.length; i++) {
      let element = books_array[i];
      let user_loction = await fetchCurrentUserLoction(books_array[i].user_id);
      if (user_loction) {
        element["latitude"] = user_loction.latitude;
        element["longitude"] = user_loction.longitude;
        result_array.push(element);
      }
    }

    return result_array;
  } catch (error) {
    throw new Error(error.message);
  }
}

//*********************** check *********************************//

// this function check if the user have already request with this book
export async function checkBookRequest(FirstBook_ID, SecondBook_ID) {
  try {
    const qry1 = query(collection(DBFire, 'BookRequest'));
    const qry2 = query(collection(DBFire, 'BookRequest'), where('FirstBook_ID', '==', FirstBook_ID), where('SecondBook_ID', '==', SecondBook_ID));
    const qry3 = query(collection(DBFire, 'BookRequest'), where('FirstBook_ID', '==', SecondBook_ID), where('SecondBook_ID', '==', FirstBook_ID));
    const Mycollection1 = await getDocs(qry1);
    const Mycollection2 = await getDocs(qry2);
    const Mycollection3 = await getDocs(qry3)


    console.log("size1", Mycollection1.size, "size2", Mycollection2.size)
    if (Mycollection1.size > 0 && (Mycollection2.size > 0 || Mycollection3.size > 0)) {
      return false
    } else {
      return true
    }
  } catch (error) {
    throw new Error(error.message);
  }


}
// check if the user have already account
export async function checkUserInfo(phoneNumber) {
  try {
    const qry = query(collection(DBFire, 'users'), where('status', '==', "phone"), where('phoneNumber', '==', phoneNumber));

    const Mycollection = await getDocs(qry);

    if (Mycollection.size > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error(error.message);
  }



}
//*********************** delete *********************************//

// this function delete photo from stroage store
function deleteFileFromStorage(fileName) {
  let fileRef = ref(storage, '/' + fileName);
  console.log("enter image delet")
  deleteObject(fileRef)
    .then(() => {
      console.log(`${fileName}has been deleted successfully.`);
    })
    .catch((error) => { throw new Error(error.message) });

}
export async function deletBookRequest(book_ID) {
  try {
    console.log("book_ID", book_ID)
    const qry1 = query(collection(DBFire, 'BookRequest'), where('FirstBook_ID', '==', book_ID));
    const qry2 = query(collection(DBFire, 'BookRequest'), where('SecondBook_ID', '==', book_ID));

    const Mycollection1 = await getDocs(qry1);
    const Mycollection2 = await getDocs(qry2);

    console.log("Mycollection1.size ", Mycollection1.size)
    console.log("Mycollection2.size ", Mycollection2.size)

    if (Mycollection1.size > 0) {
      Mycollection1.forEach(element => {
        console.log("element.id", element.id)
        deleteRequest(element.id)


      });
    }

    if (Mycollection2.size > 0) {
      Mycollection2.forEach(element => {
        console.log("element.id", element.id)
        deleteRequest(element.id)


      });
    }
  } catch (error) {
    throw new Error(error.message);
  }


}

// this function delete the the post 
export async function deletePost(documentID) {
  try {
    let docRef = doc(DBFire, "books", documentID);
    const docSnap = await getDoc(docRef);
    let itemImgName = docSnap.data()["image_name"];
    deleteFileFromStorage(itemImgName)
    deleteDoc(doc(DBFire, "books", documentID));
    deletBookRequest(documentID)
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function delete request 
export async function deleteRequest(documentID) {


  deleteDoc(doc(DBFire, "BookRequest", documentID)).catch((error) => { throw new Error(error.message) });;

}

// this function update user post
export async function updatePost(bookId, updated_fields, date) {

  try {
    updated_fields["Date"] = Timestamp.fromDate(date).toDate();
    const itemRef = doc(DBFire, 'books', bookId);
    const docSnap = await getDoc(itemRef);

    console.log(" image local =======", updated_fields.image)
    if (updated_fields.image === docSnap.data()['image']) { // no new image
      console.log("no new image")
      updateDoc(itemRef, updated_fields)

      return;
    }

    if (docSnap.data()["image_name"]) {
      deleteFileFromStorage(docSnap.data()["image_name"]); //delete old image
    }

    const imageRef = await uploadImageAsync(updated_fields.image);
    updated_fields.image = imageRef.URL;
    updated_fields.image_name = imageRef.name;

    updateDoc(itemRef, updated_fields)
  } catch (error) {
    throw new Error(error.message);
  }

}

// this function update user details
export async function updateUser(updated_fields) {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }


}

// this function update user loction
export async function updateUserLoction(updated_fields) {
  try {
    const userDocRef = doc(DBFire, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    updateDoc(userDocRef, updated_fields).catch(alert);
  } catch (error) {
    throw new Error(error.message);
  }
}

// this function upadate user requsest
export async function updateBookRequest(requestId, updated_fields) {
  try {
    const userDocRef = doc(DBFire, 'BookRequest', requestId);
    const docSnap = await getDoc(userDocRef);
    updateDoc(userDocRef, updated_fields)
  } catch (error) {
    throw new Error(error.message);
  }

}

// this function update current user post
export async function updatePostByuser(userId, updated_fields) {
  try {
    console.log("updated_fields post ========: ", updated_fields)
    const qry = query(collection(DBFire, 'books'), where('user_id', '==', userId));

    let Mycollection = await getDocs(qry);


    Mycollection.forEach(element => {
      const itemRef = doc(DBFire, 'books', element.id);
      updateDoc(itemRef, updated_fields).catch(alert);

    });

  } catch (error) {
    throw new Error(error.message);
  }

}
// this funcrion generate image Name
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

// this function upload image to stoarge DB
export async function uploadImageAsync(imageURI) {
  try {
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
  } catch (error) {
    throw new Error(error.message);
  }

}