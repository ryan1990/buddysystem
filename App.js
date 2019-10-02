// React Native Mobile time tracker app used to capture music practice sessions.
import * as React from 'react';
import { AsyncStorage, Text, View, ScrollView, StyleSheet } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';

import Constants from 'expo-constants';

import StopwatchScreen from './components/StopwatchScreen';
import LoginScreen from './components/LoginScreen';
import CreateUserScreen from './components/CreateUserScreen';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      screen: "StopwatchScreen" // can be StopwatchScreen, LoginScreen, CreateUserScreen
    }; 
    //this.storeData();
    //this.removeItem();
    //this.getData();
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
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {(() => {
          switch (this.state.screen) {
            case "StopwatchScreen":   return <StopwatchScreen goToLoginScreen={this.changeScreen.bind(this, "LoginScreen")} />;
            case "LoginScreen":   return <LoginScreen goToStopwatchScreen={this.changeScreen.bind(this, "StopwatchScreen")} goToCreateUserScreen={this.changeScreen.bind(this, "CreateUserScreen")} />;
            case "CreateUserScreen":   return <CreateUserScreen goToStopwatchScreen={this.changeScreen.bind(this, "StopwatchScreen")} goToLoginScreen={this.changeScreen.bind(this, "LoginScreen")} />;
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
