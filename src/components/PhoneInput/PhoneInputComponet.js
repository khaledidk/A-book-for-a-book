import { isEmpty } from '@firebase/util';
import * as React from 'react';
import { useState , useRef , useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import PhoneInput  from 'react-native-phone-number-input';
import styles from "./styles";
export default function PhoneInputComponet({  defaultValue,Preesed , ...props}) {
 
    const [ValidNumber, setValidNumber] = useState(false);
    const [PhoneInputerror, setPhoneInputerror] = useState(" ");
    const [CheckValue, setCheckValue] = useState("1");
    const phoneInput = useRef(null);
    useEffect(() => {
        // Update the document title using the browser API
        const CheckValidPhoneNumber = phoneInput.current?.isValidNumber(defaultValue);
        setValidNumber(CheckValidPhoneNumber ? CheckValidPhoneNumber : false);
        
        if (!defaultValue && Preesed) {
            return;
        }
        else if (!CheckValidPhoneNumber && Preesed ) {
            setPhoneInputerror("* מספר טלפון אינו נכון")
            return;
        } else {
            setPhoneInputerror('')
        }
    
      });




    return (
        
     <View>
      
           {PhoneInputerror ?   <PhoneInput
                ref={phoneInput}
                defaultValue={defaultValue}
                defaultCode="IL"
                layout="first"
                placeholder='מספר טלפון'

      
            containerStyle={styles.PhoneInputBorderError}
            textContainerStyle={{ backgroundColor: '#ffffff' }}
            countryPickerButtonStyle={styles.PhoneInputButton}
            countryPickerProps={{ region: 'Asia' }}
            onChangeText={(text) => {
                setCheckValue(text);
            }}

     
            filterProps={{ placeholder: 'תבחרו מדינה' }}

            withShadow
            {...props}

            /> : null}
             {!PhoneInputerror ?   <PhoneInput
                ref={phoneInput}
                defaultValue={defaultValue}
                defaultCode="IL"
                layout="first"
                placeholder='מספר טלפון'

      
            containerStyle={styles.PhoneInputStyle}
            textContainerStyle={{ backgroundColor: '#ffffff' }}
            countryPickerButtonStyle={styles.PhoneInputButton}
            countryPickerProps={{ region: 'Asia' }}
         

            filterProps={{ placeholder: 'תבחרו מדינה' }}

            withShadow
            {...props}

            /> : null}
        
    {PhoneInputerror ? <Text style={styles.error}>{PhoneInputerror}</Text> : null} 

        </View>


    

    )
}