import React, { useLayoutEffect, useState } from "react";
import { TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView, Image } from "react-native";

import styles from "./styles";
import { Rating, AirbnbRating } from 'react-native-ratings';
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
  const [bookLanguage, setBookLanguage] = useState([
    { label: "אנגלית", value: "אנגלית" },
    { label: "סינית", value: "סינית" },
    { label: "הינדי", value: "הינדי" },
    { label: "ספרדית", value: "ספרדית" },
    { label: "צרפתית", value: "צרפתית" },
    { label: "ערבית", value: "ערבית" },
    { label: "בנגלית", value: "בנגלית" },
    { label: "רוסי", value: "רוסי" },
    { label: "פורטוגזית", value: "פורטוגזית" },
    { label: "אינדונזית", value: "אינדונזית" },
    { label: "אורדו", value: "אורדו" },
    { label: "יפּנית", value: "יפּנית" },
    { label: "גרמנית", value: "גרמנית" },
    { label: "פנג'בי", value: "פנג'בי" },
    { label: "ג'אווה", value: "ג'אווה" },
    { label: "טלוגו", value: "טלוגו" },
    { label: "טורקי", value: "טורקי" },
    { label: "קוריאנית", value: "קוריאנית" },
    { label: "איטלקית", value: "איטלקית" },
    { label: "הולנדי", value: "הולנדי" },
    { label: "מראטי", value: "מראטי" },
    { label: "אידישׁ", value: "אידישׁ" },
    { label: "לטינית", value: "לטינית" },
    { label: "שוודית", value: "שוודית" },
    { label: "דני", value: "דני" },
    { label: "יווני", value: "יווני" },
    { label: "צ'כית", value: "צ'כית" },
    { label: "פולני", value: "פולני" },
    { label: "ארמני", value: "ארמני" },
    { label: "אוקראינית", value: "אוקראינית" },
    { label: "הונגרי", value: "הונגרי" },
    { label: "סנסקריט", value: "סנסקריט" },
    { label: "שפות אחרות", value: "שפות אחרות" },
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
  const [bookLanguageError, setBookLanguageError] = useState(false)
  const [openStatusDrop, setOpenStatusDrop] = useState(false)
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false)
  const [bookName, setBookName] = useState({ value: "", error: "" });
  const [authorName, setAuthorName] = useState({ value: "", error: "" });
  const [bookLanguageVal, setBookLanguageVal] = useState("");
  const [openLanguageDrop, setOpenLanguageDrop] = useState(false)
  const [starRating, setStarRating] = useState(3)
  const bookLanguageSorted = [...bookLanguage].sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  // const starRatingFunc = (value) =>{
  //        console.log("starRating" ,value )
  // }
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

  async function onAddPressed() {
    const bookNameError = bookValidator(bookName.value)
    const authorNameError = authorValidator(authorName.value)

    if (bookNameError || authorNameError || !bookTypesVal || !bookStatusVal || !image || !bookLanguageVal) {

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
      if (!bookLanguageVal) {

        setBookLanguageError(true)
      } else {

        setBookLanguageError(false)
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
      addNewbook(bookName.value, authorName.value, bookTypesVal, bookStatusVal, tempeDate, image, uid, userInfo.userImage, userInfo.userName, bookLanguageVal, starRating).then((bookId) => {
        console.log(bookId)
        let newBookJson = {
          id: bookId,
          image: image,
          title: bookName.value,
          author_name: authorName.value,
          book_type: bookTypesVal,
          book_status: bookStatusVal,
          user_image: userInfo.userImage,
          user_name: userInfo.userName,
          book_language: bookLanguageVal,
          rating_value: starRating,
        }
        navigation.navigate("Home", { newBookJson: newBookJson, status: 'add' })

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
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}

                />



                {bookTypesError ? <Text style={styles.typeErrorFont}>* לבחור סוג ספר חובה</Text> : null}



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
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}
                // zIndexInverse={1000}
                />

                {bookStatusError ? <Text style={styles.typeErrorFont}>* לבחור מצב הספר חובה</Text> : null}
                <DropDownPicker
                  style={styles.DropDown}
                  open={openLanguageDrop}
                  value={bookLanguageVal} //genderValue
                  items={bookLanguageSorted}
                  setValue={setBookLanguageVal}
                  setItems={setBookLanguage}
                  setOpen={setOpenLanguageDrop}
                  placeholder="בחר שפת הספר"
                  containerStyle={styles.ContainerDropDown}
                  textStyle={styles.listItemContainerFont}
                  listItemContainerStyle={styles.listItemContainer}
                  listItemLabelStyle={styles.listItemContainerFont}
                  dropDownContainerStyle={styles.DropDown}
                  listMode="SCROLLVIEW"
                  scrollViewProps={{
                    nestedScrollEnabled: true,
                  }}

                />
                {bookLanguageError ? <Text style={styles.typeErrorFont}>* לבחור שפת הספר חובה</Text> : null}
                <View style={styles.starRating}>
                  <Text style={styles.ratingText} >הדירוג שלך לספר:</Text>
                  <Rating

                    startingValue={3}
                    ratingCount={5}
                    imageSize={30}


                    onFinishRating={setStarRating}

                  />

                </View>
                <Button
                  style={styles.addButton}
                  labelStyle={styles.addButtonFont}
                  mode="contained"
                  onPress={onAddPressed}>
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
