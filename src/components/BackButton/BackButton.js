import * as React from 'react';
import { TouchableHighlight, Image,View , TouchableOpacity } from "react-native";

import styles from "./styles";
import { Feather } from '@expo/vector-icons';

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
    <Feather name= "arrow-left-circle"  style = {styles.BackIcon}size={30}/>
    
  </TouchableOpacity>
    
  );
}

// BackButton.propTypes = {
//   onPress: PropTypes.func,
//   source: PropTypes.number,
//   title: PropTypes.string,
// };
