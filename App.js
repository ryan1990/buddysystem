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
      screen: "StopwatchScreen", // can be StopwatchScreen, LoginScreen, CreateUserScreen
      loggedInUser: "blank"
    };

    this.changeScreenToLogin = this.changeScreenToLogin.bind(this);
    this.changeScreenToStopwatch = this.changeScreenToStopwatch.bind(this);
    this.changeScreenToCreateUser = this.changeScreenToCreateUser.bind(this);
  }

  // when app starts, it checks storage to see if Key exists and sets state.loggedInUser to Value from storage if exists, else set to "". Key = loggedInUserStorageKey, Value = "email@test.com"
  // logout: set state to "" AND remove key from storage. Key = loggedInUserStorageKey, Value = "email@test.com"
  // login: create key/value in storage and set state to the value. Key = loggedInUserStorageKey. Value = "email@test.com"
  // create new account: after confimed that email address is in AWS as the account, perform login with value set to the email address.
  componentDidMount = () => AsyncStorage.getItem(this.loggedInUserStorageKey).then((value) => {
    console.log("Mount");
    if (value !== null) { // key for user email address exists, indicating they are logged in
      this.setState({ loggedInUser: value });
    } else { // no key for user email address exists, indicating no one is logged in
      this.setState({ loggedInUser: "" });
    }

    // TEST LOGIN/LOGOUT WITH THIS:
    //this.loginUser.call(this, "test333Email555@ggg.com");
    //this.logoutUser.call(this);
  });

  // create key/value in storage and set state to emailAddress
  loginUser(emailAddress) {
    this.storeUserEmailAddress(emailAddress);//.then(() => this.setState({ loggedInUser: emailAddress }));
    this.setState({ loggedInUser: emailAddress })
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

  // async getLoggedInUser() {
  //   let p = this.getLoggedInUserFromStorage();
  //   let pResult = await p;

  //   return pResult;
  // }

  // // return "" if no user and an email address if it is in storage
  // async getLoggedInUserFromStorage() {
  //   try {
  //     let value = await AsyncStorage.getItem(this.loggedInUserStorageKey);
  //     if(value !== null) {
  //       // value previously stored
  //       console.log("value previously stored: key="+this.loggedInUserStorageKey+", value="+value);
  //       return value;
  //     } else {
  //       console.log("value not stored: "+this.loggedInUserStorageKey);
  //       // return "";
  //       return "emailAddressFAKE@gmail.com"
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  // getLoggedInUserFromStorage = async () => {
  //   try {
  //     console.log("pre: "+this.loggedInUserStorageKey);
  //     let value = await AsyncStorage.getItem(this.loggedInUserStorageKey);
  //     console.log("post");
  //     if(value !== null) {
  //       // value previously stored
  //       console.log("value previously stored: key="+this.loggedInUserStorageKey+", value="+value);
  //       return value;
  //     } else {
  //       console.log("value not stored: "+this.loggedInUserStorageKey);
  //       return "";
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  // // play with AsyncStorage
  // getData = async () => {
  //   try {
  //     let key = '@storage_Key';
  //     const value = await AsyncStorage.getItem(key)
  //     if(value !== null) {
  //       // value previously stored
  //       console.log("value previously stored: key="+key+", value="+value);
  //     } else {
  //       console.log("value not stored: "+key);
  //     }
  //   } catch(e) {
  //     // error reading value
  //   }
  // }

  // storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem('@storage_Key', 'stored value')
  //   } catch (e) {
  //     // saving error
  //   }
  // }

  // removeItem = async () => {
  //   try {
  //     await AsyncStorage.removeItem('@storage_Key');
  //   } catch (e) {
  //     // remove error
  //   }
  // }

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
