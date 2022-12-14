import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { EvilIcons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import styles from "./styles";
export default function TextInput({ errorText, description, emailicon, lockicon, label, error, ...props }) {

    return (

        <View style={styles.container}>


            <MaterialCommunityIcons style={styles.IconEmail} name={emailicon} size={50} />
            <AntDesign style={styles.IconLock} name={lockicon} size={50} />
            <Text style={styles.FontLabel}>{label}</Text>

            {!error ? (<Input


                style={styles.input}
                underlineColor="#ddb07f"
                mode="outlined"
                activeOutlineColor="#ddb07f"
                outlineColor="#ddb07f"


                {...props}
            />) : null}

            {error ? (<Input


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