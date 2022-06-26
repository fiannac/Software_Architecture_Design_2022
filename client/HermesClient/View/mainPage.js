import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import {setConnState} from '../App.js'

export default class MainPage extends React.Component {
  constructor(prop){
    super()
    this.navigation = prop.navigation
    this.state = {
      chats : [1,2,3,4,5]
    }

    const f = () => {
      console.log("wewe")
      this.setState({chats: [0,0,0,0,0,0,0,0]})
    }

    let myTimeout = setTimeout(f, 1000);
  }

  render(){
    console.log("Creazione mainpage")
    return (
      <View>
        <Text>Mainpage!</Text>
        {this.state.chats.map((id => (
          <Button title = {id} onPress={() => this.navigation.navigate('ChatPage',{state:this.chats})}/>
        )))}
      </View>
    );
  }
}
