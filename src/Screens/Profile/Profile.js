// import React, { useLayoutEffect } from "react";
 import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
// import styles from "./styles";
// import { categories } from "../../data/dataArrays";
// import { getNumberOfRecipes } from "../../data/MockDataAPI";
import { SignOut } from "../../config/AuthDB";
import { Button } from "react-native-paper";
import BottomTab from '../../components/BottomTab/BottomTab'
import styles from "./styles";
export default function CategoriesScreen(props) {
  const { navigation } = props;

 

  return (
    <View style={styles.Container} >
      {/* <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => `${item.id}`} /> */}
      <Button 
     style ={{backgroundColor : 'red'}}
     onPress = {SignOut}
     >התנתק
     </Button>
     {/* <BottomTab navigation = {navigation}/> */}
    </View>
  );
}
