import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from '../Screens/Home/HomeScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import CategoriesScreen from '../Screens/Categories/CategoriesScreen';
import ForgetPasswordScreen from '../Screens/ForgotPassword/ForgotPassword';
import RegisterScreen from '../Screens/Register/Register'
import SearchScreen from '../Screens/Search/SearchScreen';



const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{

        headerShown: false,
       
      }}
    >
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen}/>
      <Stack.Screen name='Categories' component={CategoriesScreen} />
      <Stack.Screen name='Register' component={RegisterScreen} />

      <Stack.Screen name='Search' component={SearchScreen} />

    </Stack.Navigator>
  )
}








export default function AppContainer() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}


