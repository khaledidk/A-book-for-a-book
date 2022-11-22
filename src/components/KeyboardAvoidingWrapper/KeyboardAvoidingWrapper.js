import React from "react";

import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardAvoidingWrapper = ({ children }) => {

    return (

        <KeyboardAvoidingView 
         style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView 
           
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>

    );

};

export default KeyboardAvoidingWrapper;