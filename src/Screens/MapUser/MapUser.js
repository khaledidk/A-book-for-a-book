import React, { useEffect, useState } from "react";
import MapView, { Callout, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, Alert, Image, TouchableOpacity, I18nManager } from 'react-native';
import styles from "./styles";
import BackButton from '../../components/BackButton/BackButton';
import * as Location from 'expo-location';
import { fetchOtherUsers } from "../../config/FireStoreDB";
import { auth } from '../../config/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import OurActivityIndicator from "../../components/OurActivityIndicator/OurActivityIndicator";
import { updateUserLoction } from "../../config/FireStoreDB";
import { fetchCurrentUserInfo, fetchCurrentUserLoction, fetchBookLoction } from "../../config/FireStoreDB";
import { useIsFocused } from '@react-navigation/native';
import { Svg, Image as ImageSvg } from 'react-native-svg';
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Modal } from "react-native-paper";

export default function MapUser({ navigation, route }) {

  const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
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
    { label: "סוגים אחרים", value: "סוגים אחרים" },
  ]);

  const [otherUsersInfo, setOtherUsersInfo] = useState([])
  const [currUserInfo, setCurrUserInfo] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [bookByFilterInfo, setBookByFilterInfo] = useState([])
  const [dropsVisible, setDropsVisible] = useState(false);
  const [booksVisible, setBooksVisible] = useState(false);
  const [bookLanguageVal, setBookLanguageVal] = useState([]);
  const [openLanguageDrop, setOpenLanguageDrop] = useState(false)
  const [languageArray, setLanguageArray] = useState([])
  const bookLanguageSorted = [...bookLanguage].sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [bookStatusVal, setBookStatusVal] = useState([])
  const [openStatusDrop, setOpenStatusDrop] = useState(false)
  const [statusArray, setStatusArray] = useState([])
  const [bookTypesVal, setBookTypesVal] = useState([])
  const [refreshingLoction, setRefreshingLoction] = useState(false)
  const [openTypeDrop, setOpenTypeDrop] = useState(false)
  const [typeArray, setTypeArray] = useState([])
  const [isAleretVisible, setIsAlertVisible] = useState(false);
  const user = auth.currentUser;
  const uid = user.uid;

  // this function get current user loction
  const userLocation = async () => {

    const user = auth.currentUser;
    const uid = user.uid;
    setRefreshingLoction(true)
    const locationObj = await fetchCurrentUserLoction(uid).catch(() => {

      Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });;;

    if (locationObj) {
      setLatitude(locationObj.latitude);
      setLongitude(locationObj.longitude);

      setMapRegion({
        latitude: locationObj.latitude,
        longitude: locationObj.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })


      await fetchCurrentUserInfo(uid).then((userInfo) => {
        userInfo["latitude"] = locationObj.latitude
        userInfo["longitude"] = locationObj.longitude
        setCurrUserInfo(() => [userInfo])
      })
      await fetchallUserLoctions();
    
    } else {

      let { status } = await Location.requestForegroundPermissionsAsync().catch((error) => {
        Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }] ) })
      if (status !== "granted") {
        Alert.alert('', "סירבת לאפליקציה הזו לגשת למיקום שלך, עליך לשנות זאת ולאפשר גישה על מנת לקבל ביצועים טובים יותר", [, , { text: "אישור" }]);
        setCurrUserInfo([]);
        setOtherUsersInfo([]);
        setRefreshingLoction(false)
        return;
      }

      let location;
      if (!longitude && !latitude) {
        location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 }).catch((error) => {
          Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }] ) })
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);


        setMapRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })

        let currUserLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }

        await fetchCurrentUserInfo(uid).then((userInfo) => {
          userInfo["latitude"] = location.coords.latitude
          userInfo["longitude"] = location.coords.longitude
          setCurrUserInfo(() => [userInfo])
        })



        await fetchallUserLoctions();
        updateUserLoction(currUserLocation).catch(() => {

          Alert.alert("קרתה שגיה", "לא יכול לעדכן מקום שלך נא לנסה שוב", [{ text: "בסדר" }])
        });
      }

     
    }
    setRefreshingLoction(false)
  }

  // this function update user loction in database
  const updateLoction = async () => {
    setIsAlertVisible(false)
    setIsLoading(true);
    setRefreshingLoction(true)
    let { status } = await Location.requestForegroundPermissionsAsync().catch((error) => {
      Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])

    });
    if (status !== "granted") {
      Alert.alert('', "סירבת לאפליקציה הזו לגשת למיקום שלך, עליך לשנות זאת ולאפשר גישה על מנת לקבל ביצועים טובים יותר", [, , { text: "אישור" }]);
      setCurrUserInfo([]);
      setOtherUsersInfo([]);
      setRefreshingLoction(false)
      return;
    }

    let location;

    location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 }).catch((error) => {
      Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }] ) })
    console.log("locationObj", location)
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);


    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

    let currUserLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    updateUserLoction(currUserLocation)
    await fetchCurrentUserInfo(uid).then((userInfo) => {
      userInfo["latitude"] = location.coords.latitude
      userInfo["longitude"] = location.coords.longitude
      setCurrUserInfo(() => [userInfo])
    })
    setIsLoading(false)
    setRefreshingLoction(false)
  }


  // this function fetch all users loction and details
  const fetchallUserLoctions = async () => {
    await fetchOtherUsers().then((arrayUserInfo) => {


      setOtherUsersInfo(() => []);

      arrayUserInfo.forEach((user, i) => {
        if (user.latitude && user.longitude) {


          if (i === 0) {
            setOtherUsersInfo(() => [user]);
          } else {
            setOtherUsersInfo(oldArray => [user, ...oldArray]);

          }
        }

      })



    }).catch(() => {

      Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });

  }

  // this function fetch user location the with loading
  const fetchByUsersLoction = async () => {
    setIsLoading(true);

    await userLocation().then(() => {
      setIsLoading(() => false);

    })
  }

  // this function filter the book search by book language , book type , book status
  const onSelectFilter = async () => {
    setIsLoading(true);

    let result_array = [];
    let temp = await fetchBookLoction().catch(() => {

      Alert.alert("קרתה שגיה", "לא יכול להביא דאטה נא לנסה שוב", [{ text: "בסדר" }])
    });

    if (statusArray.length == 0 && languageArray.length == 0 && typeArray.length == 0) {
      setBookByFilterInfo(() => temp);

    }

    if (languageArray.length != 0) {

      for (let i = 0; i < languageArray.length; i++) {
        if (result_array.length == 0) {
          result_array = temp.filter(element => element.book_language == languageArray[i].value)

        } else {
          result_array = result_array.concat(temp.filter(element => element.book_language == languageArray[i].value))

        }

        setBookByFilterInfo(() => result_array);

      }
    }

    if (statusArray.length != 0) {
      if (languageArray.length > 0) {
        temp = result_array;
        result_array = [];
      }

      for (let i = 0; i < statusArray.length; i++) {
        if (result_array.length == 0) {
          result_array = temp.filter(element => element.book_status == statusArray[i].value)

        } else {
          result_array = result_array.concat(temp.filter(element => element.book_status == statusArray[i].value))

        }
        setBookByFilterInfo(() => result_array);

      }


    }


    if (typeArray.length != 0) {
      if (languageArray.length > 0 || statusArray.length > 0) {
        temp = result_array;
        result_array = [];
      }

      for (let i = 0; i < typeArray.length; i++) {
        if (result_array.length == 0) {
          result_array = temp.filter(element => element.book_type == typeArray[i].value)

        } else {
          result_array = result_array.concat(temp.filter(element => element.book_type == typeArray[i].value))

        }
        setBookByFilterInfo(() => result_array);

      }


    }

    setIsLoading(() => false);
    setBooksVisible(true);
    setDropsVisible(false);

  }

  // this useEffect when open the screen
  const isFocused = useIsFocused();


  useEffect(() => {

    fetchByUsersLoction();

    setDropsVisible(false)



  }, [isFocused])


  return (

    <View style={styles.container}>
      {isLoading && <OurActivityIndicator />}

      {!isLoading && <View style={styles.filter}>
        <View style={styles.filterButtonContainer}>

          <Button
            style={styles.filterButton}
            labelStyle={styles.filterButtonFont}
            mode="Outlined"
            onPress={() => setDropsVisible(!dropsVisible)}>
            חיפוש לפי ספרים
          </Button>
          <Button
            style={styles.filterButton}
            labelStyle={styles.filterButtonFont}
            mode="Outlined"
            onPress={() => setDropsVisible(false) || setBooksVisible(false)}>
            הציג בעלי ספרים
          </Button>

        </View>
        {dropsVisible && <DropDownPicker
          style={styles.DropDown}
          open={openLanguageDrop}
          value={bookLanguageVal} //genderValue
          items={bookLanguageSorted}
          setValue={setBookLanguageVal}
          onSelectItem={(items) => setLanguageArray(items)}
          setItems={setBookLanguage}
          setOpen={setOpenLanguageDrop}
          placeholder="בחר שפת הספר"
          translation={{
            SELECTED_ITEMS_COUNT_TEXT: "{count} שפות נבחרות"
          }}
          containerStyle={styles.ContainerDropDown}
          textStyle={styles.listItemContainerFont}
          listItemContainerStyle={styles.listItemContainer}
          listItemLabelStyle={styles.listItemContainerFont}
          dropDownContainerStyle={styles.DropDown}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}

          multiple={true}



        />}


        {dropsVisible && <DropDownPicker
          style={styles.DropDown}
          open={openStatusDrop}
          value={bookStatusVal} //genderValue
          items={bookStatus}
          setValue={setBookStatusVal}
          setItems={setBookStatus}
          setOpen={setOpenStatusDrop}
          onSelectItem={(items) => setStatusArray(items)}
          placeholder="בחר מצב הספר"
          translation={{
            SELECTED_ITEMS_COUNT_TEXT: "{count} מצב שנבחר"
          }}
          containerStyle={styles.ContainerDropDown}
          textStyle={styles.listItemContainerFont}
          listItemContainerStyle={styles.listItemContainer}
          listItemLabelStyle={styles.listItemContainerFont}
          dropDownContainerStyle={styles.DropDown}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}

          multiple={true}



        />}

        {dropsVisible && <DropDownPicker
          style={styles.DropDown}
          open={openTypeDrop}
          value={bookTypesVal} //genderValue
          items={bookTypes}
          setValue={setBookTypesVal}
          setItems={setBookTypes}
          setOpen={setOpenTypeDrop}
          onSelectItem={(items) => setTypeArray(items)}
          placeholder="בחר סוג הספר"
          translation={{
            SELECTED_ITEMS_COUNT_TEXT: "{count} סוגים נבחרים"
          }}
          containerStyle={styles.ContainerDropDown}
          textStyle={styles.listItemContainerFont}
          listItemContainerStyle={styles.listItemContainer}
          listItemLabelStyle={styles.listItemContainerFont}
          dropDownContainerStyle={styles.DropDown}
          listMode="SCROLLVIEW"
          scrollViewProps={{
            nestedScrollEnabled: true,
          }}

          multiple={true}

        />}

        {dropsVisible && <Button
          style={styles.searchButton}
          labelStyle={styles.filterButtonFont}
          mode="Outlined "
          onPress={onSelectFilter}>
          חיבוש
        </Button>}
      </View>}
      <View style={{ flex: 1, bottom: Platform.OS === "ios" ? 72 : 60, marginTop: Platform.OS === "ios" ? 70 : 60 }}>

        {!isLoading && <MapView style={styles.map}
          region={mapRegion}

          provider={PROVIDER_GOOGLE}

        >


          {currUserInfo.map((user) => (
            <Marker
              key={0}
              coordinate={user}
              pinColor='blue'

            >
              <Callout onPress={() => navigation.navigate("Profile")}  >
                <View style={styles.bubble}>
                  <Text style={styles.txtFont}>אני</Text>


                  <Svg width={100} height={100}  >
                    <ImageSvg
                      width={'100%'}
                      height={'100%'}


                      preserveAspectRatio="xMidYMid slice"
                      style={styles.image}
                      href={{ uri: !user.image ? profileDefaultImageUri : user.image }}
                    />
                  </Svg>

                </View>

              </Callout>
            </Marker>
          ))}

          {!booksVisible && otherUsersInfo.map((user, i) => (
            <Marker
              key={i + 1}
              coordinate={user}
            >
              <Callout onPress={() => navigation.navigate("ViewProfile", { userId: user.id })} >
                <View style={styles.bubble}>
                  <Text style={styles.txtFont}>{user.name}</Text>


                  <Svg width={100} height={100}>
                    <ImageSvg
                      width={'100%'}
                      height={'100%'}
                      preserveAspectRatio="xMidYMid slice"
                      href={{ uri: !user.image ? profileDefaultImageUri : user.image }}
                    />
                  </Svg>

                </View>

              </Callout>

            </Marker>
          ))}

          {booksVisible && bookByFilterInfo.map((book, i) => (
            <Marker
              key={i + 1}
              coordinate={book}
            >
              <Callout onPress={() => navigation.navigate("Item", { item: book, status: true })}>
                <View style={styles.bubble}>
                  <Text style={styles.txtFont}>{book.title}</Text>
                  {book.user_id === uid ? <Text style={styles.txtFont}>(ספר שלי )</Text> : null}

                  <Svg width={100} height={100}>
                    <ImageSvg
                      width={'100%'}
                      height={'100%'}
                      preserveAspectRatio="xMidYMid slice"
                      href={{ uri: !book.image ? profileDefaultImageUri : book.image }}
                    />
                  </Svg>

                </View>

              </Callout>

            </Marker>
          ))}

        </MapView>}
        {refreshingLoction && <TouchableOpacity style={[!I18nManager.isRTL && styles.refreshLocation, I18nManager.isRTL && styles.refreshLocation2]} onPress={updateLoction}>
          <MaterialIcons style={styles.icon} name={"refresh"} size={40} color={"#ff914d"} />
          {/* <Text>עדכון מקום</Text> */}
        </TouchableOpacity>}
        {!dropsVisible && <TouchableOpacity style={[!I18nManager.isRTL && styles.newLocation, I18nManager.isRTL && styles.newLocation2]} onPress={() => setIsAlertVisible(true)} >
          <MaterialIcons style={styles.icon} name={"location-pin"} size={40} color={"#ff914d"} />
          <Text>עדכון מקום</Text>
        </TouchableOpacity>}
      </View>

      <Modal visible={isAleretVisible}>

        <View style={styles.alertContainer}>


          <View style={styles.alertContentContainer}>


            <Text style={styles.alertContentTextError}>האם אתה רוצה לעדכן המקום שלך במקום הנוכחי?</Text>

            <View style={styles.modelAnswer}>

              <Button
                style={styles.ModealButtons}
                labelStyle={styles.filterButtonFont}
                mode="Outlined"
                onPress={updateLoction}
              >

                כן
              </Button>
              <Button
                style={styles.ModealButtons}
                labelStyle={styles.filterButtonFont}
                mode="Outlined"
                onPress={() => setIsAlertVisible(false)}
              >

                לא
              </Button>



            </View>


          </View>

        </View>

      </Modal>
    </View>
  );

}

