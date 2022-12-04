import * as React from 'react';
import { useState, useRef, useEffect } from "react";

import { ScrollView, View, ImageBackground, TouchableOpacity, KeyboardAvoidingView, SafeAreaView, Keyboard, Platform } from "react-native";
import BackButton from '../../components/BackButton/BackButton'
import styles from './styles';
import { Octicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { Button, Modal, Text } from "react-native-paper";
import PhoneInput from 'react-native-phone-number-input';


import PhoneInputComponet from '../../components/PhoneInput/PhoneInputComponet';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper/KeyboardAvoidingWrapper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SearchableDropdown from 'react-native-searchable-dropdown';
import addNewUser from '../../config/FireStoreDB'
import createUser from '../../config/AuthDB'
import DropDownPicker from 'react-native-dropdown-picker'


export default function RegisterOptional(props) {
    // const { navigation } = navigation;

    const [NumberValue, setNumberValue] = useState("");
    const [FormattedNumber, setFormattedNumber] = useState("");
    const [ModelIcon, setModelIcon] = useState(false);
    const [isAleretVisible, setIsAlertVisible] = useState(false);


    const [alertContent, setAlertContent] = useState("");

    const [ValidNumber, setValidNumber] = useState(false);
    const [PhoneInputerror, setPhoneInputerror] = useState("");

    const phoneInput = useRef(null);


    const [DropDownValue, setDropDownValue] = useState('');
    const Data = require('../../data/data.json');
    // const JasonTOArray = () => {

    //     Data.map(function (element) {

    //         setArrayData(ArrayData => [...ArrayData, { label: element.name, value: element.name }]);

    //     })
    //     console.log(ArrayData)

    // }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onRegisterOptionalPressed = () => {



        const CheckValidPhoneNumber = phoneInput.current?.isValidNumber(NumberValue);
        setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);

        if (!CheckValidPhoneNumber && FormattedNumber) {
            setPhoneInputerror("* מספר טלפון אינו נכון")
            return;
        }
        console.log(" this is formateed : " + FormattedNumber)
        createUser(props.route.params.Email.value, props.route.params.Password.value, props.route.params.UserName.value, FormattedNumber, props.route.params.Date).then(() => {
            setAlertContent("שלחנו אליך הודעת אימות, נא לוודא לדוא״ל שלך.")
            setIsAlertVisible(true)
            setModelIcon(true)


        }).catch((error) => {
            setAlertContent(error)
            setModelIcon(false)
            setIsAlertVisible(true)


        });


    };

    return (

        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : ""}
        //     // style={{ flex: 1 }}
        // >


        //   <ScrollView
        //         //  contentContainerStyle={{  flexGrow: 1}}


        //     showsVerticalScrollIndicator={false}
        //     keyboardShouldPersistTaps="handled"

        //  > 



        <View style={styles.container}>
            <BackButton goBack={props.navigation.goBack} />

            <View style={styles.ImageBackGround} ></View>

            {/*  Bootom View  */}
            <View style={styles.BootomView}>
                {/* Welcome you  */}
                <View style={styles.WelcomeView} >

                    <Text style={styles.WelcomeFont}>השדות אלה אינו חובה, את/ה יכול/ה לדלג וליצור חשבון. </Text>

                    {/* // input View  */}

                    <View style={styles.InputView}>

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
                            {...props}

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
                            {...props}

                        /> : null}

                        {PhoneInputerror ? <Text style={styles.error}>{PhoneInputerror}</Text> : null}


                        {/* <SearchableDropdown
                                onItemSelect={(item) => {
                                    const items = this.state.selectedItems;
                                    items.push(item)
                                    this.setState({ selectedItems: items });
                                }}
                                containerStyle={{ padding: 5 }}
                                onRemoveItem={(item, index) => {
                                    const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                                 
                                }}
                                itemStyle={{
                                    padding: 10,
                                    marginTop: 2,
                                    backgroundColor: '#ddd',
                                    borderColor: '#bbb',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                itemTextStyle={{ color: '#222' }}
                                itemsContainerStyle={{ maxHeight: 140 }}
                                items={items}
                                defaultIndex={2}
                                resetValue={false}
                             
                                textInputProps={
                                    {
                                        placeholder: "placeholder",
                                        underlineColorAndroid: "transparent",
                                        style: {
                                            padding: 12,
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 5,
                                        },
                                        onTextChange: text => Keyboard.dismiss
                                    }
                                }
                             
                                listProps={
                                    {
                                        nestedScrollEnabled: true,
                                    }
                                }

                            /> */}




                        {/* <DropDownPicker
                                    items={items}
                                    // value={DropDownValue}
                                    translation={{
                                        PLACEHOLDER: "תלחץ כאן לבחור אזור",

                                    }}
                                    defaultIndex={0}
                                    //   listItemContainerStyle = {styles.DropDown}

                                    open={OpenDropDown}
                                    searchable={true}
                                    disabled ={false}
                                    categorySelectable = {false}
                                    setOpen={setOpenDropDown}
                                    setItems={setArrayData}
                                    setValue={setDropDownValue}
                                    style={styles.DropDown}
                                    //  language='HR'
                                    containerStyle={styles.ContainerDropDown}
                                    textStyle={styles.listItemContainerFont}

                                    dropDownContainerStyle={styles.DropDown}
                                    listItemContainerStyle={styles.listItemContainer}
                                    listItemLabelStyle={styles.listItemContainerFont}

                                    listMode="SCROLLVIEW"
                                /> */}



                    </View>

                    <Button
                        style={styles.ButtonRegister}
                        labelStyle={styles.ButtonRegisterFont}
                        mode="contained"
                        onPress={onRegisterOptionalPressed}

                    >
                        לדלג וצור חשבון
                    </Button>

                </View>

            </View>
            <Modal visible={isAleretVisible}>

                <View style={styles.alertContainer}>


                    <View style={styles.alertContentContainer}>

                        {/* <Text style={styles.alertTitleTextStyle}>{alertTitle}</Text> */}
                        {ModelIcon ? <MaterialCommunityIcons style={styles.IconSucsess} name='email-send-outline' size={100} /> : null}
                        {ModelIcon ? <Text style={styles.alertContentTextSucsess}>{alertContent}</Text> : null}
                        {!ModelIcon ? <Entypo style={styles.IconError} name='circle-with-cross' size={100} /> : null}
                        {!ModelIcon ? <Text style={styles.alertContentTextError}>{alertContent}</Text> : null}
                        <Button
                            style={styles.ButtonRegister}
                            labelStyle={styles.ButtonRegisterFont}
                            mode="contained"
                            onPress={() => setIsAlertVisible(false) || props.navigation.navigate('login')}
                        >

                            סגור
                        </Button>



                    </View>

                </View>

            </Modal>
        </View>



        // </ScrollView> 
        // {/* </KeyboardAvoidingView> */}


    );

}
