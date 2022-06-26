import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';


export default class RegistrationPage extends React.Component {
  constructor(){
    super()
    this.usrname = ''
    this.psw = ''
    this.mail = ''
  }

  render(){
    return (
        <View>
        <Text>Registrati con username e password</Text>
        <TextInput onChangeText = {(value) => {this.mail = value}} />
        <TextInput onChangeText = {(value) => {this.usrname = value}} />
        <TextInput onChangeText = {(value) => {this.psw = value}} secureTextEntry = {true} />

        <Button title="Registrati!" onPress={() => console.log("zio pera")}/>
      </View>
    );
  }
}

