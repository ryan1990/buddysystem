// React Native Mobile time tracker app used to capture music practice sessions.
import * as React from 'react';
import { Alert, Button, CheckBox, Text, TextInput, View, StyleSheet } from 'react-native';
import { validateEmailAddress } from './Validator';

// chance to enter email to create new user account. If it exists, tell them and prompt to retry,
// take them to Stopwatch page.
// Stopwatch page should show email they are logged in as.

export default class CreateUserScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      smartGoal: '',
      commitment: ''
    };
  }

  // injecting dependency for alert method
  validateInputs(alertMethod) {
    if (!(this.validateContainsText(this.state.firstName)
        && this.validateContainsText(this.state.lastName)
        && this.validateContainsText(this.state.phoneNumber)
        && this.validateContainsText(this.state.smartGoal)
        && this.validateContainsText(this.state.commitment))) {
      alertMethod("Please fill out all text boxes.");
      return false;
    }
    if (!(this.validateEmail(this.state.emailAddress))) {
      alertMethod("Please enter a valid email address.");
      return false;      
    }
    return true;
  }

  validateContainsText(input) {
    return !(input === '' || input === null);
  }

  validateEmail(input) {
    return validateEmailAddress(input);
  }

  render() {
    return (
      <View>
        <View style={{flexDirection:"row", height: 30, margin: 10 }}>
          <View style={{flex: 1}}>
            <Text style={{justifyContent: 'flex-start'}}>First Name:</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput style={{justifyContent: 'flex-end'}}
              value={this.state.firstName}
              onChangeText={(firstName) => this.setState({ firstName })}
              placeholder="First Name"
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
        </View>

        <View style={{flexDirection:"row", height: 30, margin: 10 }}>
          <View style={{flex: 1}}>
            <Text style={{justifyContent: 'flex-start'}}>Last Name:</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput style={{justifyContent: 'flex-end'}}
              value={this.state.lastName}
              onChangeText={(lastName) => this.setState({ lastName })}
              placeholder="Last Name"
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
        </View>

        <View style={{flexDirection:"row", height: 30, margin: 10 }}>
          <View style={{flex: 1}}>
            <Text style={{justifyContent: 'flex-start'}}>Phone number:</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput style={{justifyContent: 'flex-end'}}
              value={this.state.phoneNumber}
              onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
              placeholder="Phone number"
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
        </View>

        <View style={{flexDirection:"row", height: 30, margin: 10 }}>
          <View style={{flex: 1}}>
            <Text style={{justifyContent: 'flex-start'}}>Email address:</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput style={{justifyContent: 'flex-end'}}
              value={this.state.emailAddress}
              onChangeText={(emailAddress) => this.setState({ emailAddress })}
              placeholder="Email address"
              style={{flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
        </View>

        <Text style={{ margin: 10 }}>Create a SMART goal for yourself of what you want to accomplish. SMART stands for: Specific, Measurable, Attainable, Relevant, Time-Based. Example: Play "African Flower" by Duke Ellington by April 1. My SMART Goal:</Text>
        
        <TextInput
          value={this.state.smartGoal}
          onChangeText={(smartGoal) => this.setState({ smartGoal })}
          placeholder="SMART goal"
          style={{ borderColor: 'gray', borderWidth: 1, margin: 10 }}
          multiline={true}
        />
        
        <Text style={{ margin: 10 }}>Make a commitment that creates for yourself the time, place, and activity you will practice regularly to reach your goal. Example: I will practice piano for 10 minutes each weekday. My Commitment:</Text>
        
        <TextInput
          value={this.state.commitment}
          onChangeText={(commitment) => this.setState({ commitment })}
          placeholder="Commitment"
          style={{ borderColor: 'gray', borderWidth: 1, margin: 10 }}
          multiline={true}
        />

        <Text />
        
        <Button
          title="Create User"
          onPress={() => {
              // FIX THIS!!!!
              let validInputs = this.validateInputs(Alert.alert);
              if (!validInputs) {
                return;
              }

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
