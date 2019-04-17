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
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { COLORS } from 'ldmaapp/src/constants/colors';
import {
} from 'ldmaapp/src/actions/uiActions';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import { getTripsInfo } from 'ldmaapp/src/actions/tripsInfoActions';
import { getGraphTripscore } from 'ldmaapp/src/actions/graphTripscoreActions';
import NavigationService from 'ldmaapp/src/utils/navigation';
import { convertMinutesToHoursMinutes } from 'ldmaapp/src/utils/format';
/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  dispatch: any,
  login: any,
  loading: boolean,
  tripsInfo: Array,
  graphTripscoreList: Array,
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
    const { getTripsInfo, getGraphTripscore, user } = this.props;
    const auth_token = safeGet(user, 'auth_token', '');
    getTripsInfo(auth_token);
    getGraphTripscore(auth_token);
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

    const { loading, tripsInfo, graphTripscoreList } = this.props;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    let data = [];
    if (graphTripscoreList) {
      data = graphTripscoreList.map(scoreObj => scoreObj.risk_score);
    }

    const numTrips = safeGet(tripsInfo, 'tripsList[0].value', '');
    const numEvents = safeGet(tripsInfo, 'tripsList[1].value', '');
    const distance = safeGet(tripsInfo, 'tripsList[2].value', '');
    const totalTime = safeGet(tripsInfo, 'tripsList[3].value', '');
    const driverScore = safeGet(tripsInfo, 'tripsList[7].value', '');

    const contentInset = { top: 20, bottom: 20 };

    let startDate = '';
    if (graphTripscoreList) {
      startDate = safeGet(graphTripscoreList[0], 'start_at', '');
    }

    let endDate = '';
    if (graphTripscoreList) {
      const index = graphTripscoreList.length -1;
      endDate = safeGet(graphTripscoreList[index], 'start_at', '');
    }

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
                <Text style={styles.cube}>{convertMinutesToHoursMinutes(totalTime)}</Text>
              </View>
            </View>
          </View>
          <Text style={{ marginTop: 20 }}>Last 20 trip scores</Text>
          <View style={{ flexDirection: 'row' }}>
            <YAxis
              data={data}
              contentInset={contentInset}
              svg={{
                fill: 'grey',
                fontSize: 10,
              }}
              numberOfTicks={ 10 }
              formatLabel={ value => value }
            />
            <View>
              <LineChart
                style={{ height: 250, width: SCREEN_WIDTH * .9 }}
                data={ data }
                svg={{ stroke: COLORS.GREEN4 }}
                contentInset={ contentInset }
              >
              <Grid />
              </LineChart>
              <XAxis
                style={{ marginHorizontal: -10 }}
                data={ data }
                formatLabel={ (value, index) => {
                  if (index === 0) {
                    return startDate;
                  }
                  else if (index === 19) {
                    return endDate;
                  }
                }}
                contentInset={{ left: 10, right: 10 }}
                svg={{ fontSize: 10, fill: 'black' }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.goToNextScreen}
            onPress={() => NavigationService.navigate('SafeDriving')}
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
    graphTripscoreList: state.graphTripscore.tripscoreList,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getTripsInfo,
    getGraphTripscore,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
