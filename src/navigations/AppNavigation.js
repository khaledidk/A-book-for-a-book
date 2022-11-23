import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import HomeScreen from '../Screens/Home/HomeScreen';

import CategoriesScreen from '../Screens/Categories/CategoriesScreen';

import SearchScreen from '../Screens/Search/SearchScreen';




const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{

        headerShown: false,

      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />

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


