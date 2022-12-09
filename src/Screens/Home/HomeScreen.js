import React, { useLayoutEffect  , useState} from "react";
import { FlatList, Text, View, Image ,TouchableOpacity , KeyboardAvoidingView , ScrollView } from "react-native";
import styles from "./styles";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Button, Modal } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import BottomTab from '../../components/BottomTab/BottomTab'
import TextInput from "../../components/TextInput/TextInput";
import {  Ionicons } from '@expo/vector-icons';
export default function HomeScreen(props) {
  const { navigation } = props;
  const [isModelVisible, setIsModelVisible] = useState(false);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'חאלד',
      author : 'שלום',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      author : 'muath',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      author : 'salah',
    },
    {
      id: 'bd7acbea-csdfsad53abb28ba',
      title: 'First Item',
      author : 'morad',
    },
    {
      id: '3ac68afc-ggggggggggd91aa97f63',
      title: 'Second Item',
      author : 'ali',
    },
    {
      id: '58694sssssssssssssssss145571e29d72',
      title: 'Third Item',
      author : 'asda',
    },
   
  ];
  
  const renderItem = ({ item }) => (
    <Item title={item.title } author = {item.author} />
  );
  const Item = ({ title , author }) => (
    <View>
    <TouchableOpacity style={styles.item} onPress = {() => navigation.navigate("Item", {title : title , author : author })}>
      <Image 
      source={require('../../../assets/book.jpg')}
      style={styles.imageProfile}
      />
      <Image 
      source={require('../../../assets/book.jpg')}
      style={styles.imageIteam}
      />
      <View style = {styles.details}>
      <Text style={styles.title}>כותרת: {title} </Text>
      <Text style={styles.title}>שם מחבר: {author}</Text>
      </View>
    </TouchableOpacity>

    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={ styles.flatList}
      />
      <TouchableOpacity  style ={{ position: 'absolute', bottom: 100 , backgroundColor : "#ff914d" , borderRadius : 100}} onPress={() => navigation.navigate("AddBook")} >
      <Ionicons size ={50} name = {"add"}  color = {"#ffffff"}   /> 
      </TouchableOpacity>
      {/* <BottomTab navigation = {navigation}/> */}
     
    </View>
  );
}
