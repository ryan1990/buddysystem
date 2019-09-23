// React Native Mobile time tracker app used to capture music practice sessions.
import * as React from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet } from 'react-native';

// chance to enter email to create new user account. If it exists, tell them and prompt to retry,
// take them to Stopwatch page.
// Stopwatch page should show email they are logged in as.

export default class CreateUserScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Enter your email address:</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          value={"Email address"}
        />

        {/* Add goals, etc for new user */}

        <Button
          title="Create User"
          onPress={() => {
              // FIX THIS!!!!
              let userExists = false;//true; // will make api call to backend

              if (!userExists) {
                // TODO: create this new user in backend
                // TODO: let app know we are logged in with this user!
                this.props.goToStopwatchScreen();
                //Alert.alert("Create User button clicked in !userExists condition");
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
