import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import email from 'react-native-email';
import { get as safeGet } from 'lodash';
import DeviceInfo from 'react-native-device-info';
import { COLORS } from 'ldmaapp/src/constants/colors';
import { logout } from 'ldmaapp/src/actions/userActions';
import { selectNavigationItem } from 'ldmaapp/src/actions/navigationActions';
import NavigationService from 'ldmaapp/src/utils/navigation';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

type Props = {
  logout: any,
  selectNavigationItem: any,
  navigation: any,
  selected_navigation_item: String,
};

export class Menu extends Component<Props> {
  onSupportClick = (emailTo) => {
    const { user } = this.props;
    const username = safeGet(user, 'username', '');
    const to = emailTo;
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

    // it does not work in emulator/simulator, because apple does not allow it.
    email(to, {
      // Optional additional arguments
      subject: subject,
      body: body,
    }).catch(console.error)
  }

  userLogout(e) {
    e.preventDefault();
    const { logout, selectNavigationItem } = this.props;
    selectNavigationItem('Home');
    logout();
  }

  navigate(navItem) {
    const { selectNavigationItem } = this.props;
    selectNavigationItem(navItem);
    NavigationService.navigate(navItem);
  }

  render() {
    const { user, selected_navigation_item } = this.props;
    const username = safeGet(user, 'username', '');

    const appVersion = DeviceInfo.getReadableVersion();
    return (
      <ScrollView scrollsToTop={false} style={styles.container}>
        <View style={styles.userSection}>
          <Image style={styles.userImage} source={require('ldmaapp/assets/png/userpic.png')} />
          <View>
            <Text style={styles.nameText}>{username}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.lineSeparator} />
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={require('ldmaapp/assets/png/home.png')} />
            <Text
              style={selected_navigation_item === 'Home' ? styles.itemTextSelected : styles.itemText}
              onPress={() => this.navigate('Home')}
            >
              Home
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={require('ldmaapp/assets/png/trips.png')} />
            <Text
              style={selected_navigation_item === 'MyTrips' ? styles.itemTextSelected : styles.itemText}
              onPress={() => this.navigate('MyTrips')}
            >
              My Trips
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={require('ldmaapp/assets/png/ranking.png')} />
            <Text
              style={selected_navigation_item === 'Rankings' ? styles.itemTextSelected : styles.itemText}
              onPress={() => this.navigate('Rankings')}
            >
              Rankings
            </Text>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={require('ldmaapp/assets/png/logout.png')} />
            <Text
              onPress={(e) => this.userLogout(e)}
              style={styles.itemText}
            >
              Logout
          </Text>
          </View>
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
            <Text style={[styles.headlineText, { marginTop: 20 }]}>Version {appVersion}</Text>
          </View>
        </View>

      </ScrollView >
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
  userSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
    height: 100,
    paddingTop: 25,
    paddingLeft: 25,
    paddingBottom: 25,
    paddingRight: (WINDOW_WIDTH * 0.33) + 25,
  },
  userImage: {
    height: 50,
    width: 50,
    resizeMode: "contain",
    borderRadius: 50,
    marginRight: 25,
  },
  nameText: {
    color: COLORS.GREY2,
    fontSize: 18,
  },
  content: {
    paddingLeft: 25,
    paddingRight: (WINDOW_WIDTH * 0.33) + 25,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 31.5,
  },
  itemImage: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  itemText: {
    fontSize: 18,
    marginLeft: 25,
  },
  itemTextSelected: {
    color: COLORS.RED,
    fontSize: 18,
    marginLeft: 25,
  },
  lineSeparator: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    marginBottom: 31.5,
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
    selected_navigation_item: state.navigation.selected_navigation_item,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    logout,
    selectNavigationItem,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
