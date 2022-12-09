import React, { useLayoutEffect, useState } from "react";
import { FlatList, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import styles from "./styles";

import BackButton from "../../components/BackButton/BackButton";
export default function Item(props) {
    const { navigation } = props;
    const [isModelVisible, setIsModelVisible] = useState(false);


    return (
        <View style={styles.container}>
            <BackButton goBack={navigation.goBack} />

            <Text>{props.route.params.title}</Text>
            <Text>{props.route.params.author}</Text>





        </View>
    );
}
