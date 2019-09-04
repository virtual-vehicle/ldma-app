import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Svg, { Line } from 'react-native-svg';
import SideMenu from 'react-native-side-menu';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import moment from 'moment';
import { COLORS } from 'ldmaapp/src/constants/colors';
import Menu from 'ldmaapp/src/components/common/Menu';
import TripMap from 'ldmaapp/src/components/trip-details/TripMap';
import { getRiskScoreColor } from 'ldmaapp/src/utils/format';
import TextContainer from 'ldmaapp/src/components/trip-details/TextContainer';

class TripDetailsScreen extends Component {

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
          <View style={styles.header}>
            <Text style={styles.headerText}>Trip Details</Text>
          </View>
          <View style={{justifyContent: 'space-between'}}>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.trinInfoWrapperView}>
                <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                  <Text style={[ styles.tripInfoText, { fontSize: 12 } ]}>{`${start_date.format('DD.MM.YYYY')} ${start_date.format('HH:mm')}`}</Text>
                  <Text style={styles.tripInfoText}>{trip.start_position_name}</Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ padding: 5, fontSize: 14, textAlign: 'center', color: COLORS.WHITE }}>{trip.duration} min</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('ldmaapp/assets/png/completed.png')} />
                    <Svg
                      height="2"
                      width="60"
                    >
                      <Line
                        x1="0"
                        y1="0"
                        x2="100"
                        y2="0"
                        stroke={COLORS.WHITE}
                        strokeWidth="2"
                      />
                    </Svg>
                    <Image source={require('ldmaapp/assets/png/overdue.png')} />
                  </View>
                  <Text style={styles.tripInfoText}>{trip.distance} km</Text>
                </View>
                <View style={{ width: '40%', justifyContent: 'flex-start' }}>
                  <Text style={[ styles.tripInfoText, { fontSize: 12 } ]}>{`${end_date.format('DD.MM.YYYY')} ${end_date.format('HH:mm')}`}</Text>
                  <Text style={styles.tripInfoText}>{trip.end_position_name}</Text>
                </View>
              </View>
              <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-around', marginTop: 7, marginBottom: 7 }}>
                <TextContainer label={"Hard\nbrakes"} value={trip.brakes} />
                <TextContainer label={"Fast\naccelerations"} value={trip.accelerations} />
                <TextContainer label={"Stand\nstills"} value={trip.standstills} />
                <AnimatedCircularProgress
                  size={60}
                  width={5}
                  fill={trip.risk_score}
                  tintColor={getRiskScoreColor(trip.risk_score)}
                  backgroundColor={COLORS.DARKGREY}>
                  {
                    () => (
                      <Text style={{ fontSize: 12, color: COLORS.WHITE }}>
                        {`${trip.risk_score}%`}
                      </Text>
                    )
                  }
                </AnimatedCircularProgress>
              </View>
            </View>
            <View style={{ flex: 2, alignItems: 'center' }}>
              <TripMap {...{trip}} style={styles.map} />
            </View>
          </View>
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
    height: '85%',
    marginTop: 0,
  },
  tripInfoText: {
    padding: 5,
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  trinInfoWrapperView: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: COLORS.GREY,
  },
});

export default TripDetailsScreen;
