import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Pulse } from 'react-native-loader';
import { COLORS } from 'ldmaapp/src/constants/colors';

type Props = {
  white: boolean,
};

class Loader extends Component<Props> {
  render() {
    const { white } = this.props;
    return (
      <View style={styles.loading}>
        <Pulse
          size={10}
          color={white ? COLORS.WHITE : COLORS.BLACK}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Loader;

