// React Native Mobile time tracker app used to capture music practice sessions.
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

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
    let minutes = parseInt((ms/(1000*60))%60)
    let seconds = parseInt((ms/1000)%60)
    return minutes + ":" + seconds;
  }

  // SEE IF WE NEED
  static navigationOptions = {
    // headerTitle instead of title
    title: 'Stopwatch Title',
  };

  render() {
    const { status, runningTime } = this.state;
    return (
      <View>
        {/* SEE IF NEED */}
        <Button
          title="Go to Login"
          onPress={() => {
            /* 1. Navigate to the Login route with params */
            this.props.navigation.navigate('Login', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
        
        <Text style={styles.titleText}>Time Practiced</Text>
        <Text style={styles.titleText}>MM:SS</Text>    
        <Text style={styles.countNumbers}>{this.convertMsToMinutes(runningTime)}</Text>
        
        <Text />
        <Button onPress={this.handleStartPause} title={status === 'unstarted' ? 'Start New Practice Session' : status === 'running' ? 'Pause Practice Session' : 'Resume Practice Session'} />
        <Text />
        <Text />
        <Text />
        <Button onPress={this.handleComplete} disabled={status === 'unstarted'} title="Complete Practice Session" />
      </View>
    );
  }
}

// STYLES:
const styles = StyleSheet.create({
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
