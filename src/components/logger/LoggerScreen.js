import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

class LoggerScreen extends Component {


  render() {
    return (
      <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('ldmaapp/assets/png/bg.png')}
          >
            <Text>Logger Screen</Text>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
});

export default LoggerScreen;

