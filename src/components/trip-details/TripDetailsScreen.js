import React, { Component, PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import { COLORS } from 'ldmaapp/src/constants/colors';
import Menu from 'ldmaapp/src/components/common/Menu';
import TripMap from 'ldmaapp/src/components/trip-details/TripMap'
import SideMenu from 'react-native-side-menu';
import moment from 'moment';
import MapView, { Polyline, Marker, Callout } from 'react-native-maps';
import PercentageCircle from 'react-native-percentage-circle';
import { getRiskScoreColor } from 'ldmaapp/src/utils/format';


const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  white: boolean,
};


class TextContainer extends PureComponent<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { label, value } = this.props;
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ textAlign: 'center', color: COLORS.WHITE }}>{label}</Text>
        <Text style={{ textAlign: 'center', color: COLORS.WHITE }}>{value}</Text>
      </View>
    );
  }
}

class TripDetailsScreen extends Component<Props> {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

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
    const { navigation } = this.props;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={navigation} />;
    const trip = navigation.getParam('trip');
    const start_date = moment(trip.start_at, 'YYYY-MM-DDTHH:mm:ss.SSSS');
    const end_date = moment(start_date).add(trip.duration, 'minutes');
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
          {/* Trip Details */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Trip Details</Text>
          </View>

          <Text>{trip.trip_id}</Text>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={{ fontSize: 10, width: 100, textAlign: 'center', borderWidth: 1, borderColor: COLORS.GREEN }}>{`${start_date.format('DD.MM.YYYY')}\n${start_date.format('HH:mm:ss')}`}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text>Duration: {trip.duration} min</Text>
              </View>
              <Text style={{ fontSize: 10, width: 100, textAlign: 'center', borderWidth: 1, borderColor: COLORS.RED }}>{`${end_date.format('DD.MM.YYYY')}\n${end_date.format('HH:mm:ss')}`}</Text>
            </View>
            <View>
              <Text style={{ color: COLORS.WHITE, fontSize: 10, width: 100, textAlign: 'center', borderWidth: 1, borderColor: COLORS.GREEN }}>{trip.start_position_name}</Text>
              <Text>Distance: {trip.distance} km</Text>
              <Text style={{ color: COLORS.WHITE, fontSize: 10, width: 100, textAlign: 'center', borderWidth: 1, borderColor: COLORS.RED, marginTop: 0 }}>{trip.end_position_name}</Text>
            </View>
            <PercentageCircle
              radius={30}
              percent={trip.risk_score}
              color={getRiskScoreColor(trip.risk_score)}
              borderWidth={2}
              textStyle={{ fontSize: 12, color: getRiskScoreColor(trip.risk_score) }}
            />
          </View>
          <TripMap trip={trip} style={styles.map} />
          <View style={{ width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextContainer label={"Hard\nbrakes"} value={trip.brakes} />
            <TextContainer label={"Fast\naccelerations"} value={trip.accelerations} />
            <TextContainer label={"Stand\nstills"} value={trip.standstills} />
          </View>
          <View style={styles.lineSeparator} />

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
  map: {
    width: '95%',
    height: '40%',
    marginTop: 10,
    marginLeft: 0,
  },
  lineSeparator: {
    borderBottomColor: COLORS.RED,
    borderBottomWidth: 0.5,
    marginTop: 19.5,
    marginBottom: 20,
  },
});

export default TripDetailsScreen;
