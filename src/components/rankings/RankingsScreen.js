import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import { get as safeGet } from 'lodash';
import { COLORS } from '../../constants/colors';
import { GO_TO_MAIN } from '../../actions/actionTypes';
import {
} from '../../actions/uiActions';
import Loader from '../common/Loader';
import Menu from '../common/Menu';
import { getRanking } from '../../actions/rankingActions';
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
  rankingList: any,
};

export class RankingsScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount() {
    const { getRanking, user } = this.props;
    const auth_token = safeGet(this.props.user, 'auth_token', '');
    getRanking(auth_token);
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
    const {
      navigation,
      loading,
    } = this.props;
    const rankingList = safeGet(this.props, 'rankingList', []);
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
            <Text style={styles.headerText}>Rankings</Text>
          </View>
          <ScrollView style={styles.content}>
            {rankingList.length > 0 ? rankingList.map((driver) => (
              <View style={styles.line}>
                <Text style={[styles.cube, { backgroundColor: COLORS.BLUE, color: COLORS.WHITE }]}>{driver.driver_id}</Text>
                <Text style={styles.cube}>{`${driver.driving_distance} km`}</Text>
                <Text style={styles.cube}>{driver.driving_time}</Text>
                <Text style={[styles.cube, { fontSize: 18 }]}>{`${driver.driving_score}%`}</Text>
              </View>
            )) :
            <View>
              <Text>{`There is no ranking.`}</Text>
            </View>
            }
          </ScrollView>
          <TouchableOpacity
            style={styles.goToNextScreen}
            onPress={() => navigation.dispatch({ type: GO_TO_MAIN })}
          >
            <Text style={styles.goToNextScreenText}>{`Main`}</Text>
          </TouchableOpacity>
          {loading && <Loader />}
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
    flexDirection: 'column',
    marginTop: 40,
  },
  line: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  cube: {
    borderColor: COLORS.BLUE,
    borderWidth: 3,
    fontSize: 14,
    padding: 2,
    paddingTop: 5,
    width: SCREEN_WIDTH * 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 5,
    marginRight: 5,
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
    rankingList: state.ranking.rankingList,
    loading: state.loading,
    user: state.auth.user,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getRanking,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RankingsScreen);

