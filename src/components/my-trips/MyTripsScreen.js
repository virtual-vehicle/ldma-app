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

class TripListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { trip, index } = this.props
    return (
      <TouchableOpacity style={{ paddingHorizontal: 15, paddingVertical: 10 }} key={trip.trip_id} onPress={() => NavigationService.navigate('TripDetails', { trip })}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ width: '40%' }}>
            <Text style={{ fontSize: 12, textAlign: 'left', color: COLORS.GREY }}>{`${moment(getTimeOutOfWholeDate(trip.start_at), 'HH:mm:ss').add(trip.duration, 'seconds').format('HH:mm')}`}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left', color: COLORS.WHITE }}>{trip.start_position_name.split(',')[0]}</Text>
          </View>
          <View style={{ width: '11%' }}>
            <Text style={{ fontSize: 12, textAlign: 'center', color: COLORS.GREY }}>{`${trip.distance} km`}</Text>
            <Text style={{ fontSize: 14, textAlign: 'center', color: COLORS.WHITE }}>{`>>`}</Text>
          </View>
          <View style={{ width: '40%' }}>
            <Text style={{ fontSize: 12, textAlign: 'right', color: COLORS.GREY }}>{`${moment(getTimeOutOfWholeDate(trip.end_at), 'HH:mm:ss').add(trip.duration, 'seconds').format('HH:mm')}`}</Text>
            <Text style={{ fontSize: 14, textAlign: 'right', color: COLORS.WHITE }}>{trip.end_position_name.split(',')[0]}</Text>
          </View>
          <View style={{ width: '9%', justifyContent: 'center', alignItems: 'flex-end', marginLeft: 7 }}>
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
    this.toggleSearch = this.toggleSearch.bind(this);
    this.clearDateSearch = this.clearDateSearch.bind(this);

    this.state = {
      isOpen: false,
      searchVisible: false,
      isDateTimePickerStartDateVisible: false,
      isDateTimePickerEndDateVisible: false,
      startDate: 'YYYY-MM-DD',
      endDate: 'YYYY-MM-DD',
    };
  }

  componentDidMount() {
    this.getTrips();
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

  toggleSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  getTrips = () => {
    const { getTripsAll, getTripsInterval, user } = this.props;
    let { startDate, endDate } = this.state;
    if (startDate != 'YYYY-MM-DD' || endDate != 'YYYY-MM-DD') {
      startDate = ((startDate == 'YYYY-MM-DD') ? '1970-01-01' : startDate)
      endDate = ((endDate == 'YYYY-MM-DD') ? '4000-01-01' : endDate)
      getTripsInterval(user, startDate, endDate);
    }
    else {
      getTripsAll(user);
    }
  }

  clearDateSearch() {
    this.setState({ startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }, () => this.getTrips());
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
    this.setState({ startDate: formattedDate }, () => this.getTrips());
    this.hideDateTimePickerStartDate();
  };

  handleDatePickedEndDate = (date) => {
    const dateMoment = moment(date);
    const formattedDate = dateMoment.format('YYYY-MM-DD');
    this.setState({ endDate: formattedDate }, () => this.getTrips());
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
            onPress={this.toggleSearch}
            style={styles.searchButton}
          >
            <Image
              source={require('ldmaapp/assets/png/search.png')}
              style={styles.menu}
            />
          </TouchableOpacity>
          {this.state.searchVisible &&
            <View style={{ width: '100%' }}>
              {this.renderLineSeparator()}
              <View style={styles.search}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ textAlign: 'left', color: COLORS.WHITE }}>From: </Text>
                  <TouchableOpacity onPress={this.showDateTimePickerStartDate}>
                    <Text style={{ paddingLeft: 3, width: 100, color: COLORS.GREY }}>{startDate}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ textAlign: 'left', color: COLORS.WHITE }}>To: </Text>
                  <TouchableOpacity onPress={this.showDateTimePickerEndDate}>
                    <Text style={{ paddingLeft: 3, width: 100, color: COLORS.GREY }}>{endDate}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={this.clearDateSearch}>
                  <Image
                    source={require('ldmaapp/assets/png/clear.png')}
                    style={styles.clearSearchImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          }

          {/* render real trips */}
          <SectionList
            width='100%'
            sections={[
              ...this.createSectionsList(tripsList),
            ]}
            keyExtractor={(item) => item.trip_id}
            ItemSeparatorComponent={this.renderLineSeparator}
            renderSectionHeader={({ section }) => (<View style={{ paddingHorizontal: 15, paddingVertical: 5, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}><Text style={{ color: COLORS.WHITE }}>{`${section.title}`}</Text></View>)}
            renderItem={({ item, index }) =>
              (
                <TripListItem trip={item} index={index} />
              )}
            // Performance settings
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={8} // initial render amount
            maxToRenderPerBatch={15} // number in each render batch
            updateCellsBatchingPeriod={5} // time between renders
            windowSize={25} // the window size
          />
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
  search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
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
  lineImage: {
    width: '100%',
    zIndex: 200,
    height: 1,
  },
  clearSearchImage: {
    height: 12,
    width: 12,
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
