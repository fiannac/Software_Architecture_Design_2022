import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './View/loginPage.js'
import RegistrationPage from './View/registrationPage.js';
import MainPage from './View/mainPage.js';

export let setConnState

const LoginStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default class App extends React.Component {
  constructor(){
    super()
    this.state = {
      logged: false
    }
    setConnState = this.setConnState
  }

  setConnState = () =>{
    this.setState({logged: !this.state.logged})
  }

  render(){
    if(!this.state.logged){
      return (
      <NavigationContainer>
        <LoginStack.Navigator initialRouteName="LoginPage">
          <LoginStack.Screen name="LoginPage" component={LoginPage} initialParams={{val : 1}}/>
          <LoginStack.Screen name="RegisterPage" component = {RegistrationPage} />
        </LoginStack.Navigator>
      </NavigationContainer>
      );
    } else {
      return(
        <NavigationContainer>
        <MainStack.Navigator initialRouteName="MainPage">
          <MainStack.Screen name="MainPage" component={MainPage}/>
        </MainStack.Navigator>
      </NavigationContainer>
      );
    }
    
  }
}

