// React Native Mobile time tracker app used to capture music practice sessions.
import * as React from 'react';
import { Alert, Text, View, ScrollView, StyleSheet } from 'react-native';
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
            case "CreateUserScreen":   return <CreateUserScreen goToStopwatchScreen={this.changeScreen.bind(this, "StopwatchScreen")} />;
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
