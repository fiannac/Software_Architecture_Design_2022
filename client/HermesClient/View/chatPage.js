import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Icon from 'react-native-vector-icons/FontAwesome5'


import {setConnState} from '../App.js'

export default class ChatPage extends React.Component {
  constructor(props){
    super(props)
    this.msg = ''
    this.handleMsgSend = this.handleMsgSend.bind(this)
    this.controller = props.controller
    this.userName = props.userName
    this.id = props.id
  }

  handleMsgSend = ()=>{
    if(this.msg != ''){
      this.controller.inviaMessaggio(this.id,this.msg)
      this.textInput.clear()
    }
  }

  
  render(){
    
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[styles.flexify, { paddingHorizontal: 15, paddingVertical: 25 }]}
        >
          <TouchableOpacity onPress={() => { this.props.handleNavigation(); }} activeOpacity={0.5}>
            <Icon name="arrow-left" size={18} color="white" />
          </TouchableOpacity>

          <View style={[styles.flexify, { flex: 1, marginLeft: 15 }]}>
            <View style={styles.flexify}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  marginLeft: 10,
                  textTransform: 'capitalize',
                }}
              >
                {this.userName}
              </Text>
            </View>


          </View>
        </View>
        

      </SafeAreaView>
    );
    /*
      <SafeAreaView>
          <Text>Chat con {this.userName}</Text>
          {this.props.chat.map(((msg, i) => (
            <Text key={i}>{msg}</Text>
          )))}

          <TextInput onChangeText={(value) => { this.msg = value; } } ref={input => { this.textInput = input; } } />
          <Button onPress={this.handleMsgSend} title="Invia messaggio" />
          <Button onPress={() => { this.props.handleNavigation(); } } title="Torna alla chat" />
        </SafeAreaView>
    );
    */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#122643',
  },
  flexify: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  msgBg: {
    flex: 1,
    backgroundColor: '#efefef',
    borderRadius: 20,
    padding: 10,
  },
  spaceMsg: {
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
  },
  positAtBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
})