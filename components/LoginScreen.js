import * as React from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { validateAtLeast4Characters } from './Validator'; 
import ApiService from './../tests/ApiService';

// SEE THIS!!!
//https://code.tutsplus.com/tutorials/common-react-native-app-layouts-login-page--cms-27639
//https://scotch.io/tutorials/react-native-app-with-authentication-and-user-management-in-15-minutes
//https://snack.expo.io/@zvona/a-simple-login-form

export default class LoginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      username: ''
    };

    this.login = this.login.bind(this);
  }

  async login() {
    const { username } = this.state;

    if (!validateAtLeast4Characters(username)) {
      Alert.alert("Please enter a username with at least 4 characters.");
      return;
    }

    //READ:
    //https://snack.expo.io/@ryan12/223b0a
    //https://stackoverflow.com/questions/46750263/react-js-how-to-do-service-layer-call
    //https://medium.com/react-native-training/learning-to-test-react-native-with-jest-part-4-1d6df49866b1
    let userExists = await this.userExistsInBackend(username);

    if (userExists) {
      this.props.loginUser(this.state.username); // show user logged in
    } else if (userExists === false) {
      Alert.alert("There is no account associated with this Username. Check your spelling or click Create new account.");
    } else { // userExists === null OR undefined, etc.
      Alert.alert("Error reaching server, check your internet connection.");
    }
  }

  // make call to backend to see if user exists
  async userExistsInBackend(user) {
    api = new ApiService();
    let response = await api.UserExistsFakeTrue();

    try {
      return response.data.userIdExists;
    } catch(error) {
      return null;
    }
  }
  
  render() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Text>Login with your Username if you have an account:</Text>
        </View>
        <View style={{ margin: 10 }}>        
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username: username.trim() })} // save as lowercase!!!!!
            placeholder="Username"
            style={{height: 40, borderColor: 'gray', borderWidth: 1 }}
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Login" onPress={this.login} />
        </View>
        <View style={{ margin: 10 }}>        
          <Button title="Create new account" onPress={this.props.goToCreateUserScreen} />
        </View>
      </View>
    );
  }
}