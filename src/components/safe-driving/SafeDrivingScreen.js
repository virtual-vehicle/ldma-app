import React, { Component } from 'react';
import {
  View,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import PercentageCircle from 'react-native-percentage-circle';
import { COLORS } from 'ldmaapp/src/constants/colors';
import { GO_TO_MY_TRIPS } from 'ldmaapp/src/actions/actionTypes';
import {
} from 'ldmaapp/src/actions/uiActions';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import { getEvents } from 'ldmaapp/src/actions/eventActions';
/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const FIELDS_WIDTH = '88%';
const BUTTON_HEIGHT = 50;
const INPUT_FIELDS_HEIGHT = 66;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_RATIO = SCREEN_HEIGHT / SCREEN_WIDTH;

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
    const { navigation } = this.props;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} navigation={navigation} />;

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
              source={require('./img/menu.png')}
              style={styles.menu}
            />
          </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.headerText}>Safe Driving</Text>
            </View>
            <View style={styles.content}>
              <View style={styles.percent}>
                <PercentageCircle radius={67} percent={50} color={COLORS.GREEN4} borderWidth={10} textStyle={{ fontSize: 30 }}></PercentageCircle>
                <Text style={{ paddingTop: 10 }}>Driving Score (total)</Text>
              </View>
              <View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.cube}>{'12\ntrips'}</Text>
                  <Text style={styles.cube}>{'365\nkm'}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                  <Text style={styles.cube}>{'13\nevents'}</Text>
                  <Text style={styles.cube}>{'13:21\nmin'}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                  <Text style={styles.cube}>{'13\nevents'}</Text>
                  <Text style={styles.cube}>{'13:21\nmin'}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                  <Text style={styles.cube}>{'13\nevents'}</Text>
                  <Text style={styles.cube}>{'13:21\nmin'}</Text>
                </View>
              </View>
            </View>
            <Text style={{ alignSelf: 'flex-start', paddingLeft: 20, paddingTop: 20 }}>Show more details...</Text>
              <TouchableOpacity
                style={styles.goToNextScreen}
                onPress={() => navigation.dispatch({ type: GO_TO_MY_TRIPS })}
              >
                <Text style={styles.goToNextScreenText}>{`My Trips`}</Text>
              </TouchableOpacity>
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
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SafeDrivingScreen);
