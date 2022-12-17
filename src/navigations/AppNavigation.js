import React, { useState } from "react";
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import HomeScreen from '../Screens/Home/HomeScreen';
import AddBookScreen from '../Screens/AddBook/AddBook';

import profileScreen from '../Screens/Profile/Profile';
import ItemScreen from '../Screens/Item/Item';
import UserPostScreen from "../Screens/UserPost/UserPost";
import EditPostScreen from "../Screens/EditPost/EditPost";
import EditUserProfileScreen from "../Screens/EditUserProfile/EditUserProfile";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='Main' component={TabStack} />
      <Stack.Screen name='AddBook' component={AddBookScreen} />
      <Stack.Screen name='Item' component={ItemScreen} />
      <Stack.Screen name='EditPost' component={EditPostScreen} />
      <Stack.Screen name='EditUserProfile' component={EditUserProfileScreen} />
    </Stack.Navigator>
  );
}
export const TabStack = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,
        showLabel: false,
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
          } else if (route.name === 'UserPost') {
            iconName = focused ? 'list' : 'list-outline';
            Size = 40
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={Size} color={color} />
        },
        tabBarStyle: {


          backgroundColor: 'white',
          position: 'absolute',
          right: 10,
          left: 10,
          bottom: Platform.OS === "ios" ? getStatusBarHeight() : 10,
          height: 90,
          borderRadius: 15,
          paddingBottom: 5,
        },

        tabBarShowLabel: false,

      })}


    >

      <Tab.Screen name='UserPost' component={UserPostScreen} />

      <Tab.Screen name='Home' component={HomeScreen} />

      <Tab.Screen name='Profile' component={profileScreen} />

    </Tab.Navigator>

  )
}










