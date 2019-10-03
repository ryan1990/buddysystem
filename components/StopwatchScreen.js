// React Native Mobile time tracker app used to capture music practice sessions.
import React from 'react';
import { Button, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import UserInfo from './UserInfo';

// Stopwatch page should show email they are logged in as.

// Time tracker component
export default class StopwatchScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      status: "unstarted", // can be "unstarted", "running", or "paused"
      completeButtonDisabled: true,
      runningTime: 0
    };
  }

  handleStartPause = () => {
    // Sets state directly from click of the Start/Pause button 
    if (this.state.status == "running") {
      clearInterval(this.timer);
      this.setState({status: "paused"});
    } else {
      const startTime = Date.now() - this.state.runningTime;
      this.timer = setInterval(() => {
        this.setState({ runningTime: Date.now() - startTime });
      }, 1000);
      this.setState({status: "running"});
    }
  };

  handleComplete = () => {
    clearInterval(this.timer);
    this.setState({ runningTime: 0, status: false });
    this.setState({ status: "unstarted"});
  };

  componentWillUnmount() {
    clearInterval(this.timer);
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
        <UserInfo loggedInUser={this.props.loggedInUser} goToLoginScreen={this.props.goToLoginScreen} />

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
            <Button onPress={this.handleComplete} disabled={status === 'unstarted'} title="Complete Practice Session" />
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


