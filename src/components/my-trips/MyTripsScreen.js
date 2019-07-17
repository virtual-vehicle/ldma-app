import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import moment from 'moment';
import { get as safeGet } from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PercentageCircle from 'react-native-percentage-circle';
import { COLORS } from 'ldmaapp/src/constants/colors';
import {
} from 'ldmaapp/src/actions/uiActions';
import Svg, { Line } from 'react-native-svg';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import MapView, { Polyline } from 'react-native-maps';
import { getTripsAll, getTripsInterval, setMapVisible } from 'ldmaapp/src/actions/tripActions';
import NavigationService from 'ldmaapp/src/utils/navigation';
import { getTimeOutOfWholeDate, getDateOutOfWholeDate, formatCoordinates } from 'ldmaapp/src/utils/format';
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
};

export class TripListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map_visible: false,
    };
  }

  showMapPress() {
    this.setState(previousState => (
      { map_visible: !previousState.map_visible }
    ));
  }

  render() {
    const { trip, index } = this.props
    return (
      <View style={{ margin: 20, borderWidth: 1, borderColor: COLORS.BLUE, padding: 10, borderRadius: 10 }} key={trip.trip_id}>
        <Text style={{ color: COLORS.BLUE, textAlign: 'center', paddingBottom: 10 }}>Trip info</Text>
        <View style={{ flexDirection: 'row' }}>
          {/* FIRST COLUMN */}
          <View style={{ flexDirection: 'column', width: '33.3%' }}>
            <Text style={{ fontSize: 10, width: 100, textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE }}>{`${getDateOutOfWholeDate(trip.start_at)}\n${getTimeOutOfWholeDate(trip.start_at)}`}</Text>
            <View
              style={[
                { alignItems: 'center', justifyContent: 'center', height: 180 },
              ]}>
              <Svg
                height="180"
                width="2"
              >
                <Line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="180"
                  stroke={COLORS.BLUE}
                  strokeWidth="2"
                />
              </Svg>
            </View>
            <Text style={{ fontSize: 10, width: 100, textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE }}>{`${getDateOutOfWholeDate(trip.start_at)}\n${moment(getTimeOutOfWholeDate(trip.start_at), 'HH:mm:ss').add(trip.duration, 'seconds').format('HH:mm:ss')}`}</Text>
          </View>
          {/* SECOND COLUMN */}
          <View style={{ flexDirection: 'column', width: '33.3%' }}>
            <Text style={{ fontSize: 10, width: 100, textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE }}>{trip.start_position_name}</Text>
            {this.state.map_visible ?
              (<MapView
                liteMode={true}
                style={styles.map}
                region={{
                  latitude: trip.gps_track.coordinates[0].lat,
                  longitude: trip.gps_track.coordinates[0].lon,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
              >
                <Polyline
                  coordinates={formatCoordinates(trip.gps_track.coordinates)}
                  strokeColor="#0000ff" // fallback for when `strokeColors` is not supported by the map-provider
                  strokeWidth={6}
                />
              </MapView>
              )
              :
              (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.showMapButton}
                    onPress={() => this.showMapPress(index)}
                  >
                    <Text style={{ color: COLORS.WHITE }}>Show Map</Text>
                  </TouchableOpacity>
                </View>
              )
            }
            <Text style={{ fontSize: 10, width: 100, marginTop: 10, textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE, alignSelf: 'flex-end' }}>{trip.end_position_name}</Text>
          </View>
          {/* THIRD COLUMN */}
          <View style={{ flexDirection: 'column', width: '33.3%', alignItems: 'flex-end' }}>
            <PercentageCircle
              radius={30}
              percent={trip.risk_score}
              color={COLORS.GREEN4}
              borderWidth={2}
              textStyle={{ fontSize: 12 }}
            />
            <Text style={{ textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE, marginTop: 5, width: '80%' }}>{`${trip.brakes} Hard\nbrakes`}</Text>
            <Text style={{ textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE, marginTop: 5, width: '80%' }}>{`${trip.accelerations} Fast\naccel.`}</Text>
            <Text style={{ textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE, marginTop: 5, width: '80%' }}>{`${trip.standstills} Stand\nstills`}</Text>
            <Text style={{ textAlign: 'center', borderWidth: 1, borderColor: COLORS.BLUE, marginTop: 5, width: '80%' }}>{`Distance: \n${trip.distance} km`}</Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('TripDetails', {trip: trip})}
            >
              <Text>{`Trip Details`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export class MyTripsScreen extends Component<Props, State> {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      isDateTimePickerStartDateVisible: false,
      isDateTimePickerEndDateVisible: false,
      all: true,
      today: false,
      week: false,
      month: false,
      startDate: 'YYYY-MM-DD',
      endDate: 'YYYY-MM-DD',
    };
  }

  componentDidMount() {
    const { getTripsAll, user } = this.props;
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

  getTripsPress = () => {
    const { getTripsAll, getTripsInterval, user } = this.props;
    const { all, startDate, endDate } = this.state;
    if (all) {
      getTripsAll(user);
    }
    else {
      getTripsInterval(user, startDate, endDate);
    }
  }

  setAllDate() {
    const { all } = this.state;
    if (all) {
      this.setState({ startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' });
    }
  }

  setTodaysDate() {
    const todayDate = moment().format('YYYY-MM-DD');
    const { today } = this.state;
    if (today) {
      this.setState({ startDate: todayDate, endDate: todayDate });
    } else {
      this.setState({ startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' });
    }
  }

  setLastWeekDate() {
    const weekAgoDate = moment().subtract(7, 'd').format('YYYY-MM-DD');
    const todayDate = moment().format('YYYY-MM-DD');
    const { week } = this.state;
    if (week) {
      this.setState({ startDate: weekAgoDate, endDate: todayDate });
    } else {
      this.setState({ startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' });
    }
  }

  setLastMonthDate() {
    const monthAgoDate = moment().subtract(1, 'months').format('YYYY-MM-DD');
    const todayDate = moment().format('YYYY-MM-DD');
    const { month } = this.state;
    if (month) {
      this.setState({ startDate: monthAgoDate, endDate: todayDate });
    } else {
      this.setState({ startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' });
    }
  }

  // START/FROM Date methods
  showDateTimePickerStartDate = () => this.setState({ isDateTimePickerStartDateVisible: true });

  hideDateTimePickerStartDate = () => this.setState({ isDateTimePickerStartDateVisible: false });

  // END/TO Date methods
  showDateTimePickerEndDate = () => this.setState({ isDateTimePickerEndDateVisible: true });

  hideDateTimePickerEndDate = () => this.setState({ isDateTimePickerEndDateVisible: false });

  handleDatePickedStartDate = (date) => {
    const dateMoment = moment(date);
    const formattedDate = dateMoment.format('YYYY-MM-DD');
    this.setState({ ...this.state, all: false, today: false, week: false, month: false, startDate: formattedDate });
    this.hideDateTimePickerStartDate();
  };

  handleDatePickedEndDate = (date) => {
    const dateMoment = moment(date);
    const formattedDate = dateMoment.format('YYYY-MM-DD');
    this.setState({ ...this.state, all: false, today: false, week: false, month: false, endDate: formattedDate });
    this.hideDateTimePickerEndDate();
  };

  render() {
    const {
      isOpen,
      startDate,
      endDate,
      all,
      today,
      week,
      month,
    } = this.state;
    const { navigation, loading } = this.props;
    const tripsList = safeGet(this.props, 'tripsList', []);
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={navigation} />;

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
            <Text style={styles.headerText}>My Trips</Text>
          </View>
          <View style={styles.dateSelect}>
            <View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[styles.periodCubeSmall, all && { backgroundColor: COLORS.BLUE }]}
                  onPress={() => {
                    this.setState({ all: !all, today: false, week: false, month: false },
                      () => this.setAllDate());
                  }}
                >
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.periodCubeSmall, today && { backgroundColor: COLORS.BLUE }]}
                  onPress={() => {
                    this.setState({ all: false, today: !today, week: false, month: false },
                      () => this.setTodaysDate());
                  }}
                >
                  <Text>Today</Text>
                </TouchableOpacity>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.periodCubeSmall, week && { backgroundColor: COLORS.BLUE }]}
                  onPress={() => {
                    this.setState({ all: false, today: false, week: !week, month: false },
                      () => this.setLastWeekDate());
                  }}
                >
                  <Text>Week</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.periodCubeSmall, month && { backgroundColor: COLORS.BLUE }]}
                  onPress={() => {
                    this.setState({ all: false, today: false, week: false, month: !month },
                      () => this.setLastMonthDate());
                  }}
                >
                  <Text>Month</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.periodCubeBig}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ textAlign: 'left', width: 40 }}>From:</Text>
                <TouchableOpacity onPress={this.showDateTimePickerStartDate}>
                  <Text style={{ paddingLeft: 3, width: 100 }}>{startDate}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ textAlign: 'left', width: 40 }}>To:</Text>
                <TouchableOpacity onPress={this.showDateTimePickerEndDate}>
                  <Text style={{ paddingLeft: 3, width: 100 }}>{endDate}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.getTripsButton, ((!all && !today && !week && !month) && (startDate === 'YYYY-MM-DD' && endDate === 'YYYY-MM-DD')) && { opacity: 0.4 }]}
            onPress={this.getTripsPress}
            disabled={!all && !today && !week && !month && (startDate === 'YYYY-MM-DD' && endDate === 'YYYY-MM-DD')}
          >
            <Text style={styles.getTripsText}>Get trips</Text>
          </TouchableOpacity>

          {/* render real trips */}
          <FlatList
            data={tripsList}
            keyExtractor={(item) => item.trip_id}
            renderItem={({ item, index }) =>
              (
                <TripListItem trip={item} index={index} />
              )}
            // Performance settings
            removeClippedSubviews={true} // Unmount components when outside of window 
            initialNumToRender={1} // Reduce initial render amount
            maxToRenderPerBatch={3} // Reduce number in each render batch
            updateCellsBatchingPeriod={10} // Increase time between renders
            windowSize={11} // Reduce the window size
          />
          <TouchableOpacity
            style={styles.goToNextScreen}
            onPress={() => NavigationService.navigate('Rankings')}
          >
            <Text style={styles.goToNextScreenText}>{`Rankings`}</Text>
          </TouchableOpacity>
          {loading && <Loader />}
          <DateTimePicker
            isVisible={this.state.isDateTimePickerStartDateVisible}
            onConfirm={this.handleDatePickedStartDate}
            onCancel={this.hideDateTimePickerStartDate}
          />
          <DateTimePicker
            isVisible={this.state.isDateTimePickerEndDateVisible}
            onConfirm={this.handleDatePickedEndDate}
            onCancel={this.hideDateTimePickerEndDate}
          />
        </ImageBackground>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  dateSelect: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
  },
  periodCubeSmall: {
    borderColor: COLORS.BLUE,
    borderWidth: 3,
    fontSize: 16,
    padding: 2,
    width: 90,
    marginLeft: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginLeft: -35,
  },
  periodCubeBig: {
    borderColor: COLORS.BLUE,
    borderWidth: 3,
    fontSize: 16,
    padding: 2,
    paddingTop: 5,
    textAlign: 'center',
    marginLeft: 10,
    height: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.4,
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
  showMapButton: {
    color: COLORS.BLUE,
    backgroundColor: COLORS.BLUE,
    width: '80%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getTripsButton: {
    color: COLORS.BLUE,
    backgroundColor: COLORS.BLUE,
    width: 150,
    height: 50,
    alignSelf: 'flex-start',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  getTripsText: {
    color: COLORS.WHITE,
  }
});

const mapStateToProps = (state) =>
  ({
    tripsList: state.trip.tripsList,
    loading: state.loading,
    user: state.auth.user,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getTripsAll,
    getTripsInterval,
    setMapVisible,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyTripsScreen);
