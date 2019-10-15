// React Native Mobile time tracker app used to capture music practice sessions.
import * as React from 'react';
import { AsyncStorage, Text, View, ScrollView, StyleSheet } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

import Constants from 'expo-constants';

import StopwatchScreen from './components/StopwatchScreen';
import LoginScreen from './components/LoginScreen';
import CreateUserScreen from './components/CreateUserScreen';
import UpdateUserScreen from './components/UpdateUserScreen';

export default class App extends React.Component {
  loggedInUserStorageKey = '@loggedInUser';

  constructor() {
    super();

    // let loggedInUserFromStorage;
    // this.getLoggedInUserFromStorage().then(console.log("ALL DONE"));
    // console.log("loggedInUserFromStorage: "+loggedInUserFromStorage);

    //let loggedInUser = this.getLoggedInUser();

    this.state = {
      screen: "LoginScreen", // can be StopwatchScreen, LoginScreen, CreateUserScreen, UpdateUserScreen
      loggedInUser: "blank"
    };

    this.changeScreenToLogin = this.changeScreenToLogin.bind(this);
    this.changeScreenToStopwatch = this.changeScreenToStopwatch.bind(this);
    this.changeScreenToCreateUser = this.changeScreenToCreateUser.bind(this);
    this.changeScreenToUpdateUser = this.changeScreenToUpdateUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  // when app starts, it checks storage to see if Key exists and sets state.loggedInUser to Value from storage if exists, else set to "". Key = loggedInUserStorageKey, Value = "myusername123"
  // logout: set state to "" AND remove key from storage. Key = loggedInUserStorageKey, Value = "myusername123"
  // login: create key/value in storage and set state to the value. Key = loggedInUserStorageKey. Value = "myusername123"
  // create new account: after confimed that username is in AWS as the account, perform login with value set to the username.
  componentDidMount = () => AsyncStorage.getItem(this.loggedInUserStorageKey).then((value) => {
    if (value !== null) { // key for username exists, indicating they are logged in
      this.setState({ loggedInUser: value });
      this.changeScreenToStopwatch();
    } else { // no key for username exists, indicating no one is logged in
      this.setState({ loggedInUser: "" });
      this.changeScreenToLogin();
    }
  });

  // create key/value in storage and set state to username
  loginUser(username) {
    this.storeUsername(username);
    this.setState({ loggedInUser: username });
  }

  storeUsername(username) {
    AsyncStorage.setItem(this.loggedInUserStorageKey, username);
  }

  logoutUser() {
    this.removeUsernameFromStorage();
    this.setState({ loggedInUser: "" });
  }

  // remove the key/value pair with key = this.loggedInUserStorageKey from storage
  removeUsernameFromStorage() {
    AsyncStorage.removeItem(this.loggedInUserStorageKey);
  }

  changeScreen(newScreen) {
    this.setState({screen: newScreen});
  }

  changeScreenToLogin() {
    this.changeScreen("LoginScreen");
  }

  changeScreenToStopwatch() {
    this.changeScreen("StopwatchScreen");
  }

  changeScreenToCreateUser() {
    this.changeScreen("CreateUserScreen");
  }

  changeScreenToUpdateUser() {
    this.changeScreen("UpdateUserScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {(() => {
          switch (this.state.screen) {
            case "StopwatchScreen":   return <StopwatchScreen logoutUser={ () => {this.logoutUser(); this.changeScreenToLogin()} } goToUpdateUserScreen={this.changeScreenToUpdateUser} loggedInUser={this.state.loggedInUser} />;
            case "LoginScreen":   return <LoginScreen loginUser={ (username) => {this.loginUser(username); this.changeScreenToStopwatch()} } goToCreateUserScreen={this.changeScreenToCreateUser} />;
            case "CreateUserScreen":   return <CreateUserScreen loginUser={ (username) => {this.loginUser(username); this.changeScreenToStopwatch()} } goToLoginScreen={this.changeScreenToLogin} />;
            case "UpdateUserScreen":  return <UpdateUserScreen logoutUser={ () => {this.logoutUser(); this.changeScreenToLogin()} } goToStopwatchScreen={this.changeScreenToStopwatch} loggedInUser={this.state.loggedInUser} />;
          }
        })()}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    //backgroundColor: '#ecf0f1',
    padding: 8,
  },
  // paragraph: {
  //   margin: 24,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});

// was from expo Snack:
// // STYLES:
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
