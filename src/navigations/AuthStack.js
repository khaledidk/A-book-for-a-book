import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import ForgotPasswordScreen from '../Screens/ForgotPassword/ForgotPassword';
import RegisterScreen from '../Screens/Register/Register'




const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="login"
            screenOptions={{ headerShown: false }}
        >

            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />






        </Stack.Navigator>
    );
};