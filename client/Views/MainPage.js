import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function MainPage(props){
    return(
        <Button onPress={()=>{props.setLogged(false)}}></Button>
    )


}