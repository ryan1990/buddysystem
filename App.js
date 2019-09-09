// React Native Mobile time tracker app used to capture music practice sessions.
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Stopwatch from './components/Stopwatch';

export default function App() {
  return (
    <View style={styles.container}>  
      <Stopwatch />
    </View>
  );
}

// STYLES:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

