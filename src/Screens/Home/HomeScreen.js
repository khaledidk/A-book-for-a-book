import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";

import { Button } from "react-native-paper";
import { SignOut } from "../../config/AuthDB";


export default function HomeScreen(props) {
  const { navigation } = props;





  return (
    <View style = {{flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>
     <Text>dfsdfsdfsdfsdf</Text>
     <Button 
     style ={{backgroundColor : 'red'}}
     onPress = {SignOut}
     >התנתק
     </Button>
    </View>
  );
}
