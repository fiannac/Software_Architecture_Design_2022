import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RegistrationPage from './registrationPage.js'

export default class CreateChat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        newChat: false,
        newGroup: false
    }
    this.controller = props.controller
    this.closePage = props.closePage
  }


  render(){
    if(this.state.newChat == true){
        return (
            <View style = {{height:'100%', width:'100%'}}>
                <View style = {{height:75 , backgroundColor: '#122643',  justifyContent: 'center', padding:15}}>
                    <TouchableOpacity onPress={() => {this.setState({newChat:false})}}>
                        <Icon name="closecircle" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style = {{flex:1, flexDirection:'row', justifyContent:'space-around',alignContent:'center', marginTop:20}}>
                    <TextInput style = {{height:50, width:'70%', borderColor: 'gray', borderWidth: 1, borderRadius:10, margin:10}} placeholder="Nome utente"/>
                    <TouchableOpacity onPress={() => {}}>
                    <Icon name="adduser" size={45} color="black" style = {{margin:10}}/>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    if(this.state.newGroup == true){
        return (
            <Text>Nuovo gruppo...</Text>
        )
    }

    return(
        <View style = {{height:'100%', width:'100%'}}>
            <View style = {{height:75 , backgroundColor: '#122643',  justifyContent: 'center', padding:15}}>
            <TouchableOpacity onPress={() => {}}>
                <Icon name="closecircle" size={30} color="white" />
            </TouchableOpacity>
           
            </View>

            <View style = {{flex:1, flexDirection:'column', justifyContent:'space-around',alignContent:'center'}}>
                <TouchableOpacity onPress={() => this.setState({newChat:true}) } activeOpacity={0.5} style = {{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'space-around',marginVertical:'10%'}}>
                    <Icon name="adduser" size={100} color="black" />
                    <Text>Aggiungi un nuovo utente</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setState({newGroup:true}) } activeOpacity={0.5} style = {{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'space-around',  marginVertical:'10%'}}>
                    <Icon name="addusergroup" size={100} color="black" />
                    <Text>Crea una nuovo gruppo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}