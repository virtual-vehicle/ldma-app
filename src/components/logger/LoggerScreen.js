import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from 'ldmaapp/src/components/common/Menu';
import { COLORS } from 'ldmaapp/src/constants/colors';
const SCREEN_WIDTH = Dimensions.get('window').width;
const BUTTON_HEIGHT = 55;

class LoggerScreen extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      tracking: false
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

  toggleTracking() {
    this.setState({
      tracking: !this.state.tracking,
    });
  }

  render() {

    const { isOpen, tracking } = this.state;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
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
            <Text>Logger Screen</Text>
            <TouchableOpacity
              style={styles.trackingButton}
              onPress={(e) => this.toggleTracking(e)}
            >
              <Text style={styles.trackingText}>{!tracking ? 'Start' : 'End'}  tracking</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  backgroundImage: {
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
  trackingButton: {
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
  trackingText: {
    color: COLORS.WHITE,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
  },
});

export default LoggerScreen;

