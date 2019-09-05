import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { COLORS } from 'ldmaapp/src/constants/colors';

type Props = {
  label: String,
  value: String
};

class TextContainer extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, value } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.textItem}>{label}</Text>
        <Text style={styles.textItem}>{value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textItem: {
    textAlign: 'center',
    color: COLORS.WHITE,
  },
});

export default TextContainer;