import * as React from 'react';
import { TouchableHighlight, Image, View, TouchableOpacity } from "react-native";

import styles from "./styles";
import { Feather } from '@expo/vector-icons';

export default function BackButton({ goBack, color = "#ff914d" }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Feather name="arrow-left-circle" color={color} size={30} />

    </TouchableOpacity>

  );
}

