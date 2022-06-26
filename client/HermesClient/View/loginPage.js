import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import {setConnState} from '../App.js'

export default class LoginPage extends React.Component {
  constructor(prop){
    super()
    this.state = {
    }
    console.log(prop.route.params.val)
    this.navigation = prop.navigation;
    this.usrname = '';
    this.psw = '';
  }

  render(){

    return (
      <View>
        <Text>Effettua il login o registrati!</Text>
        <TextInput onChangeText = {(value) => {this.usrname = value}} />
        <TextInput onChangeText = {(value) => {this.psw = value}} secureTextEntry = {true} />
        <Button title="Log in" onPress = {()=>setConnState()}/>
        <Button title="Crea Nuovo account" onPress={() => this.navigation.push('RegisterPage')}/>
      </View>
    );
  }
}

