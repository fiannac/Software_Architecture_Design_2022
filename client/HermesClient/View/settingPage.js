import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import {setConnState} from '../App.js'

export default class SettingPage extends React.Component {
  constructor(prop){
    super()

  }

  render(){

    return (
      <View>
        <Text>Setting!</Text>
      </View>
    );
  }
}
