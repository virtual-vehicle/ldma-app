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
import { LineChart, Grid } from 'react-native-svg-charts';
import { COLORS } from 'ldmaapp/src/constants/colors';
import { GO_TO_SAFE_DRIVING } from 'ldmaapp/src/actions/actionTypes';
import {
} from 'ldmaapp/src/actions/uiActions';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import { getTripsInfo } from 'ldmaapp/src/actions/tripsInfoActions';

/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  dispatch: any,
  navigation: any,
  login: any,
  loading: boolean,
  tripsInfo: Array,
};

export class MainScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const { getTripsInfo } = this.props;
    const auth_token = safeGet(this.props.user, 'auth_token', '');
    getTripsInfo(auth_token);
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
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

    const numTrips = safeGet(tripsInfo, 'tripsList[0].value', '');
    const numEvents = safeGet(tripsInfo, 'tripsList[1].value', '');
    const distance = safeGet(tripsInfo, 'tripsList[2].value', '');
    const totalTime = safeGet(tripsInfo, 'tripsList[3].value', '');
    const driverScore = safeGet(tripsInfo, 'tripsList[7].value', '');

    console.log("trips info:", tripsInfo);

    const contentInset = { top: 20, bottom: 20 };

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
            <Text style={styles.headerText}>TripViz</Text>
          </View>
          <View style={styles.content}>
            <View style={styles.percent}>
              <PercentageCircle
                radius={67}
                percent={driverScore}
                color={COLORS.GREEN4}
                borderWidth={10}
                textStyle={{ fontSize: 30 }}
              />
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
            </View>
          </View>
          <View>
            <LineChart
              style={{ height: 350, width: SCREEN_WIDTH * .9 }}
              data={ data }
              svg={{ stroke: COLORS.GREEN4 }}
              contentInset={ contentInset }
            >
              <Grid />
            </LineChart>
          </View>
          <TouchableOpacity
            style={styles.goToNextScreen}
            onPress={() => navigation.dispatch({ type: GO_TO_SAFE_DRIVING })}
          >
            <Text style={styles.goToNextScreenText}>{`Safe Driving`}</Text>
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
    user: state.auth.user,
    tripsInfo: state.tripsInfo,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getTripsInfo,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
