import * as React from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
//import * as EmailValidator from 'email-validator';
// should remove email-validator from file system if not used!
import { validateEmailAddress } from './Validator';

// SEE THIS!!!
//https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639
//https://scotch.io/tutorials/react-native-app-with-authentication-and-user-management-in-15-minutes
//https://snack.expo.io/@zvona/a-simple-login-form

export default class LoginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      emailAddress: ''
    };
  }

  login() {
    const { emailAddress } = this.state;

    if (!validateEmailAddress(emailAddress)) {
      Alert.alert("Please enter a valid email address.");
      return;
    }

    let userExists = true; // will make api call to backend

    if (userExists) {
      this.props.goToStopwatchScreen(); // show user logged in
    } else {
      Alert.alert("There is no account associated with this email address. Check your spelling or click Create new account.");
      // how can user update their goal/commitment later?
      // separate account creation for timing from create/update of commitment/goal?
      // have new screen that logged in user can use to View AND Update commitment/goal!
    }
  }
  
  render() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Text>Login with your email address if you have an account:</Text>
        </View>
        <View style={{ margin: 10 }}>        
          <TextInput
            value={this.state.emailAddress}
            onChangeText={(emailAddress) => this.setState({ emailAddress })}
            placeholder="Email address"
            style={{height: 40, borderColor: 'gray', borderWidth: 1 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Login" onPress={this.login.bind(this)} />
        </View>
        <View style={{ margin: 10 }}>        
          <Button title="Create new account" onPress={this.props.goToCreateUserScreen} />
        </View>
      </View>
    );
  }
}