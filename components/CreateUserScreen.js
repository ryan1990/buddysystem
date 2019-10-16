import * as React from 'react';
import { Alert, Button, Picker, Text, TextInput, View, StyleSheet } from 'react-native';
import { validateAtLeast4Characters, validateUsesOnlyDigitCharacters } from './Validator';
import ApiService from './../tests/ApiService';

// chance to enter username to create new user account. If it exists, tell them and prompt to retry,

export default class CreateUserScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
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
    if (!(this.validateUsername(this.state.username))) {
      alertMethod("Please enter a username with at least 4 characters.");
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

  validateUsername(input) {
    return validateAtLeast4Characters(input);
  }

  // make call to backend to see if user exists
  async userExistsInBackend(user) {
    api = new ApiService();
    let response = await api.UserExistsFakeFalse(); // put in try?

    try {
      return response.data.userIdExists;
    } catch(error) {
      return null;
    }
  }
  
  async createUserInBackend(username) {
    api = new ApiService(); // TODO: inject this dependency, or better yet, make a class property injected into constructor
    try {
      // let response = await api.CreateUser(username);
      let response = await api.CreateUserFakeSuccess201();
      if (response.status === 201) {
        return true;
      } else {
        return null;
      }
    } catch(error) {
      return null;
    }
  }

  async updateUserGoalAndCommitment(username, smartGoal, minutesPerDay, daysPerWeek) {
    api = new ApiService(); // TODO: inject this dependency, or better yet, make a class property injected into constructor
    try {
      // let response = await api.UpdateUser(username, smartGoal, minutesPerDay, daysPerWeek);
      let response = await api.UpdateUserFakeSuccess201();
      if (response.status === 200) {
        return true;
      } else {
        return null;
      }
    } catch(error) {
      return null;
    }
  }

  render() {
    return (
      <View>
        <View style={{flexDirection:"row", height: 30, margin: 10 }}>
          <View style={{flex: 1}}>
            <Text style={{justifyContent: 'flex-start'}}>Username:</Text>
          </View>
          <View style={{flex: 1}}>
            <TextInput style={{justifyContent: 'flex-end'}}
              value={this.state.username}
              onChangeText={(username) => this.setState({ username: username.trim() })} // save as lowercase!!!!!
              placeholder="Username"
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
            title="Create Account"
            onPress={ async () => {                
                let validInputs = this.validateInputs(Alert.alert);
                if (!validInputs) {
                  return;
                }

                const { username, smartGoal, minutesPerDay, daysPerWeek } = this.state;

                let userExists = await this.userExistsInBackend(username); // make sure we call with all lower-case characters!

                if (!userExists) {
                  let createdUserSuccessfully = await this.createUserInBackend(username);

                  if (createdUserSuccessfully === null) {
                    Alert.alert(null, "Could not create user account. Error reaching server, check your internet connection.");
                    // TODO: pass null first in all alerts in App!
                    return;
                  }

                  let updatedUserSuccessfully = await this.updateUserGoalAndCommitment(username, smartGoal, minutesPerDay, daysPerWeek);

                  if (updatedUserSuccessfully === null) {
                    Alert.alert(null, "Could not update user account. Error reaching server, check your internet connection.");
                    return;
                  }

                  this.props.loginUser(this.state.username);
                  //Alert.alert("Create User button clicked in !userExists condition");
                } else {
                  Alert.alert(null, "An account with this Username already exists.");
                }
              }
            }
          />
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title="Back to Login"
            onPress={this.props.goToLoginScreen}
          />
        </View>
      </View>
    );
  }
}
