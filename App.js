// React Native Mobile time tracker app used to capture music practice sessions.
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import { createStackNavigator } from 'react-navigation-stack';
import StopwatchScreen from './components/StopwatchScreen';
import LoginScreen from './components/LoginScreen';


// user view, login view, stopwatch view

// export default function App() {
//   return (
//     <View style={styles.container}>  
//       <Stopwatch />
//     </View>
//   );
// }

const RootStack = createStackNavigator(
  {
    Stopwatch: StopwatchScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Stopwatch',
    /* The header config from StopwatchScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


// STYLES:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
