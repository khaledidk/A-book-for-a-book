import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";


import { View } from "../View/View";
import styles from "./styles";
export const LoadingIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={"#ff914d"} />
        </View>
    );
};
