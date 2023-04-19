import React, { useLayoutEffect, useState, useRef } from "react";
import { TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView, Image } from "react-native";

import styles from "./styles";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper";
import { Button, Modal } from "react-native-paper";
import TextInput from "../../components/TextInput/TextInput";
import * as ImagePicker from 'expo-image-picker';
import BackButton from "../../components/BackButton/BackButton";

import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

import { nameValidator } from "../../helpers/nameValidator";

// import PhoneInput from 'react-native-phone-number-input';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function EditUserProfile({ navigation, route }) {




    const [image, setImage] = useState(route.params.image);
    const [imageError, setImageError] = useState(false)
    const [userName, setUserName] = useState({ value: route.params.userName, error: "" });
    const [NumberValue, setNumberValue] = useState(route.params.phoneNumber.substring(4));
    const [ValidNumber, setValidNumber] = useState(false);
    const [PhoneInputerror, setPhoneInputerror] = useState("");
    const [date, setDate] = useState(new Date());


    const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;
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
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios')
        setDate(currentDate);
        let tempeDate = new Date(currentDate)
        let fDate = tempeDate.getDate() + '/' + (tempeDate.getMonth() + 1) + '/' + tempeDate.getFullYear();
        setFormattedDate(fDate)

    };
    function ValidatePhoneNumber(phoneNumber) { // check if the cell phone number is valid for israel
        var regex = /^05\d([-]{0,1})\d{7}$/;
        var phone = phoneNumber.match(regex);
        if (phone) {
            return true;
        }
        return false;
    }

    async function onUpdatePressed() {

        const userNameError = nameValidator(userName.value)


        // const CheckValidPhoneNumber = phoneInput.current?.isValidNumber(NumberValue);
        // setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);
        const CheckValidPhoneNumber = ValidatePhoneNumber(NumberValue)
        console.log("CheckValidPhoneNumber", CheckValidPhoneNumber)
        setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);



        if (userNameError || !image || (!CheckValidPhoneNumber )) {
            if (!image) {

                setImageError(true)
            } else {

                setImageError(false)
            }



            if (!CheckValidPhoneNumber) {
                setPhoneInputerror("* מספר טלפון אינו נכון")

            }


            setUserName({ ...userName, error: userNameError });
            return;
        }
        // setIsDateEmpty(false)
        // setIsDateEmpty(false)
        let updateUserJson;
        console.log("image", image)
        if (profileDefaultImageUri === image) {
            updateUserJson = {

                name: userName.value,
                phoneNumber: NumberValue,

                image: null,

            }
        } else {
            updateUserJson = {

                name: userName.value,
                phoneNumber: NumberValue,
                image: image,


            }
        }
        console.log(updateUserJson)
        navigation.navigate("Profile", { updateUserJson: updateUserJson })

    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : ""}

        >
            <BackButton goBack={navigation.goBack} />
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





                                {image && <Image source={{ uri: image }} style={styles.bookImage} />}
                                {imageError ? <Text style={styles.typeErrorFont}>* לבחור תמונה  חובה</Text> : null}
                                <MaterialCommunityIcons name={"image-edit"} size={50} color={"#ff914d"} onPress={pickImage} />
                            </View>
                            {/* // input View  */}

                            <View style={styles.InputView}>

                                <TextInput
                                    label="שם משתמש"
                                    returnKeyType="next"
                                    value={userName.value}
                                    onChangeText={(text) => setUserName({ value: text, error: "" })}
                                    error={!!userName.error}
                                    errorText={userName.error}
                                    autoCapitalize="none"
                                    userIcon='user-o'

                                />
                                {/* <View style={styles.inputContainer2}> */}
                                <TextInput
                                    value={NumberValue}
                                    onChangeText={(userPhone) => setNumberValue(userPhone)}
                                    label="טלפון נייד"
                                    keyboardType="numeric"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    phoneIcon='phone'
                                    style={styles.PhoneInputStyle}
                                    error={!!PhoneInputerror}
                                    errorText={PhoneInputerror}
                                />


                                {/* </View> */}
                                {/* <View style={styles.DatePicker}>
                                    <View style={styles.DateFontContainer} >
                                        <Text style={styles.DateFont}>{FormattedDate}</Text>
                                    </View>

                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShowDatePicker(true)} >
                                        <Entypo name='calendar' style={styles.IconDate} size={50} />
                                        {ShowDatePicker && (<DateTimePicker
                                            testID='dateTimepicker'
                                            value={date}
                                            mode='date'
                                            onChange={onChange}

                                        />)}
                                    </TouchableOpacity>

                                </View>
                                {IsDateEmpty ? <Text style={styles.DateErrorFont}> * לבחור תאריך חובה</Text> : null} */}
                                {/* 
                                {PhoneInputerror ? <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={NumberValue}
                                    defaultCode="IL"
                                    layout="first"
                                    placeholder='מספר טלפון'


                                    containerStyle={styles.PhoneInputBorderError}
                                    textContainerStyle={{ backgroundColor: '#ffffff' }}
                                    countryPickerButtonStyle={styles.PhoneInputButton}
                                    countryPickerProps={{ region: 'Asia' }}
                                    onChangeText={(text) => {
                                        setNumberValue(text)
                                    }}

                                    onChangeFormattedText={(text) => {
                                        console.log(text)
                                        setFormattedNumber(text)
                                    }}


                                    filterProps={{ placeholder: 'תבחרו מדינה' }}

                                    withShadow


                                /> : null}
                                {!PhoneInputerror ? <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={NumberValue}
                                    defaultCode="IL"
                                    layout="first"
                                    placeholder='מספר טלפון'


                                    containerStyle={styles.PhoneInputStyle}
                                    textContainerStyle={{ backgroundColor: '#ffffff' }}
                                    countryPickerButtonStyle={styles.PhoneInputButton}
                                    countryPickerProps={{ region: 'Asia' }}
                                    onChangeText={(text) => {
                                        setNumberValue(text)
                                    }}
                                    onChangeFormattedText={(text) => {

                                        setFormattedNumber(text)
                                    }}



                                    withShadow


                                /> : null}

                                {PhoneInputerror ? <Text style={styles.error}>{PhoneInputerror}</Text> : null}
 */}

                                <Button
                                    style={styles.updateButton}
                                    labelStyle={styles.updateButtonFont}
                                    mode="contained"
                                    onPress={onUpdatePressed}>
                                    עדכן
                                </Button>





                            </View>



                        </View>

                    </View>
                </View>


            </ScrollView>
        </KeyboardAvoidingView>

    );
}
