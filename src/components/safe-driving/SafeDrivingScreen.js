import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get as safeGet } from 'lodash';
import SideMenu from 'react-native-side-menu';
import PercentageCircle from 'react-native-percentage-circle';
import { COLORS } from 'ldmaapp/src/constants/colors';
import {
} from 'ldmaapp/src/actions/uiActions';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import NavigationService from 'ldmaapp/src/utils/navigation';

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
        <View style={styles.container}>
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
            <View style={styles.content}>
              <View style={styles.percent}>
                <PercentageCircle
                  radius={67}
                  percent={driverScore}
                  color={COLORS.GREEN4}
                  borderWidth={10}
                  textStyle={{ fontSize: 30 }}>
                </PercentageCircle>
                <Text style={{ paddingTop: 10 }}>Driving Score (total)</Text>
              </View>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.cube}>{`${numTrips}\ntrips`}</Text>
                  <Text style={styles.cube}>{`${distance}\nkm`}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                  <Text style={styles.cube}>{`${numEvents}\nevents`}</Text>
                  <Text style={styles.cube}>{`${totalTime}\nmin`}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                  <Text style={styles.cube}>{`${numAccelerations}\naccelerations`}</Text>
                  <Text style={styles.cube}>{`${numBrakes}\nbrakes`}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                  <Text style={styles.cube}>{`${numStandStills}\n stand stills`}</Text>
                </View>
              </View>
            </View>
              <TouchableOpacity
                style={styles.goToNextScreen}
                onPress={() => NavigationService.navigate('MyTrips')}
              >
                <Text style={styles.goToNextScreenText}>{`My Trips`}</Text>
              </TouchableOpacity>
              {loading && <Loader />}
        </View>
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
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  cube: {
    borderColor: COLORS.GREEN4,
    borderWidth: 3,
    fontSize: 16,
    padding: 2,
    paddingTop: 5,
    width: 90,
    textAlign: 'center',
    marginLeft: 10,
  },
  percent: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
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
    backgroundColor: COLORS.BLUE,
  },
  headerText: {
    color: COLORS.WHITE,
    fontSize: 20,
  },
  goToNextScreen: {
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLUE,
    width: FIELDS_WIDTH,
    borderRadius: 5,
    height: BUTTON_HEIGHT,
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
