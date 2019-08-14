import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  SectionList,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import moment from 'moment';
import { get as safeGet } from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { COLORS } from 'ldmaapp/src/constants/colors';
import {
} from 'ldmaapp/src/actions/uiActions';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import { getTripsAll, getTripsInterval, setMapVisible } from 'ldmaapp/src/actions/tripActions';
import NavigationService from 'ldmaapp/src/utils/navigation';
import { getTimeOutOfWholeDate, getDateOutOfWholeDate } from 'ldmaapp/src/utils/format';
import { getRiskScoreColor } from 'ldmaapp/src/utils/format';
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

  render() {
    const { trip, index } = this.props
    return (
      <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10 }} key={trip.trip_id} onPress={() => NavigationService.navigate('TripDetails', { trip: trip })}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '40%' }}>
            <Text style={{ fontSize: 12, textAlign: 'left', color: COLORS.GREY }}>{`${moment(getTimeOutOfWholeDate(trip.start_at), 'HH:mm:ss').add(trip.duration, 'seconds').format('HH:mm')}`}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left', color: COLORS.WHITE }}>{trip.start_position_name.split(',')[0]}</Text>
          </View>
          <View style={{ width: '10%' }}>
            <Text style={{ fontSize: 12, textAlign: 'center', color: COLORS.GREY }}>{`${trip.distance} km`}</Text>
            <Text style={{ fontSize: 14, textAlign: 'center', color: COLORS.WHITE }}>{`>>`}</Text>
          </View>
          <View style={{ width: '40%' }}>
            <Text style={{ fontSize: 12, textAlign: 'right', color: COLORS.GREY }}>{`${moment(getTimeOutOfWholeDate(trip.end_at), 'HH:mm:ss').add(trip.duration, 'seconds').format('HH:mm')}`}</Text>
            <Text style={{ fontSize: 14, textAlign: 'right', color: COLORS.WHITE }}>{trip.end_position_name.split(',')[0]}</Text>
          </View>
          <View style={{ width: '10%', justifyContent: 'center', alignItems: 'flex-end' }}>
            <AnimatedCircularProgress
              size={30}
              width={2}
              fill={trip.risk_score}
              tintColor={getRiskScoreColor(trip.risk_score)}
              backgroundColor={COLORS.DARKGREY}>
              {
                (fill) => (
                  <Text style={{ fontSize: 10, color: COLORS.WHITE }}>
                    {`${trip.risk_score}%`}
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>
        </View>
      </TouchableOpacity>
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

  createSectionsList = (tripsList) => {
    return tripsList.reduce((sections, trip) => {
      const title = getDateOutOfWholeDate(trip.start_at);
      let found = false;
      sections.forEach((section) => {
        if (section.title === title) {
          section.data = [...section.data, trip]
          found = true;
          return
        }
      });
      if (!found) {
        return [...sections, { title: title, data: [trip] }];
      }
      return sections;
    }, []);
  };

  renderLineSeparator = () => {
    return (
      //Item Separator
      <View>
        <Image
          source={require('ldmaapp/assets/png/line.png')}
          style={styles.lineImage}
        />
      </View>
    );
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
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.searchButton}
          >
            <Image
              source={require('ldmaapp/assets/png/search.png')}
              style={styles.menu}
            />
          </TouchableOpacity>
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
          <SectionList
            width='100%'
            sections={[
              ...this.createSectionsList(tripsList),
            ]}
            keyExtractor={(item) => item.trip_id}
            ItemSeparatorComponent={this.renderLineSeparator}
            renderSectionHeader={({ section }) => (<View style={{ paddingHorizontal: 15, paddingVertical: 5, backgroundColor: COLORS.GREY, opacity: 0.2 }}><Text style={{ color: COLORS.WHITE, opacity: 1.0 }}>{`${section.title}`}</Text></View>)}
            renderItem={({ item, index }) =>
              (
                <TripListItem trip={item} index={index} />
              )}
            // Performance settings
            removeClippedSubviews={true} // Unmount components when outside of window 
            initialNumToRender={8} // initial render amount
            maxToRenderPerBatch={10} // number in each render batch
            updateCellsBatchingPeriod={5} // time between renders
            windowSize={25} // the window size
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
  searchButton: {
    position: 'absolute',
    top: 8,
    right: 15,
    padding: 10,
    zIndex: 1000,
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
  },
  lineImage: {
    width: '100%',
    zIndex: 200,
    height: 1,
  },
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
