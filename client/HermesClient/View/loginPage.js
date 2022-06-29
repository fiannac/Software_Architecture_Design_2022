import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {setConnState} from '../App.js'

export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hidePass: true,
    }
    this.navigation = props.navigation;

    this.controller = props.route.params.controller
    this.usrname = '';
    this.psw = '';
  }

  render(){

    return (
      <SafeAreaView>
        <Text>Effettua il login o registrati!</Text>
        <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoUser} placeholder="Inserisci nome utente"/>
        <View style={styles.stilePassword}>
          <TextInput onChangeText = {(value) => {this.psw = value}} style={styles.inserimentoTestoPsw} placeholder="Inserisci password" autoCompleteType="password" secureTextEntry={this.state.hidePass ? true : false}/>
          <Icon
            name={this.state.hidePass ? 'eye-slash' : 'eye'}
            size={15}
            style={{marginLeft: 5}}
            color="grey"
            onPress={() => this.setState({hidePass: !this.state.hidePass})}
          />
        </View>
        <View style={styles.bottone}>
          <View style={styles.bottoneLogin}>
            <Button title="Log in" onPress = {()=>this.controller.login(this.usrname, this.psw)}  />
          </View>
          <Button title="Crea Nuovo account" onPress={() => this.navigation.push('RegisterPage')} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  stilePassword: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  inserimentoTestoUser: {
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    marginLeft: 5,
    width: 200
  },
  inserimentoTestoPsw: {
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    marginLeft: 5,
    width: 200
  },
  bottoneLogin: {
    marginRight: 5,
    marginLeft: 5,
  },
  bottone: {
    flexDirection: "row",//allineo sull'asse x
    marginVertical: 5,
  }
});