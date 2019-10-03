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

    let loggedInUserFromStorage = this.getLoggedInUserFromStorage();
    // CONTINUE:!!!
    console.log("loggedInUserFromStorage: "+loggedInUserFromStorage);


    this.state = {
      screen: "StopwatchScreen", // can be StopwatchScreen, LoginScreen, CreateUserScreen
      loggedInUser: ""
    };

    this.changeScreenToLogin = this.changeScreenToLogin.bind(this);
    this.changeScreenToStopwatch = this.changeScreenToStopwatch.bind(this);
    this.changeScreenToCreateUser = this.changeScreenToCreateUser.bind(this);

    //this.storeData();
    //this.removeItem();
    //this.getData();
  }

  // return "" if no user and an email address if it is in storage
  getLoggedInUserFromStorage = async () => {
    try {
      console.log("pre: "+this.loggedInUserStorageKey);
      const value = await AsyncStorage.getItem(this.loggedInUserStorageKey);
      console.log("post");
      if(value !== null) {
        // value previously stored
        return value;
        console.log("value previously stored: key="+this.loggedInUserStorageKey+", value="+value);
      } else {
        return "";
        console.log("value not stored: "+this.loggedInUserStorageKey);
      }
    } catch(e) {
      // error reading value
    }
  }

  // play with AsyncStorage
  getData = async () => {
    try {
      let key = '@storage_Key';
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
        console.log("value previously stored: key="+key+", value="+value);
      } else {
        console.log("value not stored: "+key);
      }
    } catch(e) {
      // error reading value
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('@storage_Key', 'stored value')
    } catch (e) {
      // saving error
    }
  }

  removeItem = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
    } catch (e) {
      // remove error
    }
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
            case "StopwatchScreen":   return <StopwatchScreen goToLoginScreen={this.changeScreenToLogin} loggedInUser={this.state.loggedInUser} />;
            case "LoginScreen":   return <LoginScreen goToStopwatchScreen={this.changeScreenToStopwatch} goToCreateUserScreen={this.changeScreenToCreateUser} loggedInUser={this.state.loggedInUser} />;
            case "CreateUserScreen":   return <CreateUserScreen goToStopwatchScreen={this.changeScreenToStopwatch} goToLoginScreen={this.changeScreenToLogin} loggedInUser={this.state.loggedInUser} />;
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
