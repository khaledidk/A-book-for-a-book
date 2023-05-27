import React from "react";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { Modal } from "react-native-paper";

import styles from "./styles";
export default function LodingModel({ isModelVisible }) {


    return (
        <Modal visible={isModelVisible}>

            <View style={styles.modelContainer}>
                <Text style={styles.modelTxt}>המתן בבקשה</Text>
                <ActivityIndicator size="large" color={"#ff914d"} />


            </View>

        </Modal>
    );



};