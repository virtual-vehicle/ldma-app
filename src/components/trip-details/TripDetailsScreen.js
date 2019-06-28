import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Menu from 'ldmaapp/src/components/common/Menu';
import SideMenu from 'react-native-side-menu';
import MapView, { Polyline } from 'react-native-maps';

type Props = {
  white: boolean,
};

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
});

export default TripDetailsScreen;
