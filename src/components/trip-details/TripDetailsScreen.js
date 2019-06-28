import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  white: boolean,
};

class TripDetailsScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Trip Details Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TripDetailsScreen;
