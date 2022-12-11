import { ActivityIndicator, StyleSheet, View } from "react-native";

import styles from "./styles";

export default function OurActivityIndicator() {

    return (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={"#ff914d"} />
        </View>

    );

}