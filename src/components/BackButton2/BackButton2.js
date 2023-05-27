import React, { useState, useEffect } from "react";
import { TouchableHighlight, Image, View, TouchableOpacity } from "react-native";

import styles from "./styles";
import { Feather } from '@expo/vector-icons';

export default function BackButton2({ navigation ,goBack, color = "#ff914d" , params }) {
  const [isPressed, setIsPressed] = useState(false);
  const pressHandle = () => {
    setIsPressed(true)
   
    if (!isPressed) {
      console.log("enter on preees")

      if(params ){
        console.log("======worke=====")
        navigation.navigate("ChatRoom" , {from : params })
      
      }else{
      goBack()
      }
    }
  }
  return (


    <TouchableOpacity onPress={pressHandle} style={styles.container2}>
      <Feather name="arrow-left-circle" color={color} size={35} />
    </TouchableOpacity>




  );
}

