// React Native Mobile time tracker app used to capture music practice sessions.
import React from 'react';
import { Alert, Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import UserInfo from './UserInfo';
import ApiService from './../tests/ApiService';

// Stopwatch page should show username they are logged in as.

// Time tracker component
export default class StopwatchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "unstarted", // can be "unstarted", "running", or "paused"
      completeButtonDisabled: true,
      sessionStartTime: null,
      runningTime: 0
    };
    this.apiService = new ApiService();
  }

  handleStartPause = () => {
    // Sets state directly from click of the Start/Pause button 
    if (this.state.status == "running") {
      clearInterval(this.timer);
      this.setState({status: "paused"});
    } else if (this.state.status == "unstarted") {
      const startTime = Date.now() - this.state.runningTime;
      this.timer = setInterval(() => {
        this.setState({ runningTime: Date.now() - startTime });
      }, 1000);
      this.setState({status: "running"});
      this.setStartTimeToNow();
    } else { //this.state.status == "paused"
      const startTime = Date.now() - this.state.runningTime;
      this.timer = setInterval(() => {
        this.setState({ runningTime: Date.now() - startTime });
      }, 1000);
      this.setState({status: "running"});
    }
  };

  setStartTimeToNow() {
    let now = new Date(Date.now());
    let nowJSON = now.toJSON();
    this.setState({sessionStartTime: nowJSON});
  }

  handleComplete = async () => {
    let username = this.props.loggedInUser;
    let sessionStartTime = this.state.sessionStartTime;
    let sessionLengthInSeconds = this.convertMsToSeconds(this.state.runningTime);

    let successfulSessionWrite = await this.writeSessionToBackend(username, sessionStartTime, sessionLengthInSeconds);

    if (successfulSessionWrite) {
        this.setStartTimeToNow();
        clearInterval(this.timer);
        this.setState({ runningTime: 0, status: false });
        this.setState({ status: "unstarted"});
        Alert.alert(null, "Good job! Your practice session has been submitted!"); // TODO: inject this dependency, or better yet, make a class property injected into constructor
    } else {
      Alert.alert(null, "Could not submit your time. Error reaching server, check your internet connection and try again."); // TODO: inject this dependency, or better yet, make a class property injected into constructor
    }
  };

  async writeSessionToBackend(username, sessionStartTime, sessionLengthInSeconds) {
    try {
      let response = await this.apiService.SubmitPracticeSessionFakeSuccess201();
      if (response === null) {
        return null;
      }
      if (response.status === 201) {
        return true;
      } else {
        return null;
      }
    } catch(error) {
      return null;
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  convertMsToSeconds(ms) {
    return Math.floor(ms/1000);
  }

  // given ms: "64333", convert to Minutes:Seconds: "64:33"
  convertMsToMinutes(ms) {
    let minutes = parseInt((ms/(1000*60))%60);
    let seconds = parseInt((ms/1000)%60);

    let minutesString = minutes.toString();
    let secondsString = seconds.toString();

    if (minutesString.length === 1) {
      minutesString = "0"+minutesString;
    }
    
    if (secondsString.length === 1) {
      secondsString = "0"+secondsString;
    }

    return minutesString + ":" + secondsString;
  }

  render() {
    const { status, runningTime } = this.state;
    return (
      <View>
        <UserInfo loggedInUser={this.props.loggedInUser} logoutUser={this.props.logoutUser} />
        <View style={{ margin: 10 }}>
          <Button title="View/Update Account Info" onPress={this.props.goToUpdateUserScreen} />
        </View>

        <Text style={styles.titleText}>Time Practiced</Text>
        <Text style={styles.countNumbers}>{this.convertMsToMinutes(runningTime)}</Text>
        
        <View style={{flexDirection: "column" }}>
          <View style={{ margin: 10 }}>
            <TouchableHighlight style={styles.button} onPress={this.handleStartPause}>
              <Text style={{ fontSize:25, fontWeight:"bold", paddingVertical:50 }}>{status === 'unstarted' ? 'Start Practice Session' : status === 'running' ? 'Pause Practice Session' : 'Resume Practice Session'}</Text>
            </TouchableHighlight>
            {/* <Button onPress={this.handleStartPause} title={status === 'unstarted' ? 'Start Practice Session' : status === 'running' ? 'Pause Practice Session' : 'Resume Practice Session'} /> */}
          </View>
          <View style={{ margin: 10 }}>
            <Button title="Complete Practice Session" onPress={this.handleComplete} disabled={status === 'unstarted'} />
          </View>
        </View>
      </View>
    );
  }
}

// STYLES:
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#00DD00',
    padding: 10,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  countNumbers: {
    fontSize: 100,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});


