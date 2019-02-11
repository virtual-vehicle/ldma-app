import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Email } from 'react-native-openanything';
import { get as safeGet } from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { COLORS } from '../../constants/colors';
import { logout } from '../../actions/userActions';
import {
  GO_TO_MAIN,
  GO_TO_SAFE_DRIVING,
  GO_TO_MY_TRIPS,
  GO_TO_RANKINGS,
} from '../../actions/actionTypes';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
  logout: any,
  navigation: any,
};

export class Menu extends Component<Props> {
  onSupportClick = (emailTo) => {
    const { user } = this.props;
    const username = safeGet(user, 'username', '');
    const email = emailTo;
    const subject = 'LDMA: Feedback/Questions';
    const device = `${DeviceInfo.getBrand()} ${DeviceInfo.getModel()}`;
    const osVersion = `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`;
    const appVersion = DeviceInfo.getReadableVersion();
    const body = `Please explain your feedback or questions as detailed as you can, thank you!

    ----
    Device: ${device}
    OS version: ${osVersion}
    User: ${username}
    App version: ${appVersion}`;

    Email(email, subject, body).catch(err => console.error(err));
  }

  userLogout(e) {
    e.preventDefault();
    const { logout } = this.props;
    logout();
  }

  render() {
    const { navigation, user } = this.props;
    const username = safeGet(user, 'username', '');

    const appVersion = DeviceInfo.getReadableVersion();
    return (
      <ScrollView scrollsToTop={false} style={styles.container}>
        <View style={styles.versionNameSection}>
          <Text style={styles.versionText}>VERSION {appVersion}</Text>
          <Text style={styles.nameText}>{username}</Text>
        </View>
        <View style={styles.content}>
          <Text
            style={styles.item}
            onPress={() => navigation.dispatch({ type: GO_TO_MAIN })}
          >
            TripViz ->
          </Text>
          <View style={styles.lineSeparator} />
            <Text
              style={styles.item}
              onPress={() => navigation.dispatch({ type: GO_TO_SAFE_DRIVING })}
            >
              Safe Driving ->
            </Text>
          <View style={styles.lineSeparator} />
            <Text
              style={styles.item}
              onPress={() => navigation.dispatch({ type: GO_TO_MY_TRIPS })}
            >
              My Trips ->
            </Text>
          <View style={styles.lineSeparator} />
            <Text
              style={styles.item}
              onPress={() => navigation.dispatch({ type: GO_TO_RANKINGS })}
            >
              My Rankings ->
            </Text>
          <View style={styles.lineSeparator} />
          <Text
            onPress={(e) => this.userLogout(e)}
            style={styles.item}
          >
            Log Out
          </Text>
          <View style={styles.lineSeparator} />
          <View>
            <Text style={styles.headlineText}>Customer support</Text>
            <TouchableOpacity
              onPress={() => this.onSupportClick('alexander.stocker@v2c2.at')}
            >
              <Text style={styles.emailText}>alexander.stocker@v2c2.at</Text>
            </TouchableOpacity>
            <Text style={[styles.headlineText, { marginTop: 20 }]}>Tech support</Text>
            <TouchableOpacity
              onPress={() => this.onSupportClick('nik.adzic@v2c2.at')}
            >
              <Text style={styles.emailText}>nik.adzic@v2c2.at</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH + 1,
    height: WINDOW_HEIGHT,
    backgroundColor: COLORS.LIGHTGREY4,
    borderRightWidth: 1,
    borderRightColor: COLORS.RED,
    borderStyle: 'solid',
  },
  versionNameSection: {
    backgroundColor: COLORS.LIGHTGREY,
    flex: 1,
    justifyContent: 'flex-end',
    width: '80%',
    height: 90,
    paddingLeft: 18,
    paddingBottom: 14,
  },
  nameText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
  versionText: {
    color: COLORS.WHITE,
    fontSize: 13,
  },
  item: {
    fontSize: 18,
  },
  content: {
    paddingLeft: 18,
    paddingRight: (WINDOW_WIDTH * 0.33) + 18,
    paddingTop: 36,
  },
  lineSeparator: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    marginTop: 19.5,
    marginBottom: 20,
  },
  headlineText: {
    color: COLORS.GREY2,
    fontSize: 14,
  },
  emailText: {
    color: COLORS.LIGHTGREY,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) =>
  ({
    user: state.auth.user,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    logout,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
