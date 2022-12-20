import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView, Image } from "react-native";

import styles from "./styles";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import { Button, Modal } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import * as ImagePicker from 'expo-image-picker';
import BackButton from "../../components/BackButton/BackButton";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from '@expo/vector-icons';
import { bookValidator } from "../../helpers/bookValidator";
import { authorValidator } from "../../helpers/authorValidator";
import { addNewbook } from "../../config/FireStoreDB";
import { auth } from '../../config/firebase';
import { fetchtUserNameAndImage } from "../../config/FireStoreDB";
export default function AddBook(props) {
  const { navigation } = props;
  const [bookStatus, setBookStatus] = useState([
    { label: "בשימוש", value: "בשימוש" },
    { label: "חדש", value: "חדש" },


  ]);
  const [bookTypes, setBookTypes] = useState([
    { label: "סיפורי הרפתקאות", value: "סיפורי הרפתקאות" },
    { label: "קלאסיקה", value: "קלאסיקה" },
    { label: "פשה", value: "פשה" },
    { label: "פנטזיה", value: "פנטזיה" },
    { label: "היסטורית", value: "היסטורית" },
    { label: "אגדות, אגדות וסיפורי עם", value: "אגדות, אגדות וסיפורי עם" },
    { label: "זועה", value: "זועה" },
    { label: "ספרותית", value: "ספרותית" },
    { label: "מסתורין", value: "מסתורין" },
    { label: "הומור וסאטירה", value: "הומור וסאטירה" },
    { label: "שירה", value: "שירה" },
    { label: "רומנטיקה", value: "רומנטיקה" },
    { label: "מדע בדיוני", value: "מדע בדיוני" },
    { label: "סיפורים קצרים", value: "סיפורים קצרים" },
    { label: "מותחנים", value: "מותחנים" },
    { label: "מלחמה", value: "מלחמה" },
    { label: "ספרות נשים", value: "ספרות נשים" },
    { label: "מבוגר צעיר", value: "מבוגר צעיר" },
    { label: "מחזות", value: "מחזות" },
  ]);
  const [bookTypesVal, setBookTypesVal] = useState("")
  const [bookTypesError, setBookTypesError] = useState(false)
  const [openTypeDrop, setOpenTypeDrop] = useState(false)
  const [bookStatusVal, setBookStatusVal] = useState("")
  const [bookStatusError, setBookStatusError] = useState(false)
  const [openStatusDrop, setOpenStatusDrop] = useState(false)
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false)
  const [bookName, setBookName] = useState({ value: "", error: "" });
  const [authorName, setAuthorName] = useState({ value: "", error: "" });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });



    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  async function onRegisterPressed() {
    const bookNameError = bookValidator(bookName.value)
    const authorNameError = authorValidator(authorName.value)

    if (bookNameError || authorNameError || !bookTypesVal || !bookStatusVal || !image) {
      if (!image) {

        setImageError(true)
      } else {
        console.log(image)
        setImageError(false)
      }

      if (!bookTypesVal) {

        setBookTypesError(true)
      } else {

        setBookTypesError(false)
      }
      if (!bookStatusVal) {

        setBookStatusError(true)
      } else {

        setBookStatusError(false)
      }
      console.log(bookTypesError)
      setBookName({ ...bookName, error: bookNameError });
      setAuthorName({ ...authorName, error: authorNameError });
      return;
    }
    setBookTypesError(false)
    setImageError(false)
    let tempeDate = new Date()
    let fDate = tempeDate.getDate() + '/' + (tempeDate.getMonth() + 1) + '/' + tempeDate.getFullYear() + ',' + tempeDate.getHours() + ':' + tempeDate.getMinutes() + ':' + tempeDate.getSeconds();
 
    const user = auth.currentUser;
    const uid = user.uid;
     fetchtUserNameAndImage(uid).then((userInfo) => {
      addNewbook(bookName.value, authorName.value, bookTypesVal, bookStatusVal, tempeDate, image, uid , userInfo.userImage,  userInfo.userName ).then((bookId) => {
        console.log(bookId)
        let newBookJson = {
          id: bookId,
          image: image,
          title: bookName.value,
          author_name: authorName.value,
          book_type: bookTypesVal,
          book_status: bookStatusVal,
          user_image : userInfo.userImage,
          user_name  : userInfo.userName,
  
        }
        navigation.navigate("Home", { newBookJson: newBookJson , status : 'add' })
  
      })


     })
   




  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : ""}

    >
      <BackButton goBack={props.navigation.goBack} />
      <ScrollView
        style={styles.container}

        showsVerticalScrollIndicator={false}
      >

        <View>

          <View style={styles.ImageBackGround} ></View>

          {/*  Bootom View  */}
          <View style={styles.BootomView}>
            {/* Welcome you  */}
            <View style={styles.WelcomeView} >
              <View style={styles.addImageButton}  >


                <MaterialIcons name={"add-photo-alternate"} size={100} color={"#ff914d"} onPress={pickImage} />


                {image && <Image source={{ uri: image }} style={styles.bookImage} />}
                {imageError ? <Text style={styles.typeErrorFont}>* לבחור תמונה  חובה</Text> : null}
              </View>
              {/* // input View  */}

              <View style={styles.InputView}>
                <TextInput
                  label="שם הספר"
                  returnKeyType="next"
                  value={bookName.value}
                  onChangeText={(text) => setBookName({ value: text, error: "" })}
                  error={!!bookName.error}
                  errorText={bookName.error}
                  autoCapitalize="none"
                  book="book"


                />
                <TextInput
                  label="שם הסופר"
                  returnKeyType="next"
                  value={authorName.value}
                  onChangeText={(text) => setAuthorName({ value: text, error: "" })}
                  error={!!authorName.error}
                  errorText={authorName.error}
                  autoCapitalize="none"
                  userIcon='user-o'

                />
                {/* Drop Down for type */}

                {/* <View style={{ zIndex: 100 }}> */}
                <DropDownPicker
                  style={styles.DropDown}
                  open={openTypeDrop}
                  value={bookTypesVal} //genderValue
                  items={bookTypes}
                  setValue={setBookTypesVal}
                  setItems={setBookTypes}
                  setOpen={setOpenTypeDrop}
                  placeholder="בחר סוג הספר"
                  containerStyle={styles.ContainerDropDown}
                  textStyle={styles.listItemContainerFont}
                  listItemContainerStyle={styles.listItemContainer}
                  listItemLabelStyle={styles.listItemContainerFont}
                  dropDownContainerStyle={styles.DropDown}
                  listMode="SCROLLVIEW"
                //  zIndex={100}
                //  defaultIndex={0}
                // zIndexInverse={1000}
                />

                {/* </View> */}

                {bookTypesError ? <Text style={styles.typeErrorFont}>* לבחור סוג ספר חובה</Text> : null}

                <View style={{ zIndex: 2, marginTop: 60 }}>

                  {/* </View> */}
                  <DropDownPicker
                    style={styles.DropDown}
                    open={openStatusDrop}
                    value={bookStatusVal} //genderValue
                    items={bookStatus}
                    setValue={setBookStatusVal}
                    setItems={setBookStatus}
                    setOpen={setOpenStatusDrop}
                    placeholder="בחר מצב הספר"
                    containerStyle={styles.ContainerDropDown}
                    textStyle={styles.listItemContainerFont}
                    listItemContainerStyle={styles.listItemContainer}
                    listItemLabelStyle={styles.listItemContainerFont}
                    dropDownContainerStyle={styles.DropDown}
                    listMode="SCROLLVIEW"

                  // zIndexInverse={1000}
                  />
                </View>
                {bookStatusError ? <Text style={styles.typeErrorFont}>* לבחור מצב הספר חובה</Text> : null}


                <Button
                  style={styles.addButton}
                  labelStyle={styles.addButtonFont}
                  mode="contained"
                  onPress={onRegisterPressed}>
                  הוסיף
                </Button>





              </View>



            </View>

          </View>
        </View>


      </ScrollView>
    </KeyboardAvoidingView>

  );
}
