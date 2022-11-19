import * as React from 'react';
import { useState } from "react";

import { ScrollView, Text, View, ImageBackground, KeyboardAvoidingView, Keyboard, TouchableOpacity } from "react-native";
import BackButton from '../../components/BackButton/BackButton'


export default function ForgotPassword(props) {
    const { navigation } = props;



    return (
        <View>
             <BackButton goBack={navigation.goBack} /> 
            {/* <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} /> */}
        </View>
    );
}
