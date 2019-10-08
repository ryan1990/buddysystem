import React from 'react';
import { Button, Text, View } from 'react-native';

export default function UserInfo(props) {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Text>Hello {props.loggedInUser}</Text>
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Logout" onPress={props.logoutUser} />
        </View>
      </View>
    )
  }