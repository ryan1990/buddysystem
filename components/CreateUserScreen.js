// React Native Mobile time tracker app used to capture music practice sessions.
import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

// chance to enter email to create new user account. If it exists, tell them and prompt to retry,
// take them to Stopwatch page.
// Stopwatch page should show email they are logged in as.

export default class CreateUserScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    console.log(navigationOptions);
    // Notice the logs ^
    // sometimes we call with the default navigationOptions and other times
    // we call this with the previous navigationOptions that were returned from
    // this very function
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID'); 
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Enter your email address:</Text>
        <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      value={"Email address"}
    />

        <Button
          title="Create User"
          onPress={() => {
              let userExists = true; // will make api call to backend
              if (!userExists) {
                // TODO: create this new user in backend
                // TODO: let app know we are logged in with this user!
              
                this.props.navigation.navigate('Stopwatch', {
                  itemId: Math.floor(Math.random() * 100),
                })
              } else {
                Alert.alert("An account with this email address already exists.");
              }
            }
          }
        />        
      </View>
    );
  }
}
