import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { get as safeGet, sortBy } from 'lodash';
import SideMenu from 'react-native-side-menu';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';
import { Circle, G, Line } from 'react-native-svg';
import { COLORS } from 'ldmaapp/src/constants/colors';
import { getTripsAll } from 'ldmaapp/src/actions/tripActions';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import { getTripsInfo } from 'ldmaapp/src/actions/tripsInfoActions';
import { getGraphTripscore } from 'ldmaapp/src/actions/graphTripscoreActions';
// import NavigationService from 'ldmaapp/src/utils/navigation';
import { getRiskScoreColor } from 'ldmaapp/src/utils/format';
import NavigationService from 'ldmaapp/src/utils/navigation';
/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const BUTTON_HEIGHT = 50;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  dispatch: any,
  login: any,
  loading: boolean,
  tripsInfo: Array,
  graphTripscoreList: Array,
};

export class HomeScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const { getTripsInfo, getGraphTripscore, user, getTripsAll } = this.props;
    const auth_token = safeGet(user, 'auth_token', '');
    getTripsInfo(auth_token);
    getGraphTripscore(auth_token);
    getTripsAll(user);
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

  goToTripDetails = (idx) => {
    const { tripsList, graphTripscoreList } = this.props;
    const filterTripIds = graphTripscoreList.map(({trip_id}) => trip_id)
    const filteredList = sortBy(tripsList.filter(({trip_id}) => filterTripIds.includes(trip_id)), 'start_at')
    NavigationService.navigate('TripDetails', { trip: filteredList[idx] })
  }

  render() {
    const { isOpen } = this.state;

    const { loading, tripsInfo } = this.props;
    const graphTripscoreList = safeGet(this.props, 'graphTripscoreList', []);
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    let data = [];
    if (graphTripscoreList) {
      data = graphTripscoreList.map(scoreObj => scoreObj.risk_score);
    }

    const numTrips = safeGet(tripsInfo, 'tripsList[0].value', '');
    const numEvents = safeGet(tripsInfo, 'tripsList[1].value', '');
    const distance = safeGet(tripsInfo, 'tripsList[2].value', '');
    const driverScore = safeGet(tripsInfo, 'tripsList[7].value', '');
    const numAccelerations = safeGet(tripsInfo, 'tripsList[4].value', '');
    const numBrakes = safeGet(tripsInfo, 'tripsList[5].value', '');
    const numStandStills = safeGet(tripsInfo, 'tripsList[6].value', '');

    const contentInset = { top: 20, bottom: 20 };

    let startDate = '';
    if (graphTripscoreList) {
      startDate = safeGet(graphTripscoreList[0], 'start_at', '').slice(0, 10);
    }

    let endDate = '';
    if (graphTripscoreList) {
      const index = graphTripscoreList.length -1;
      endDate = safeGet(graphTripscoreList[index], 'start_at', '').slice(0, 10);
    }

    const HorizontalLine = (({ y }) => (
      <Line
          key={ 'zero-axis' }
          x1={ '0%' }
          x2={ '100%' }
          y1={ y(50) }
          y2={ y(50) }
          stroke={ 'grey' }
          strokeDasharray={ [ 4, 8 ] }
          strokeWidth={ 2 }
      />
    ))

    const Tooltip = ({ x, y }) => (
      <G>
      {data.map((value, index) => {
        return (
          <G
            x={ x(index) - (75 / 2) }
            key={index}
          >
            <G x={ 75 / 2 }
              onPress={() => this.goToTripDetails(index)}
            >
              <Circle
                cy={ y(data[ index ]) }
                r={ 6 }
                stroke={ 'rgb(134, 65, 244)' }
                strokeWidth={ 1 }
                fill={ 'rgb(134, 65, 244)' }
              />
            </G>
          </G>
        )
      })}
      </G>
    )



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
        <ScrollView contentContainerStyle={{ alignItems: 'center', width: SCREEN_WIDTH }}>
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
            <Text style={styles.headerText}>Home</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }}>
              <AnimatedCircularProgress
                size={67}
                width={3}
                fill={Number(driverScore)}
                tintColor={getRiskScoreColor(Number(driverScore))}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="transparent">
              {
                (fill) => (
                  <View>
                    <Text style={{ color: COLORS.WHITE }}>
                    {`${fill}%`}
                    </Text>
                    <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE, textAlign: 'center' }}>
                      Score
                    </Text>
                  </View>
                )
              }
              </AnimatedCircularProgress>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-evenly', width: SCREEN_WIDTH,  marginLeft: 20, marginRight: 20 }}>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/completed.png')}/>
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Trips</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numTrips}</Text>
            </View>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/snoozed.png')}/>
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Distance (km)</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{distance}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-evenly', width: SCREEN_WIDTH,  marginLeft: 20, marginRight: 20 }}>
            <View style={styles.content}>
              <Image source={require('ldmaapp/assets/png/overdue.png')}/>
              <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Events</Text>
              <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numEvents}</Text>
            </View>
          </View>

          <Image
            source={require('ldmaapp/assets/png/line.png')}
            style={styles.lineImage}
          />

          <View style={{ flexDirection: 'row', paddingTop: 5, justifyContent: 'space-evenly', width: SCREEN_WIDTH,  marginLeft: 20, marginRight: 20 }}>
          <View style={styles.content}>
          <Image source={require('ldmaapp/assets/png/completed.png')} />
          <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Accelerations</Text>
          <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numAccelerations}</Text>
        </View>
        <View style={styles.content}>
          <Image source={require('ldmaapp/assets/png/overdue.png')} />
          <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Brakes</Text>
          <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numBrakes}</Text>
        </View>
        <View style={styles.content}>
          <Image source={require('ldmaapp/assets/png/snoozed.png')} />
          <Text style={{ fontSize: 11, lineHeight: 11, letterSpacing: 1.0, color: COLORS.WHITE }}>Stand stills</Text>
          <Text style={{ fontSize: 20, lineHeight: 20, letterSpacing: 1.0, color: COLORS.WHITE }}>{numStandStills}</Text>
        </View>
          </View>
          <Text style={{ color: COLORS.WHITE, marginTop: 20 }}>Last 20 trip scores</Text>
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
                svg={{ stroke: COLORS.WHITE }}
                contentInset={ contentInset }
              >
                <Grid />
                <HorizontalLine />
                <Tooltip />
              </LineChart>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingLeft: 5, paddingRight: 5 }}>
            <Text style={{ color:  COLORS.WHITE, fontSize: 10 }}>{startDate}</Text>
            <Text style={{ color:  COLORS.WHITE, fontSize: 10 }}>{endDate}</Text>
          </View>
          {loading && <Loader />}
          </ScrollView>
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
    display: 'flex',
    flex: 1,
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
  lineImage: {
    width: '100%',
    zIndex: 200,
    height: 1,
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
});

const mapStateToProps = (state) =>
  ({
    loading: state.loading,
    user: state.auth.user,
    tripsInfo: state.tripsInfo,
    graphTripscoreList: state.graphTripscore.tripscoreList,
    tripsList: state.trip.tripsList,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getTripsInfo,
    getGraphTripscore,
    getTripsAll,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
