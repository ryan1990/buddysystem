// React Native Mobile time tracker app used to capture music practice sessions.
import * as React from 'react';
import { AsyncStorage, Text, View, ScrollView, StyleSheet } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

import Constants from 'expo-constants';

import StopwatchScreen from './components/StopwatchScreen';
import LoginScreen from './components/LoginScreen';
import CreateUserScreen from './components/CreateUserScreen';

export default class App extends React.Component {
  loggedInUserStorageKey = '@loggedInUser';

  constructor() {
    super();

    // let loggedInUserFromStorage;
    // this.getLoggedInUserFromStorage().then(console.log("ALL DONE"));
    // console.log("loggedInUserFromStorage: "+loggedInUserFromStorage);

    //let loggedInUser = this.getLoggedInUser();

    this.state = {
      screen: "LoginScreen", // can be StopwatchScreen, LoginScreen, CreateUserScreen
      loggedInUser: "blank"
    };

    this.changeScreenToLogin = this.changeScreenToLogin.bind(this);
    this.changeScreenToStopwatch = this.changeScreenToStopwatch.bind(this);
    this.changeScreenToCreateUser = this.changeScreenToCreateUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  // when app starts, it checks storage to see if Key exists and sets state.loggedInUser to Value from storage if exists, else set to "". Key = loggedInUserStorageKey, Value = "email@test.com"
  // logout: set state to "" AND remove key from storage. Key = loggedInUserStorageKey, Value = "email@test.com"
  // login: create key/value in storage and set state to the value. Key = loggedInUserStorageKey. Value = "email@test.com"
  // create new account: after confimed that email address is in AWS as the account, perform login with value set to the email address.
  componentDidMount = () => AsyncStorage.getItem(this.loggedInUserStorageKey).then((value) => {
    if (value !== null) { // key for user email address exists, indicating they are logged in
      this.setState({ loggedInUser: value });
      this.changeScreenToStopwatch();
    } else { // no key for user email address exists, indicating no one is logged in
      this.setState({ loggedInUser: "" });
      this.changeScreenToLogin();
    }
  });

  // create key/value in storage and set state to emailAddress
  loginUser(emailAddress) {
    this.storeUserEmailAddress(emailAddress);
    this.setState({ loggedInUser: emailAddress });
  }

  storeUserEmailAddress(emailAddress) {
    AsyncStorage.setItem(this.loggedInUserStorageKey, emailAddress);
  }

  logoutUser() {
    this.removeUserEmailAddressFromStorage();
    this.setState({ loggedInUser: "" });
  }

  // remove the key/value pair with key = this.loggedInUserStorageKey from storage
  removeUserEmailAddressFromStorage() {
    AsyncStorage.removeItem(this.loggedInUserStorageKey);
  }

  changeScreen(newScreen) {
    console.log("changeScreen(): "+newScreen);
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

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {(() => {
          switch (this.state.screen) {
            case "StopwatchScreen":   return <StopwatchScreen logoutUser={ () => {this.logoutUser(); this.changeScreenToLogin()} } loggedInUser={this.state.loggedInUser} />;
            case "LoginScreen":   return <LoginScreen loginUser={ (email) => {this.loginUser(email); this.changeScreenToStopwatch()} } goToCreateUserScreen={this.changeScreenToCreateUser} loggedInUser={this.state.loggedInUser} />;
            case "CreateUserScreen":   return <CreateUserScreen loginUser={ (email) => {this.loginUser(email); this.changeScreenToStopwatch()} } goToLoginScreen={this.changeScreenToLogin} loggedInUser={this.state.loggedInUser} />;
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
