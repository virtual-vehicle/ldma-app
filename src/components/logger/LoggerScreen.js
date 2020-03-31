import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from 'ldmaapp/src/components/common/Menu';

class LoggerScreen extends Component {

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
});

export default LoggerScreen;

