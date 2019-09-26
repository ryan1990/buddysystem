import * as React from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
//import * as EmailValidator from 'email-validator';
// should remove email-validator from file system if not used!
import { validateEmailAddress } from './Validator';

export default class LoginScreen extends React.Component {
  
  login() {
    let emailText = "dummyEmailText@aol.net";
    if (!validateEmail(emailText)) {
      Alert.alert("Please enter a valid email address.");
      return;
    } else {
      // TEMP: remove!
      Alert.alert("GOOD EMAIL!!!");      
    }

    let userExists = true; // will make api call to backend

    if (userExists) {
      this.props.goToStopwatchScreen(); // show user logged in

    } else {
      Alert.alert("There is no account associated with this email address. Check your spelling or click Create new account.");
      // how can user update their goal/commitment later?
      // separate account creation for timing from create/update of commitment/goal?
      // have new screen that logged in user can use to update commitment/goal!
    }

    function validateEmail(input) {
      //return EmailValidator.validate(input);
      return validateEmailAddress(input);
    }
  }
  
  render() {
    return (
      <View>
        <Text>Login with your email address if you have an account:</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Email address"
          // onChangeText={(text) => this.setState({text})}
          // value={this.state.text}
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