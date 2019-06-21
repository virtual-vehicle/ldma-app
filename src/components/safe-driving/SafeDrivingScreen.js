import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get as safeGet } from 'lodash';
import SideMenu from 'react-native-side-menu';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLORS } from 'ldmaapp/src/constants/colors';
import {
} from 'ldmaapp/src/actions/uiActions';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import NavigationService from 'ldmaapp/src/utils/navigation';
import { convertMinutesToHoursMinutes } from 'ldmaapp/src/utils/format';

/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  dispatch: any,
  navigation: any,
  login: any,
  loading: boolean,
};

export class SafeDrivingScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  onMenuItemSelected = () =>
    this.setState({
      isOpen: false,
    });

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    const { isOpen } = this.state;
    const { navigation, loading, tripsInfo } = this.props;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={navigation} />;

    const numTrips = safeGet(tripsInfo, 'tripsList[0].value', '“');
    const numEvents = safeGet(tripsInfo, 'tripsList[1].value', '');
    const distance = safeGet(tripsInfo, 'tripsList[2].value', '');
    const totalTime = safeGet(tripsInfo, 'tripsList[3].value', '');
    const numAccelerations = safeGet(tripsInfo, 'tripsList[4].value', '');
    const numBrakes = safeGet(tripsInfo, 'tripsList[5].value', '');
    const numStandStills = safeGet(tripsInfo, 'tripsList[6].value', '');
    const driverScore = safeGet(tripsInfo, 'tripsList[7].value', '');

    return (
      <SideMenu
        menu={menu}
        isOpen={isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <ImageBackground
          style={styles.container}
          source={require('ldmaapp/assets/png/bg.png')}
        >
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.menuButton}
          >
            <Image
              source={require('ldmaapp/assets/png/menu.png')}
              style={styles.menu}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerText}>Safe Driving</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }}>
            <AnimatedCircularProgress
              size={67}
              width={3}
              fill={Number(driverScore)}
              tintColor={COLORS.SEAFOAM_BLUE}
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="transparent">
              {
                (fill) => (
                  <View>
                    <Text style={{ color: COLORS.WHITE }}>
                      {`${fill}%`}
                    </Text>
                    <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>
                      Score
                    </Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-evenly', width: SCREEN_WIDTH, marginLeft: 20, marginRight: 20 }}>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/completed.png')} />
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Trips</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numTrips}</Text>
            </View>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/snoozed.png')} />
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Distance</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{distance}</Text>
            </View>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/overdue.png')} />
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Events</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numEvents}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 10, justifyContent: 'space-evenly', width: SCREEN_WIDTH, marginLeft: 20, marginRight: 20 }}>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/completed.png')} />
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Accelerations</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numAccelerations}</Text>
            </View>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/snoozed.png')} />
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Brakes</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numBrakes}</Text>
            </View>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/overdue.png')} />
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Stand stills</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numStandStills}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.goToNextScreen}
            onPress={() => NavigationService.navigate('MyTrips')}
          >
            <Text style={styles.goToNextScreenText}>{`My Trips`}</Text>
          </TouchableOpacity>
          {loading && <Loader />}
        </ImageBackground>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    display: 'flex',
    height: 100,
    paddingTop: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    left: 15,
    padding: 10,
    zIndex: 1000,
  },
  menu: {
    width: 30,
    height: 30,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
  },
  headerText: {
    color: COLORS.WHITE,
    fontSize: 20,
  },
  goToNextScreen: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 0.84 * SCREEN_WIDTH,
    borderRadius: 50,
    height: BUTTON_HEIGHT,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  goToNextScreenText: {
    color: COLORS.WHITE,
    fontSize: 20,
  },
});

const mapStateToProps = (state) =>
  ({
    loading: state.loading,
    tripsInfo: state.tripsInfo,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SafeDrivingScreen);
