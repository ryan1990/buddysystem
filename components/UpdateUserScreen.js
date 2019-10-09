// have this be update/view account info


import * as React from 'react';
import { Alert, Button, Picker, Text, TextInput, View, StyleSheet } from 'react-native';
import { validateEmailAddress, validateUsesOnlyDigitCharacters } from './Validator';
import UserInfo from './UserInfo';

// chance to enter email to create new user account. If it exists, tell them and prompt to retry,

export default class UpdateUserScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      // emailAddress: '',
      smartGoal: '',
      minutesPerDay: '',
      daysPerWeek: '4'
    };
  }

  // injecting dependency for alert method
  validateInputs(alertMethod) {
    if (!this.validateContainsText(this.state.smartGoal)) {
      alertMethod("Please fill out all text boxes.");
      return false;
    }
    if (!(this.validateEmail(this.state.emailAddress))) {
      alertMethod("Please enter a valid email address.");
      return false;      
    }
    if (!(this.validateMinutes(this.state.minutesPerDay))) {
      alertMethod("Please enter a valid positive number for minutes per day.");
      return false;
    }
    return true;
  }

  validateContainsText(input) {
    return !(input === '' || input === null);
  }

  validateMinutes(input) {
    return validateUsesOnlyDigitCharacters(input) && this.minutesAreAppropriate(input);
  }

  // check that bigger than 0 and less than or equal to 24*60, AND not empty string
  minutesAreAppropriate(input) {
    if (input === '' || input === null) {
      return false;
    }
    if (input <= 0 || input >= 24*60) {
      return false;
    }
    return true;
  }

  validateEmail(input) {
    return validateEmailAddress(input);
  }

  render() {
    return (
      <View>
        <UserInfo loggedInUser={this.props.loggedInUser} logoutUser={this.props.logoutUser} />

        <Text style={{ margin: 10 }}>SMART goal</Text>
        
        <TextInput
          value={this.state.smartGoal}
          onChangeText={(smartGoal) => this.setState({ smartGoal })}
          placeholder="SMART goal"
          style={{ borderColor: 'gray', borderWidth: 1, margin: 10 }}
          multiline={true}
        />

        {/* I will practice (TextInput) minutes per day on (dropdown 1-7) days each week. */}
        
        <View style={{flexDirection:"row", height: 30, margin: 10 }}>
          <View style={{flex: 2}}>
            <Text>I will practice</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput
              value={this.state.minutesPerDay}
              onChangeText={(minutesPerDay) => this.setState({ minutesPerDay })}
              style={{borderColor: 'gray', borderWidth: 1 }}
            />
          </View>
          <View style={{flex: 4}}>
            <Text> minutes per day for</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", height: 30, margin: 10 }}>
          <View style={{flex: 1}}>
            <Picker
              selectedValue={this.state.daysPerWeek}
              onValueChange={(itemValue, itemIndex) => this.setState({ daysPerWeek: itemValue })}
              style={{ borderColor: 'gray', borderWidth: 1 }}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
            </Picker>
          </View>
          <View style={{flex: 3}}>
            <Text> days each week.</Text>
          </View>
        </View>

        <Text />
        
        <View style={{ margin: 10 }}>
          <Button
            title="Update Account Info"
            onPress={() => {
                // let validInputs = this.validateInputs(Alert.alert);
                // if (!validInputs) {
                //   return;
                // }

                // //let userExists = false;//true; // will make api call to backend // make sure we call with all lower-case email address characters!

                // if (!userExists) {
                //   // TODO: create this new user in backend
                //   // TODO: let app know we are logged in with this user!
                //   this.props.loginUser(this.state.emailAddress);
                //   //Alert.alert("Create User button clicked in !userExists condition");
                // } else {
                //   Alert.alert("An account with this email address already exists.");
                // }
              }
            }
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Back to Stopwatch" onPress={this.props.goToStopwatchScreen} />
        </View>
      </View>
    );
  }
}