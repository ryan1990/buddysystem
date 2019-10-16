import React from 'react';
import { Button, Text, View } from 'react-native';
import ApiService from './../tests/ApiService';

export default class UserInfo extends React.Component {
  constructor(props) {
    super();
    this.successfulWeeks = 0;
  }

  componentDidMount = async () => {
    let userSessions = await this.getUserSessions(this.props.loggedInUser);
    console.log("userSessions: "+JSON.stringify(userSessions));

    let responseForGoalAndCommitment = await this.getResponseForGoalAndCommitment(this.props.loggedInUser);
    let commitment = responseForGoalAndCommitment.data.commitment;

    console.log("comm: "+JSON.stringify(commitment));
    this.successfulWeeks = this.successfulWeekStreak(userSessions, commitment);
  }

//   commitment: {
//     minutesPerDay:10,
//     daysPerWeek:5
// }

  async getResponseForGoalAndCommitment(username) {
    api = new ApiService(); // TODO: inject this dependency, or better yet, make a class property injected into constructor
    try {
      let response = await api.GetUserGoalAndCommitmentFakeSuccess200(username);
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

  // TODO: have this called only once for when the user logs in, not on every component mount
  async getUserSessions(username) {
    let api = new ApiService(); // TODO: inject this dependency, or better yet, make a class property injected into constructor
    try {
      // let response = await api.GetUserSessions(username);
      let response = await api.GetUserSessionsFakeSuccessWithSessions(username);
      
      if (response.status === 200) {
        return response.data.sessions;
      } else {
        return null;
      }
    } catch(error) {
      return null;
    }
  }

  // see if commitment has been met for the specific weeks leading up to the current one
  successfulWeekStreak(userSessions, commitment) {
    // have method taking in a particular week returning true or false for met
    // find number of day periods fulfilling commitment minute total (combining multiple sessions possibly). Return true once this equals commitment days
    
    // last week, if met, keep checking...
    // 2nd to last, if met, keep checking...
    // 3rd to last, if met, keep checking...
    // ...

  }

  render() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Text>Hello {this.props.loggedInUser}, Streak of successful weeks: {this.successfulWeeks}</Text>
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Logout" onPress={this.props.logoutUser} />
        </View>
      </View>
    )
  }
}