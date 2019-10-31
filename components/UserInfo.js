import React from 'react';
import { Button, Text, View } from 'react-native';
import ApiService from './../services/ApiService';

export default class UserInfo extends React.Component {
  constructor(props) {
    super();
    this.state = {
      successfulWeeks: 0
    };
    this.apiService = new ApiService();
  }

  componentDidMount = async () => {
    let userSessions = await this.getUserSessions(this.props.loggedInUser);

    let responseForGoalAndCommitment = await this.getResponseForGoalAndCommitment(this.props.loggedInUser);
    let commitment = responseForGoalAndCommitment.data.commitment;
    let now = new Date(Date.now());

     let successfulWeekStreak = this.successfulWeekStreakUntilGivenTime(userSessions, commitment, now);
     this.setState({ successfulWeeks: successfulWeekStreak});
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

  // TODO: have this called only once for when the user logs in, not on every component mount
  async getUserSessions(username) {
    try {
      // let response = await this.apiService.GetUserSessions(username);
      let response = await this.apiService.GetUserSessionsFakeSuccessWithSessions(username);
      
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
    let weekEnd = this.getPreviousSundayAtMidnight(givenTime);
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
  getPreviousSundayAtMidnight(date) {
    let dateObj = new Date(date);
    dateObj.setHours(0,0,0,0);
    dateObj.setDate(dateObj.getDate() - dateObj.getDay());
    return new Date(dateObj);
  }

  // returns date with exactly weeks number of weeks subtracted
  getWeeksSubtracted(date, weeks) {
    let weekInMs = 7*24*60*60*1000;
    let dateEpoch = date.getTime();
    let resultDateEpoch = dateEpoch - weeks*weekInMs;
    return new Date(resultDateEpoch);
  }

  weekWasSuccessful(userSessions, weekStart, weekEnd, commitment) {
    let successfulDaysInWeek = this.successfulDaysWithinPeriod(userSessions, weekStart, weekEnd, commitment.minutesPerDay);
    return successfulDaysInWeek >= commitment.daysPerWeek;
  }

  // periodStart, periodEnd are in terms of UTC
  successfulDaysWithinPeriod(userSessions, periodStart, periodEnd, minutesPerDay) {
    let successfulDays = 0;
    let dayInMs = 24*60*60*1000;
    let periodStartMs = Date.parse(periodStart);
    let periodEndMs = Date.parse(periodEnd);

    let dayStartMs = periodStartMs;
    let dayEndMs = periodStartMs + dayInMs;

    while (dayEndMs <= periodEndMs) {
      let sessionsStartingToday = this.sessionsStartingWithinPeriod(userSessions, dayStartMs, dayEndMs);
      let sumSessionLengths = this.sumSessionLengths(sessionsStartingToday);

      if (sumSessionLengths >= minutesPerDay*60) {
        successfulDays++;
      }

      dayStartMs = dayEndMs;
      dayEndMs = dayEndMs + dayInMs;
    }
    // handle partial day remaining
    let sessionsStartingInTimeRemaining = this.sessionsStartingWithinPeriod(userSessions, dayStartMs, periodEndMs);
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

  // WE ASSUME SESSIONS ARE NOT SORTED BY START TIME.
  // We could optimize if they were possibly
  sessionsStartingWithinPeriod(userSessions, periodStartMs, periodEndMs) {
    let result = [];

    for (let i=0; i<userSessions.length; i++) {
      let currentSession = userSessions[i];
      let currentSessionStartMs = Date.parse(currentSession.sessionStartTime);
      
      if (currentSessionStartMs >= periodStartMs && currentSessionStartMs <= periodEndMs) {
        result.push(currentSession);
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