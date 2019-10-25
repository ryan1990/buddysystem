import React from 'react';
import { Button, Text, View } from 'react-native';
import ApiService from './../tests/ApiService';

export default class UserInfo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      successfulWeeks: 0
    };
  }

  componentDidMount = async () => {
    let userSessions = await this.getUserSessions(this.props.loggedInUser);
    console.log("userSessions: "+JSON.stringify(userSessions));

    let responseForGoalAndCommitment = await this.getResponseForGoalAndCommitment(this.props.loggedInUser);
    let commitment = responseForGoalAndCommitment.data.commitment;
    let now = new Date(Date.now());

    console.log("comm: "+JSON.stringify(commitment));
     let successfulWeekStreak = this.successfulWeekStreakUntilGivenTime(userSessions, commitment, now);
     this.setState({ successfulWeeks: successfulWeekStreak});
  }

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

  removeDateEscapeCharacters(dateInput) {
    return dateInput.substring(1, dateInput.length-1);
  }

  // see if commitment has been met for the specific weeks leading up to the givenTime
  // this considers weeks leading up to and including the previous entire week (most recent sunday through saturday)
  successfulWeekStreakUntilGivenTime(userSessions, commitment, givenTime) {
    let count = 0;
    
    let dateTimeOffsetMinutes = 0; // TODO: remove
    let weekEnd = this.getPreviousSundayAtMidnight(givenTime, dateTimeOffsetMinutes);
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
  }

  // represents start of the week from user's local timezone perspective
  // should return a Date with epoch in UTC perspective of user's local last Sunday at midnight
  // this not unit testable for running in any timezone!
  getPreviousSundayAtMidnight(date, dateTimeOffsetMinutes) {
    let dateObj = new Date(date);
    dateObj.setHours(0,0,0,0);
    dateObj.setDate(dateObj.getDate() - dateObj.getDay());
    return new Date(dateObj - (-1)*dateTimeOffsetMinutes*60000); // - (-1) is a hack to achieve math +, which gets interpreted as append
  }

  // returns date with exactly weeks number of weeks subtracted
  getWeeksSubtracted(date, weeks) {
    let weekInMs = 7*24*60*60*1000;
    let dateEpoch = date.getTime();
    let resultDateEpoch = dateEpoch - weeks*weekInMs;
    return new Date(resultDateEpoch);
  }

  // good place to mock for unit test!
  weekWasSuccessful(userSessions, weekStart, weekEnd, commitment) {
    let dateTimeOffsetMinutes = 0; // TODO: should remove everywhere eventually
    let successfulDaysInWeek = this.successfulDaysWithinPeriod(userSessions, weekStart, weekEnd, commitment.minutesPerDay, dateTimeOffsetMinutes);
    return successfulDaysInWeek >= commitment.daysPerWeek;
  }

  // periodStart, periodEnd are in terms of UTC
  // TODO: remove dateTimeOffsetMinutes from this and other methods?
  successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay, dateTimeOffsetMinutes) {
    let successfulDays = 0;
    let dayInMs = 24*60*60*1000;
    let periodStartMs = Date.parse(periodStart);
    let periodEndMs = Date.parse(periodEnd);

    let dayStartMs = periodStartMs;
    let dayEndMs = periodStartMs + dayInMs;

    while (dayEndMs <= periodEndMs) {
      let sessionsStartingToday = this.sessionsStartingWithinPeriod(userSessions, dayStartMs, dayEndMs, dateTimeOffsetMinutes);
      let sumSessionLengths = this.sumSessionLengths(sessionsStartingToday);

      if (sumSessionLengths >= minutesPerDay*60) {
        successfulDays++;
      }

      dayStartMs = dayEndMs;
      dayEndMs = dayEndMs + dayInMs;
    }
    // handle partial day remaining
    let sessionsStartingInTimeRemaining = this.sessionsStartingWithinPeriod(userSessions, dayStartMs, periodEndMs, dateTimeOffsetMinutes);
    let sumSessionLengthsOfRemaining = this.sumSessionLengths(sessionsStartingInTimeRemaining);

    if (sumSessionLengthsOfRemaining >= minutesPerDay*60) {
      successfulDays++;
    }

    return successfulDays; 
  }

  sumSessionLengths(sessions) {
    let result = 0;
    for (let i=0; i<sessions.length; i++) {
      let sessionLength = parseInt(sessions[i].sessionLengthInSeconds, 10);
      result += sessionLength;
    }

    return result;
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

  render() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <Text>Hello {this.props.loggedInUser}, Streak of successful weeks: {this.state.successfulWeeks}</Text>
        </View>
        <View style={{ margin: 10 }}>
          <Button title="Logout" onPress={this.props.logoutUser} />
        </View>
      </View>
    )
  }
}