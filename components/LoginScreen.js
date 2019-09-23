import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>
          LoginScreen!
        </Text>
        <Text>Enter your email address:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={"Email address"}
        />
        {/* CONTINUE BELOW WITH LOGIN BUTTON!!! */}
        <Button title="Login" />
        <Button title="Sign up" onPress={this.props.goToCreateUserScreen} />
      </View>
    );
  }
}