import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
  
import Icon from 'react-native-vector-icons/Entypo'

const ChatSetting = () => {
  const [visible, setVisible] = useState(false);
  
  const closeMenu = () => setVisible(false);
  const openMenu = (v) => setVisible(true);
  return (
      <View style={styles.container}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Icon name="dots-three-vertical" size={20} color='black' onPress={openMenu}/>
          }>
          <Menu.Item
            onPress={() => {
              Alert.alert('Action : ', 'Print');
            }}
            title="Blocca/Sblocca utente"
          />
          <Menu.Item
            onPress={() => {
              Alert.alert('Action : ', 'Forward');
            }}
            title="Elimina chat"
          />
        </Menu>
      </View>
  );
};
  
export default ChatSetting;
  
const styles = StyleSheet.create({
  container: {
    padding: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 200,
  },
});