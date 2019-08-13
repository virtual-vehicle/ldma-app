import React, { Component, PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { COLORS } from 'ldmaapp/src/constants/colors';
import Menu from 'ldmaapp/src/components/common/Menu';
import TripMap from 'ldmaapp/src/components/trip-details/TripMap'
import SideMenu from 'react-native-side-menu';
import moment from 'moment';
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
        <Text style={{ textAlign: 'center' }}>{label}</Text>
        <Text style={{ textAlign: 'center' }}>{value}</Text>
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
            <Text style={styles.headerText}>Trip Detail</Text>
          </View>

          <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ width: '40%', justifyContent: 'flex-start', borderWidth: 1, borderColor: COLORS.GREEN }}>
              <Text style={{ padding: 5, fontSize: 12, textAlign: 'center' }}>{`${start_date.format('DD.MM.YYYY')}\n${start_date.format('HH:mm')}`}</Text>
              <Text style={{ padding: 5, fontSize: 12, textAlign: 'center' }}>{trip.start_position_name}</Text>
            </View>
            <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ padding: 5, fontSize: 14, textAlign: 'center' }}>{trip.duration} min</Text>
              <Svg
                height="2"
                width="60"
              >
                <Line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="0"
                  stroke={COLORS.GREY2}
                  strokeWidth="2"
                />
              </Svg>
              <Text style={{ padding: 5, fontSize: 14, textAlign: 'center' }}>{trip.distance} km</Text>
            </View>
            <View style={{ width: '40%', justifyContent: 'flex-start', borderWidth: 1, borderColor: COLORS.RED }}>
              <Text style={{ padding: 5, fontSize: 12, textAlign: 'center' }}>{`${end_date.format('DD.MM.YYYY')}\n${end_date.format('HH:mm')}`}</Text>
              <Text style={{ padding: 5, fontSize: 12, textAlign: 'center' }}>{trip.end_position_name}</Text>
            </View>
          </View>
          <View style={styles.lineSeparator} />
          <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextContainer label={"Hard\nbrakes"} value={trip.brakes} />
            <TextContainer label={"Fast\naccelerations"} value={trip.accelerations} />
            <TextContainer label={"Stand\nstills"} value={trip.standstills} />
            <PercentageCircle
              radius={30}
              percent={trip.risk_score}
              color={getRiskScoreColor(trip.risk_score)}
              borderWidth={2}
              textStyle={{ fontSize: 12, color: getRiskScoreColor(trip.risk_score) }}
            />
          </View>
          <View style={styles.lineSeparator} />
          <TripMap trip={trip} style={styles.map} />
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
    height: '55%',
    marginTop: 10,
    marginLeft: 0,
  },
  lineSeparator: {
    borderBottomColor: COLORS.RED,
    borderBottomWidth: 0.5,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default TripDetailsScreen;
