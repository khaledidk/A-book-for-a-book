import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import HomeScreen from '../Screens/Home/HomeScreen';
import AddBookScreen from '../Screens/AddBook/AddBook';

import profileScreen from '../Screens/Profile/Profile';

import SearchScreen from '../Screens/Search/SearchScreen';
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

import styles from "./styles";
import AddBook from "../Screens/AddBook/AddBook";
// const Stack = createStackNavigator();
const Stack = createBottomTabNavigator();

export const AppStack = () => {

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,

        tabBarActiveTintColor: "#ff914d",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let Size;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            Size = 40
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            Size = 40
          } else if (route.name === 'AddBook') {
            iconName = focused ? 'ios-add-circle-sharp' : 'ios-add-circle-outline';
            Size = 90
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={Size} color={color} />
        },
        tabBarStyle: {


          backgroundColor: 'white',
          position: 'absolute',
          right: 10,
          left: 10,
          bottom: getStatusBarHeight(),
          height: 90,
          borderRadius: 15,
          paddingBottom: 5,
        },
        //  Style: {
        //     flexDirection: 'row-reverse',
        //     backgroundColor: "#ffffff",
        //     // right: 20,
        //     // left: 20,
        //     // paddingLeft: 40,
        //     // paddingRight: 40,

        //     marginStart: 10,
        //     marginEnd: 10,
        //     borderRadius: 15,
        //     bottom: getStatusBarHeight(),
        //     height: 100,
        //     justifyContent: 'space-between',

        //   }

      })}

      tabBarOptions={{


        showLabel: false,


      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='AddBook' component={AddBookScreen} />
      <Stack.Screen name='Profile' component={profileScreen} />


    </Stack.Navigator>

  )
}








// export default function AppContainer() {
//   return (
//     <NavigationContainer>
//       <MainNavigator />
//     </NavigationContainer>
//   )
// }


