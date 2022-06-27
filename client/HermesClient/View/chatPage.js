import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import {setConnState} from '../App.js'

export default class ChatPage extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    
    return (
      <View>
    
        {this.props.chat.map(( (msg,i) => (
            <Text key = {i}>{msg}</Text>
        )))}
      </View>
    );
  }
}
