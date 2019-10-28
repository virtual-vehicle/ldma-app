import React, { Component, Fragment } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import { get as safeGet } from 'lodash';
import { COLORS } from 'ldmaapp/src/constants/colors';
import Loader from 'ldmaapp/src/components/common/Loader';
import Menu from 'ldmaapp/src/components/common/Menu';
import { getRanking, setRankingListSortParams } from 'ldmaapp/src/actions/rankingActions';
import { formatToZeroDecimals } from 'ldmaapp/src/utils/format';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import NavigationService from 'ldmaapp/src/utils/navigation';
import { getRiskScoreColor } from 'ldmaapp/src/utils/format';
import { rankingListSortSelector, getSortedRankingListCollection } from 'ldmaapp/src/selectors/rankingSelectors';
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
  setRankingListSortParams: any
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
    const auth_token = safeGet(user, 'auth_token', '');
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
      setRankingListSortParams,
    } = this.props;
    const rankingList = safeGet(this.props, 'rankingList', []);
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
            <Text style={styles.headerText}>Rankings</Text>
          </View>
          <ScrollView style={styles.content}>
          {rankingList.length > 0 ? rankingList.map((driver, index) => {

            return (
            <Fragment key={driver.driver_id}>
              <View style={{ width: SCREEN_WIDTH - 60, flexDirection: 'row', justifyContent: 'space-between', position: 'relative' }}>
              <Text style={{ position: 'absolute', left: 0, top: 0, width: 40, height: 40, zIndex: 1000 }} onPress={() => setRankingListSortParams('driver_score', 'float')}></Text>
              <AnimatedCircularProgress
                size={45}
                width={4}
                onAnimationComplete={() => console.log('onAnimationComplete')}
                fill={driver.driver_score}
                tintColor={getRiskScoreColor(driver.driver_score)}
                backgroundColor={COLORS.DARKGREY}>
                {
                  _ => (
                    <Text style={{ fontSize: 10, color: COLORS.WHITE, textAlign: 'center' }}>
                      {`${driver.driver_score}%`}
                    </Text>
                  )
                }
              </AnimatedCircularProgress>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, lineHeight: 10, letterSpacing: 1.0, color: COLORS.WHITE }} onPress={() => setRankingListSortParams('driver_id')}>ID</Text>
                <Text style={{ fontSize: 30, lineHeight: 30, letterSpacing: 0.5, color: COLORS.WHITE, paddingTop: 5 }} onPress={() => setRankingListSortParams('driver_id')}>{driver.driver_id}</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, lineHeight: 10, letterSpacing: 1.0, color: COLORS.WHITE }} onPress={() => setRankingListSortParams('driving_distance', 'float')}>DISTANCE (km)</Text>
                <Text style={{ fontSize: 30, lineHeight: 30, letterSpacing: 0.5, color: COLORS.WHITE, paddingTop: 5 }} onPress={() => setRankingListSortParams('driving_distance', 'float')}>{formatToZeroDecimals(driver.driving_distance)}</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 10, lineHeight: 10, letterSpacing: 1.0, color: COLORS.WHITE }} onPress={() => setRankingListSortParams('driving_time', 'float')}>TIME (min)</Text>
                <Text style={{ fontSize: 30, lineHeight: 30, letterSpacing: 0.5, color: COLORS.WHITE, paddingTop: 5 }} onPress={() => setRankingListSortParams('driving_time', 'float')}>{formatToZeroDecimals(driver.driving_time)}</Text>
              </View>

            </View>

            <View>
              <Image
                source={require('ldmaapp/assets/png/line.png')}
                style={styles.lineImage}
              />
            </View>
          </Fragment>
          )}) :
          <View>
            <Text>{`There is no ranking.`}</Text>
          </View>
          }
          </ScrollView>
          {/*
          <TouchableOpacity
            style={styles.goToNextScreen}
            onPress={() => NavigationService.navigate('Home')}
          >
            <Text style={styles.goToNextScreenText}>{`Home`}</Text>
          </TouchableOpacity>
          */}
          {loading && <Loader />}
        </ImageBackground>
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
    paddingLeft: 15,
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
  lineImage: {
    width: '100%',
    zIndex: 200,
    height: 1,
    marginTop: 25,
    marginBottom: 25,
  },
});

const mapStateToProps = (state) =>
  ({
    rankingList: getSortedRankingListCollection(state),
    rankingListSortParams: rankingListSortSelector(state),
    loading: state.loading,
    user: state.auth.user,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    getRanking,
    setRankingListSortParams,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RankingsScreen);

