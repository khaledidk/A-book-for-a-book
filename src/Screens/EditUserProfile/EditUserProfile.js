import React, { useLayoutEffect, useState, useRef } from "react";
import { TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView, Image, I18nManager } from "react-native";

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
import BackButton2 from "../../components/BackButton2/BackButton2";
import LodingModel from "../../components/LodingModel/LodingModel";
export default function EditUserProfile({ navigation, route }) {




    const [image, setImage] = useState(route.params.image);
    const [imageError, setImageError] = useState(false)
    const [userName, setUserName] = useState({ value: route.params.userName, error: "" });
    const [NumberValue, setNumberValue] = useState(route.params.phoneNumber);
    const [ValidNumber, setValidNumber] = useState(false);
    const [PhoneInputerror, setPhoneInputerror] = useState("");

    const [isLoadingModel, setIsLoadingModel] = useState(false);

    const profileDefaultImageUri = Image.resolveAssetSource(require('../../../assets/defult_Profile.png')).uri;

    // this function help to pick image from library
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


    // this functio check validation of phonw Number
    function ValidatePhoneNumber(phoneNumber) { // check if the cell phone number is valid for israel
        var regex = /^05\d([-]{0,1})\d{7}$/;
        if (!phoneNumber) {
            return true;
        }
        var phone = phoneNumber.match(regex);
        if (phone) {
            return true;
        }
        return false;
    }

    // this function implement when press on update button, they check the validation of book details 
    // then upload the data to DB
    async function onUpdatePressed() {

        const userNameError = nameValidator(userName.value)


        // const CheckValidPhoneNumber = phoneInput.current?.isValidNumber(NumberValue);
        // setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);
        const CheckValidPhoneNumber = ValidatePhoneNumber(NumberValue)
        console.log("CheckValidPhoneNumber", CheckValidPhoneNumber)
        setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);



        if (userNameError || (!CheckValidPhoneNumber)) {
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
        setIsLoadingModel(true)

        let updateUserJson;
        console.log("image", image, profileDefaultImageUri)
        if (profileDefaultImageUri === image || !image) {
            updateUserJson = {

                name: userName.value,
                phoneNumber: NumberValue,


            }
        } else {
            updateUserJson = {

                name: userName.value,
                phoneNumber: NumberValue,
                image: image,


            }
        }
        console.log(updateUserJson)
        setIsLoadingModel(false)

        navigation.navigate("Profile", { updateUserJson: updateUserJson })

    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : ""}

        >
            {I18nManager.isRTL ?
                <BackButton2 goBack={navigation.goBack} />
                : <BackButton goBack={navigation.goBack} />}
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


                                {image ? <Image
                                    style={styles.bookImage}
                                    source={{ uri: image }}

                                /> :
                                    <Image
                                        style={styles.bookImage}
                                        source={{ uri: profileDefaultImageUri }}

                                    />

                                }




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
                                    style={[I18nManager.isRTL && styles.PhoneInputStyle2 ,!I18nManager.isRTL && styles.PhoneInputStyle]}
                                    error={!!PhoneInputerror}
                                    errorText={PhoneInputerror}
                                />
                              <Text style = {[I18nManager.isRTL && styles.phoneStart2 ,!I18nManager.isRTL && styles.phoneStart]}>+972</Text>


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
            <LodingModel isModelVisible={isLoadingModel} />
        </KeyboardAvoidingView>

    );
}
