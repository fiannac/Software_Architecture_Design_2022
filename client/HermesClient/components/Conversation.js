import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from 'react-native-elements'

const PLACEHOLDER_AVATAR = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'


export default class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.date = new Date(this.props.timestamp);
    } 

    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    render() { 
        return(
            <TouchableOpacity
            style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            }}
            onPress={this.props.handleNavigation}
            >
    
            <View
                style={{
                    flex: 1,
                    marginLeft: 10,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <Avatar
                  rounded
                  source={{
                    uri: PLACEHOLDER_AVATAR,
                  }}
                />
                <View style={{flexDirection: 'column', paddingLeft:15}}>
                    
                    <View style ={{flexDirection: 'row', justifyContent:'space-between', width:'70%'}}>
                        <Text h5 style={{ fontWeight: '700' }}>
                            {this.props.id}
                        </Text>
                        {<Text style={{ fontWeight: '200' }}>{this.pad(this.date.getHours())}:{this.pad(this.date.getMinutes())}</Text>}
                    </View>

                    <Text style={{ color: 'gray', marginLeft: 5}}>
                        {this.props.text.length >30 ? this.props.text.slice(0, 30) + '...' : this.props.text.slice(0, 30) }
                    </Text>

                </View>
            </View>

            </TouchableOpacity>
        )
    }
  }