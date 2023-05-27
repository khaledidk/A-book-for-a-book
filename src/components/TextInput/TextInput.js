import React, { useState } from "react";
import { StyleSheet, Text, View, I18nManager } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { Feather, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';


import styles from "./styles";
export default function TextInput({ errorText, description, userIcon, emailicon, lockicon, book, label, phoneIcon, error, ...props }) {

    return (

        <View style={styles.container}>

            {/* {I18nManager.isRTL ? <MaterialCommunityIcons name={phoneIcon} size={40} style={styles.phone2} /> : <MaterialCommunityIcons name={phoneIcon} size={40} style={styles.phone} />} */}

            {I18nManager.isRTL ? <MaterialCommunityIcons style={styles.IconEmail2} name={emailicon} size={50} /> : <MaterialCommunityIcons style={styles.IconEmail} name={emailicon} size={50} />}
            {I18nManager.isRTL ? <AntDesign style={styles.IconLock2} name={lockicon} size={50} /> : <AntDesign style={styles.IconLock} name={lockicon} size={50} />}
            {I18nManager.isRTL ? <FontAwesome style={styles.IconUser2} name={userIcon} size={40} /> : <FontAwesome style={styles.IconUser} name={userIcon} size={40} />}
            {I18nManager.isRTL ? <Feather style={styles.IconUser2} name={book} size={40} /> : <Feather style={styles.IconUser} name={book} size={40} />}
            {I18nManager.isRTL ? <Text style={styles.FontLabel2}>{label}</Text> : <Text style={styles.FontLabel}>{label}</Text>}
            {error && I18nManager.isRTL ? (<Input


                style={styles.input2}
                underlineColor='#f14757'
                mode="outlined"
                activeOutlineColor='#f14757'
                outlineColor='#f14757'


                {...props}
            />) : null}
            {!error && I18nManager.isRTL ? (<Input



                style={styles.input2}

                underlineColor="#ddb07f"
                mode="outlined"
                activeOutlineColor="#ddb07f"
                outlineColor="#ddb07f"


                {...props}
            />) : null}
  

            {!error && !I18nManager.isRTL ? (<Input


                style={styles.input}

                underlineColor="#ddb07f"
                mode="outlined"
                activeOutlineColor="#ddb07f"
                outlineColor="#ddb07f"


                {...props}
            />) : null}

            {error && !I18nManager.isRTL ? (<Input


                style={styles.input}

                underlineColor='#f14757'
                mode="outlined"
                activeOutlineColor='#f14757'
                outlineColor='#f14757'


                {...props}
            />) : null}

            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}


        </View>

    )
}