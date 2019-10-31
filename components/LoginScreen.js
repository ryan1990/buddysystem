import * as React from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { validateAtLeast4Characters } from './Validator'; 
import ApiService from './../services/ApiService';

export default class LoginScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      username: ''
    };

    this.login = this.login.bind(this);
    this.apiService = new ApiService();
  }

  async login() {
    const { username } = this.state;

    if (!validateAtLeast4Characters(username)) {
      Alert.alert(null, "Please enter a username with at least 4 characters.");
      return;
    }

    let userExists = await this.userExistsInBackend(username);

    if (userExists) {
      this.props.loginUser(this.state.username); // show user logged in
    } else if (userExists === false) {
      Alert.alert(null, "There is no account associated with this Username. Check your spelling or click Create new account.");
    } else { // userExists === null OR undefined, etc.
      Alert.alert(null, "Error reaching server, check your internet connection.");
    }
  }

  // make call to backend to see if user exists
  async userExistsInBackend(user) {
    try {
      let response = await this.apiService.UserExistsFakeTrue();
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
            onChangeText={(username) => this.setState({ username: username.trim() })} // TODO: save as lowercase?
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