import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { connection } from 'websocket';
import { setCredentials, setLogin } from '../Model/authReducer';

export default function LandingPage(props){

    const [username, setUser] = useState('');
    const [psw, setPsw] = useState('');
    
    const [pswError, setPswError] = useState(false);

    const loginButton = () => {
        /*
        controllo sulla validità della psw
        */
        if(!pswError){
            props.connection.login(username, psw);
        }
    }

    const signupButton = () => {
        /*const msg = JSON.stringify({type: 'signup', usr: username, psw: psw});
        props.conn.ws.send(msg);


        lavora ad una schermata di registrazione...
        */
    }
    //autherror, variabile di stato gestita da Redux, deve essere modificata dal controller
    return(
    <View>
        <Text>Effettua il login o registrati!</Text>
        <TextInput onChangeText = {(value) => {setUser(value)}} />
        <TextInput onChangeText = {(value) => {setPsw(value)}} secureTextEntry = {true} />
        <Text>{pswError ? 'Dati login non validi, la psw deve essere ...' : ''}</Text>
        <Text>{false ? 'Dati errati' : ''}</Text> 
        <Button onPress = {loginButton} title="Log in"/>
        <Button onPress = {signupButton} title="Sign up"/>
        
        
    </View>
    
    )  
}