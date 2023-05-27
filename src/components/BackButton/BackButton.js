
import React, { useState, useEffect } from "react";
import { TouchableHighlight, Image, View, TouchableOpacity, I18nManager, Pressable } from "react-native";

import styles from "./styles";
import { Feather } from '@expo/vector-icons';

export default function BackButton({navigation , goBack, color = "#ff914d" , params }) {

  const [isPressed, setIsPressed] = useState(false);
  const pressHandle = () => {
    setIsPressed(true)
    if (!isPressed) {
      if(params ){
        navigation.navigate("ChatRoom" , {from :params })
      
      }else{
      goBack()
      }
    }
  }
  return (


    <TouchableOpacity onPress={pressHandle} style={styles.container}>
      <Feather name="arrow-left-circle" color={color} size={35} />
    </TouchableOpacity>




  );
}

