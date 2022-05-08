import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function App() {

  const [conn, setConn] = useState(false);

  const [logged_in, setLogged_in] = useState(false);


  const [username, setUser] = useState('');
  const [psw, setPsw] = useState('');
  const [login_error, setLogin_error] = useState(false);

  const [socket, setSocket] = useState();


  useEffect(() => { //conn all avvio

    var soc = new WebSocket('ws://192.168.1.10:8080/');
    
    soc.onopen = () => {console.log("ws aperta")}
    soc.onmessage = ({data}) => {
      console.log(data);

      const msg = JSON.parse(data);
      if(msg?.type == 'login' && msg?.ok == true){
        setLogged_in(true);
      }
      if(msg?.type == 'login' && msg?.ok == false){
        setLogin_error(true);
      }
    }

    setSocket(soc);

    setConn(true);
  }, [])


  const logIn_button = () => {
    const msg = JSON.stringify({type: 'login', usr: username, psw: psw});
    socket.send(msg);

  }

  if(!conn){
    return(
      <Text> Connessione in corso...</Text>
    )
  }

  if(logged_in){
    return(<Text>Sei Loggato con {username}, {psw}</Text>)
  } else {
    return(
    <View>
      <Text>Effettua il login o registrati!</Text>
      <TextInput onChangeText = {(value) => {setUser(value)}} />
      <TextInput onChangeText = {(value) => {setPsw(value)}} />
      <Button onPress = {logIn_button} title="Log In"/>
      <Button onPress = {logIn_button} title="Sign Up"/>
      <Text>{login_error ? 'Dati errati' : ''}</Text>
    </View>
    )
  }
}

