import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function MainPage(props){

    const leave = () => {
        props.conn.ws.send(JSON.stringify({type: 'logout', usr: props.username}));
    }

    return(
        <View>
        <Text>Loggato come {}</Text>
        <Button onPress={leave} title = 'Log out'/>
        </View>
    )
}