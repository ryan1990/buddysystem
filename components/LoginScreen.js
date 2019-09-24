import * as React from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';

export default class LoginScreen extends React.Component {
  login() {
    let userExists = true; // will make api call to backend

    if (userExists) {
      this.props.goToStopwatchScreen(); // show user logged in
      // do email validation!
    } else {
      Alert.alert("There is no account associated with this email address. Check your spelling or click Create new account.");
      // how can user update their goal/commitment later?
      // separate account creation for timing from create/update of commitment/goal?
      // have new screen that logged in user can use to update commitment/goal!
    }
  }
  
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
        <Text />
        <Button title="Login" onPress={this.login.bind(this)} />
        <Text />
        <Text />
        <Button title="Create new account" onPress={this.props.goToCreateUserScreen} />
      </View>
    );
  }
}