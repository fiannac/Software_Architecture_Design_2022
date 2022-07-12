import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFonts } from 'expo-font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import AntDesign from 'react-native-vector-icons/AntDesign';

const FormInput = ({isPsw, placeholderText, iconType, ...rest}) => {
    let [fontsLoaded] = useFonts({
        'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
      })
    const [hidePsw, setHidePsw] = useState(isPsw);
    return (
      <View style={styles.inputContainer}>
        <View style={styles.iconStyle}>
          <AntDesign name={iconType} size={25} color="#666" />
        </View>
        <TextInput
          style={styles.input}
          numberOfLines={1}
          placeholder={placeholderText}
          placeholderTextColor="#666"
          secureTextEntry={hidePsw ? true : false}
          {...rest}
        />
        {isPsw && <Icon
            name={hidePsw ? 'eye-slash' : 'eye'}
            size={23}
            style={{marginLeft: 5, marginRight: 10}}
            color="grey"
            onPress={() => setHidePsw(!hidePsw)}
            />
        }
      </View>
    );
  };
  
  export default FormInput;
  
  const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 5,
      marginBottom: 10,
      width: '100%',
      height: windowHeight / 15,
      borderColor: '#ccc',
      borderRadius: 3,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    iconStyle: {
      padding: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRightColor: '#ccc',
      borderRightWidth: 1,
      width: 50,
    },
    input: {
      padding: 10,
      flex: 1,
      fontSize: 16,
      fontFamily: 'Lato-Regular',
      color: '#333',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });