import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import RegistrationPage from './registrationPage.js'


export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hidePass: true,
      registerPage: false,
      loading: false,
      rememberMeLogin: false
    }

    this.controller = props.controller
    this.usrname = '';
    this.psw = '';

    this.setRegisterPage = this.setRegisterPage.bind(this)
    this.loginPress = this.loginPress.bind(this)
  }

  setRegisterPage(value){
    this.setState({registerPage:value})
  }

  async loginPress(){
    this.setState({loading: true})
    if(await this.controller.login(this.usrname, this.psw, this.state.rememberMeLogin) == false){
      alert("Login fallito")
    }
    this.setState({loading: false})
  }

  render(){
  

    if(this.state.registerPage){
      return(<RegistrationPage  controller={this.controller} setRegisterPage = {this.setRegisterPage}/>);
    }else{
      return (
        <View style = {{flex: 1,justifyContent: "center",paddingHorizontal: 10}}>
          <View style = {{alignItems: "center",padding: 10}}>
            <Text>Effettua il login o registrati!</Text>
            <TextInput onChangeText = {(value) => {this.usrname = value}} style={styles.inserimentoTestoUser} placeholder="Inserisci nome utente"/>
            <View style={styles.stilePassword}>
              <TextInput onChangeText = {(value) => {this.psw = value}} style={styles.inserimentoTestoPsw} placeholder="Inserisci password" autoCompleteType="password" secureTextEntry={this.state.hidePass ? true : false}/>
            </View>
            <Icon
                name={this.state.hidePass ? 'eye-slash' : 'eye'}
                size={15}
                style={{marginLeft: 5}}
                color="grey"
                onPress={() => this.setState({hidePass: !this.state.hidePass})}
              />
            <View style = {{flexDirection: "row",justifyContent: "space-between", alignContent:"center"}}>
            <Icon2
              name={this.state.rememberMeLogin ? 'checkbox-intermediate' : 'checkbox-blank-outline'}
              size={15}
              style={{marginLeft: 5}}
              color="black"
              onPress={() => this.setState({rememberMeLogin: !this.state.rememberMeLogin})}
            />
            <Text style={{paddingHorizontal:10}}>Remember me?</Text>
            </View>
            <View style={styles.bottone}>
              <View style={styles.bottoneLogin}>
                <Button title="Log in" onPress = {this.loginPress}  />
              </View>
              <Button title="Crea Nuovo account" onPress={()=>this.setRegisterPage(true)} />
            </View>
          </View>
          {<ActivityIndicator size="large" /> && this.state.loading}
        </View>
      );
    }
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
    flexDirection: "row",
    marginVertical: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
});