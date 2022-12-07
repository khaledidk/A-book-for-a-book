import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';


import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { set } from "firebase/database";
export default function BottomTab({navigation}) {
    

    const [ClickedHome, setClickedHome] = useState(true);
    const [ClickedUser, setClickedUser] = useState(true);
    const [ClickedAdd, setClickedAdd] = useState(true);

    return (
        <SafeAreaView style={styles.container}>

            {/* profile button */}
            {ClickedUser ? <View style={styles.ButtonWithText}>
                <FontAwesome style={styles.UnClicked} name={'user'} size={50} onPress={() => setClickedUser(false) || navigation.navigate("Profile")} />

                <Text style={styles.FontUnClicked}>איזור אישי</Text>
            </View> : null}

            {!ClickedUser ? <View style={styles.ButtonWithText}>
                <FontAwesome style={styles.Clicked} name={'user'} size={50} onPress={() => setClickedUser(true)} />

                <Text style={styles.FontClicked} >איזור אישי</Text>
            </View> : null}
            {/* add button */}

            {ClickedAdd ? <TouchableOpacity style={styles.AddButtonUnClicked}  onPress={() => setClickedAdd(false)}>
                < MaterialIcons style = {styles.addIcon}  name={'add'} size={50}    />

               
            </TouchableOpacity> : null}

            {!ClickedAdd ? <TouchableOpacity style={styles.AddButtonClicked}  onPress={() => setClickedAdd(true)}>
                < MaterialIcons style = {styles.addIcon}name={'add'} size={50}    />

            </TouchableOpacity> : null}

            {/* Home button */}
            {ClickedHome ? <View style={styles.ButtonWithText}>
                <Entypo style={styles.UnClicked} name={'home'} size={50} onPress={() => setClickedHome(false)} />
                <Text style={styles.FontUnClicked} >איזור אישי</Text>
            </View> : null}
            {!ClickedHome ? <View style={styles.ButtonWithText}>
                <Entypo style={styles.Clicked} name={'home'} size={50} onPress={() => setClickedHome(true)} />

                <Text style={styles.FontClicked} >איזור אישי</Text>
            </View> : null}







        </SafeAreaView>

    )
}