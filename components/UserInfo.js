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

    // console.log("this.successfulWeeks: "+JSON.stringify(this.successfulWeeks));
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

  // accepts ISO 8601 and returns JS Date object. ISO 8601 Example: "2019-10-22T23:31:33.198Z"
  dateConvertFromUtcToLocal(utcDate, dateTimeOffsetMinutes) {
    let utcDateMs = Date.parse(utcDate);
    return new Date(utcDateMs + dateTimeOffsetMinutes*60000);
  }

  // accepts JS Date object and returns ISO 8601. ISO 8601 Example: "2019-10-22T23:31:33.198Z"
  dateConvertFromLocalToUtc(localDate, dateTimeOffsetMinutes) {
    return this.removeDateEscapeCharacters(JSON.stringify(new Date(localDate.getTime() - dateTimeOffsetMinutes*60000)));
  }

  removeDateEscapeCharacters(dateInput) {
    return dateInput.substring(1, dateInput.length-1);
  }

  // see if commitment has been met for the specific weeks leading up to the current one
  successfulWeekStreak(userSessions, commitment) {
    // convert UTC stored time to user's time and judge that?

    // have method taking in a particular week returning true or false for met
    // find number of day periods fulfilling commitment minute total (combining multiple sessions possibly). Return true once this equals commitment days
    let count = 0;
    
    let weekEnd = this.getPreviousSundayAtMidnight(Date.now())
    let weekStart = this.getWeeksSubtracted(weekEnd, 1);

    let weekWasSuccessful = true;
    while (true) {

      weekWasSuccessful = this.weekWasSuccessful(userSessions, weekStart, weekEnd, commitment);

      if (!weekWasSuccessful) {
        return count;
      }

      count++;
      weekEnd = weekStart;
      weekStart = this.getWeeksSubtracted(weekStart, 1);
    }

    // last week, if met, keep checking...
    // 2nd to last, if met, keep checking...
    // 3rd to last, if met, keep checking...
    // ...

  }

  // represents start of the week
  getPreviousSundayAtMidnight(date, dateTimeOffsetMinutes) {
    //https://www.moesif.com/blog/technical/timestamp/manage-datetime-timestamp-timezones-in-api/#

    let dateObj = new Date(date);
    dateObj.setHours(0,0,0,0);
    dateObj.setDate(dateObj.getDate() - dateObj.getDay());
    return new Date(dateObj - (-1)*dateTimeOffsetMinutes*60000); // - (-1) is a hack to achieve math +, which gets interpreted as append
  }

  // returns date with exactly weeks number of weeks subtracted
  getWeeksSubtracted(date, weeks) {
  	let dateObj = new Date(date);
    dateObj.setDate(dateObj.getDate() - weeks*7);
    return dateObj;
  }

  weekWasSuccessful(userSessions, weekStart, weekEnd, commitment) {

    // return this.successfulDaysInWeek >= commDays
    return true; // temp:
  }

  // 1035
  successfulDaysInWeek(userSessions, weekStart, weekEnd, commitment) {
    let successfulDays = 0;
    // foreach day:
    for (let i=0; i<7; i++) {
      // find sessions starting on day
      let weekStartMs = Date.parse(weekStart);
      let weekEndMs = Date.parse(weekEnd);
      let dayInMs = 24*60*60*1000;

      let dayStartMs = weekStartMs + i*dayInMs;
      let dayEndMs = weekStartMs + (i+1)*dayInMs;

      // let sessionsStartingToday = 

      // sum sessionLengthInSeconds for sessionsStartingToday

      // if sum >= commMin, successfulDays++

    }
      
      
    return successfulDays;
    
  }

  //
  //
  // WE ASSUME SESSIONS ARE NOT SORTED BY START TIME.
  // We could optimize if they were possibly
  //
  //
  sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs, dateTimeOffsetMinutes) {
    let result = [];

    for (let i=0; i<userSessions.length; i++) {
      let currentSession = userSessions[i];

      // user sessions are stored in UTC time in backend, so convert to local!
      let currentSessionStartMsUtc = Date.parse(currentSession.sessionStartTime);
      let currentSessionStartMsLocal = currentSessionStartMsUtc + dateTimeOffsetMinutes*60000;
      if (currentSessionStartMsLocal >= periodStartMs && currentSessionStartMsLocal <= periodEndMs) {
        result.push(currentSession); // this will still contain utc time
      }
    }

    return result;
  }

  // https://www.youtube.com/watch?v=Omppm_YUG2g
  // https://www.youtube.com/watch?v=YxcIj_SLflw
  // https://www.youtube.com/watch?v=bz4jTx4v-l8

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