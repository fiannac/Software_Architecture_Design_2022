import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Button, TextInput, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { Avatar, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Conversation from "../components/Conversation";


import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

import ChatPage from './chatPage.js'

export let notifyChat
export let notifyMessage

const PLACEHOLDER_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'

export default class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chats : [],
      chatOpen : false,
      chatOpenNumber : 0
    }

    this.newUser = ''
    this.controller = props.controller

    notifyChat = this.notifyChat
    notifyMessage = this.notifyMessage

    this.handleCreateChat = this.handleCreateChat.bind(this)
    this.handleNavigation = this.handleNavigation.bind(this)
    this.signOutUser = this.signOutUser.bind(this)
  }

  notifyChat = (id, userName)=>{
    this.setState({chats:[...this.state.chats, {user:userName, id:id, chat:[]}]})
  }

  notifyMessage = (id,msg)=>{
    for(let i=0; i<this.state.chats.length; i++){
      if(this.state.chats[i].id == id){
        this.state.chats[i].chat = [...this.state.chats[i].chat,msg]
      }
    }

    this.setState({chats:[...this.state.chats]})
  }

  handleCreateChat = () =>{
    if(this.newUser != ''){
      this.controller.createChatFromUsername(this.newUser)
      this.textInput.clear()
    }
  }

  handleNavigation = () => {
    this.setState({chatOpen:false})
  }

  signOutUser = () => {
    this.controller.logout()
  }

  render(){
    if(this.state.chatOpen == false){
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#122643'}}>
          <View style={{paddingVertical: 50, paddingHorizontal: 30,}}>
            <View style={styles.container}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.signOutUser}>
                <Avatar
                  rounded
                  source={{
                    uri: PLACEHOLDER_AVATAR,
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
              <TouchableOpacity style={{ marginRight: 15 }} activeOpacity={0.5}>
              <Icon name="search" size={18} color="white" />
              </TouchableOpacity>
              </View>
          </View>

          <Text h4 style={{ color: 'white', marginTop: 15 }}>
            Conversazioni
          </Text>
          </View>
          <View style={styles.chatContainer}>
            <ScrollView
              style={{
              minHeight: Dimensions.get('window').height - 180,
              marginTop: 5,
              paddingTop: 5,
              }}
              showsVerticalScrollIndicator={false}
            >

            {this.state.chats.map((id,i) => (
              <Conversation
                key={i}
                id={id.user}
                handleNavigation={()=>this.setState({chatOpen:true, chatOpenNumber:i})}
                text={this.state.chats[i].chat.length == 0 ? ' ' : this.state.chats[i].chat[this.state.chats[i].chat.length-1]}
              />
            ))}
            </ScrollView>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
            onPress={this.handleCreateChat}
            style={styles.button}
            activeOpacity={0.5}
          >
            <Icon name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TextInput placeholder="Inserisci username contatto" onChangeText = {(value) => {this.newUser = value}} ref={input => { this.textInput = input }}/>
        </SafeAreaView>
      );
    } else {
      return(
        <View>
          <ChatPage controller = {this.controller} chat = {this.state.chats[this.state.chatOpenNumber].chat} userName = {this.state.chats[this.state.chatOpenNumber].user} id = {this.state.chats[this.state.chatOpenNumber].id} handleNavigation={this.handleNavigation}/>
        </View>
      /*<View>
        <Button onPress = {()=>this.setState({chatOpen:false})}/>
        <ChatPage controller = {this.controller} chat = {this.state.chats[this.state.chatOpenNumber].chat} userName = {this.state.chats[this.state.chatOpenNumber].user} id = {this.state.chats[this.state.chatOpenNumber].id}/>
      </View>
      */
      )      
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chatContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 5,
    overflow: 'hidden',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    right: 30,
  },
  button: {
    shadowColor: '#171717',
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 2,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 50,
    backgroundColor: '#122643',
  },
})
//<Button title = "Aggiungi chat" onPress={()=>this.createChat('Mimmo' + this.state.chats.length)}></Button>
//<Button title = "Aggiungi msg" onPress={()=>this.createMessage('Mimmo0','we puppy')}></Button>
/*{this.state.chats.map(( (id,i) => (
            <Button key = {i} title = {id.user} onPress={()=>this.setState({chatOpen:true, chatOpenNumber:i})}/>
          )))}
*/