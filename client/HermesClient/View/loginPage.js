import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, ActivityIndicator, TouchableOpacity, Image, ScrollView } from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import RegistrationPage from './registrationPage.js'


export default class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      registerPage: false,
      loading: false,
      rememberMeLogin: true
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
            <ScrollView contentContainerStyle={styles.container}>
                  <Image
                    source={require('../assets/MicrosoftTeams-image.png')}
                    style={styles.logo}
                  />
            <Text style={styles.text}>Hermes Messenger</Text>

            <FormInput
              onChangeText={(value) => {this.usrname = value}}
              placeholderText="Nome utente"
              iconType="user"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect={false}
              isPsw={false}
            />
            <FormInput
              onChangeText={(value) => {this.psw = value}}
              placeholderText="Password"
              iconType="lock"
              autoComplete="password" 
              isPsw={true}
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

            <FormButton
              buttonTitle="Login"
              handleLogin={this.loginPress}
            />

            <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={()=>this.setRegisterPage(true)}>
                    <Text style={styles.navButtonText}>
                      Don't have an account? Create here
                    </Text>
                  </TouchableOpacity>
                  {<ActivityIndicator size="large" /> && this.state.loading}
                </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    //fontFamily: 'Cochin',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    //fontFamily: 'Cochin',
  },
  checkbox: {
    alignSelf: "center",
  },
});