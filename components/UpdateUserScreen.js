// update/view account info

import * as React from 'react';
import { Alert, Button, Picker, Text, TextInput, View } from 'react-native';
import { validateUsesOnlyDigitCharacters } from './Validator';
import UserInfo from './UserInfo';
import ApiService from './../services/ApiService';

export default class UpdateUserScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      smartGoal: '',
      minutesPerDay: '',
      daysPerWeek: '4'
    };
    this.apiService = new ApiService();
  }

  componentDidMount = async () => {
    let responseForGoalAndCommitment = await this.getResponseForGoalAndCommitment(this.props.loggedInUser);

    if (responseForGoalAndCommitment) {
      try {
        this.loadGoalAndCommitment(responseForGoalAndCommitment);
      } catch(error) {
        Alert.alert(null, "Could not load your account info. Error parsing data."); // TODO: inject this dependency, or better yet, make a class property injected into constructor
      }
    } else {
      Alert.alert(null, "Could not load your account info. Error reaching server, check your internet connection and try again."); // TODO: inject this dependency, or better yet, make a class property injected into constructor
      this.props.goToStopwatchScreen();
    }
  }

  async getResponseForGoalAndCommitment(username) {
    try {
      let response = await this.apiService.GetUserGoalAndCommitmentFakeSuccess200(username);
      if (response === null) {
        return null;
      }
      if (response.status === 200) {
        return response;
      } else {
        return null;
      }
    } catch(error) {
      return null;
    }
  }

  loadGoalAndCommitment(responseForGoalAndCommitment) {
    let smartGoal = responseForGoalAndCommitment.data.goal.toString();
    let minutesPerDay = responseForGoalAndCommitment.data.commitment.minutesPerDay.toString();
    let daysPerWeek = responseForGoalAndCommitment.data.commitment.daysPerWeek.toString();

    this.setState({ smartGoal: smartGoal });
    this.setState({ minutesPerDay: minutesPerDay });
    this.setState({ daysPerWeek: daysPerWeek });
  }

  async updateUserGoalAndCommitment(username, smartGoal, minutesPerDay, daysPerWeek) {
    try {
      // let response = await this.apiService.UpdateUser(username, smartGoal, minutesPerDay, daysPerWeek);
      let response = await this.apiService.UpdateUserFakeSuccess201();
      if (response.status === 200) {
        return true;
      } else {
        return null;
      }
    } catch(error) {
      return null;
    }
  }

  // injecting dependency for alert method
  validateInputs(alertMethod) {
    if (!this.validateContainsText(this.state.smartGoal)) {
      alertMethod("Please fill out all text boxes.");
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
            onPress={async () => {
                let validInputs = this.validateInputs(Alert.alert);
                if (!validInputs) {
                  return;
                }

                const { username, smartGoal, minutesPerDay, daysPerWeek } = this.state;

                let updatedUserSuccessfully = await this.updateUserGoalAndCommitment(username, smartGoal, minutesPerDay, daysPerWeek);

                if (updatedUserSuccessfully === null) {
                  Alert.alert(null, "Could not update user account. Error reaching server, check your internet connection.");
                  return;
                } else { // updatedUserSuccessfully === true
                  Alert.alert(null, "Account info updated successfully.");
                  this.props.goToStopwatchScreen();
                }
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
