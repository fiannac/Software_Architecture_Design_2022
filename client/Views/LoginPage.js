import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function LandingPage(props){

    const [username, setUser] = useState('');
    const [psw, setPsw] = useState('');


    const logIn_button = () => {
        const msg = JSON.stringify({type: 'login', usr: username, psw: psw});
        props.conn.ws.send(msg);
    }
    
    console.log(props.authError)

    return(
    <View>
        <Text>Effettua il login o registrati!</Text>
        <TextInput onChangeText = {(value) => {setUser(value)}} />
        <TextInput onChangeText = {(value) => {setPsw(value)}} />
        <Button onPress = {logIn_button} title="Log In"/>
        <Button onPress = {logIn_button} title="Sign Up"/>
        <Text>{props.authError ? 'Dati errati' : ''}</Text>
    </View>
    
    )  
}