import React, { useState, useEffect } from "react";

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { ref, child, push, update, get, onValue, increment, off } from "firebase/database";
import { DBReal, auth } from "../config/firebase";

import HomeScreen from '../Screens/Home/HomeScreen';
import AddBookScreen from '../Screens/AddBook/AddBook';
import profileScreen from '../Screens/Profile/Profile';
import ItemScreen from '../Screens/Item/Item';
import UserPostScreen from "../Screens/UserPost/UserPost";
import EditPostScreen from "../Screens/EditPost/EditPost";
import ViewProfileScreen from "../Screens/ViewProfile/ViewProfile";
import OtherUserPostScreen from "../Screens/OtherUserPost/OtherUserFile";
import EditUserProfileScreen from "../Screens/EditUserProfile/EditUserProfile";
import ChatRoomScreen from "../Screens/ChatRoom/ChatRoom";
import MapUserScreen from "../Screens/MapUser/MapUser";
import SingleChatScreen from "../Screens/SingleChat/SingleChat";
import OtherUserMapScreen from "../Screens/OtherUserMap/OtherUserMap";
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
      <Stack.Screen name='ViewProfile' component={ViewProfileScreen} />
      <Stack.Screen name='OtherUserPost' component={OtherUserPostScreen} />
      <Stack.Screen name='SingleChat' component={SingleChatScreen} />
      <Stack.Screen name='OtherUserMap' component={OtherUserMapScreen} />
    </Stack.Navigator>

  );
}
export const TabStack = () => {
  const [chatBadge, setChatBadge] = useState();
  useEffect(() => {
    const user = ref(DBReal, '/users/' + auth.currentUser.uid);

    onValue(user, snapshot => {
      const data = snapshot.val();
   
      if (data.notifyCounter || data.notifyCounter == 0 ) {
        console.log("yess")
        if (data.notifyCounter == 0) {
       
          setChatBadge()
        } else {
          setChatBadge(data.notifyCounter)
        }


      }
    });

    return () => off(user)



  }, [])
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,
        showLabel: false,
        tabBarActiveTintColor: "#ff914d",
        tabBarHideOnKeyboard: true,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let Size;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
            Size = 30
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            Size = 30
          } else if (route.name === 'UserPost') {
            iconName = focused ? 'list' : 'list-outline';
            Size = 30
          } else if (route.name === 'MapUser') {
            iconName = focused ? 'map' : 'map-outline';
            Size = 30
          } else if (route.name === 'ChatRoom') {
            iconName = focused ? 'md-chatbubble-ellipses' : 'md-chatbubble-ellipses-outline';
            Size = 30
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={Size} color={color} />
        },
        tabBarStyle: {


          backgroundColor: 'white',
          position: 'absolute',
          // right: 10,
          // left: 10,
          // bottom: Platform.OS === "ios" ? getStatusBarHeight() : 0,
          height: Platform.OS === "ios" ? 70 : 60,
          // borderRadius: 15,
          // paddingBottom: 5,
        },

        tabBarShowLabel: false,

      })}


    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='UserPost' component={UserPostScreen} />
      <Tab.Screen name='Profile' component={profileScreen} />
      <Tab.Screen name='MapUser' component={MapUserScreen} />
      <Tab.Screen name="ChatRoom" component={ChatRoomScreen}
        options={{
          tabBarBadge: chatBadge,

        }}


      />

    </Tab.Navigator>

  )
}










