import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { addListener } from './js/utils/redux';
import AuthLoadingScreen from './js/components/auth-loading/AuthLoadingScreen';
import LoginScreen from './js/components/login/LoginScreen';
import MainScreen from './js/components/main/MainScreen';
import MyTripsScreen from './js/components/my-trips/MyTripsScreen';
import SafeDrivingScreen from './js/components/safe-driving/SafeDrivingScreen';
import RankingsScreen from './js/components/rankings/RankingsScreen';


// used config from here: https://github.com/react-navigation/react-navigation/issues/707#issuecomment-299859578
const MainCardNavigator = StackNavigator({
  Auth: {
    screen: AuthLoadingScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      header: null,
    },
  },
  MyTrips: {
    screen: MyTripsScreen,
    navigationOptions: {
      header: null,
    },
  },
  SafeDriving: {
    screen: SafeDrivingScreen,
    navigationOptions: {
      header: null,
    },
  },
  Rankings: {
    screen: RankingsScreen,
    navigationOptions: {
      header: null,
    },
  },
}, {
  initialRouteName: 'Auth',
});

export const MainModalNavigator = StackNavigator(
  {
    AppNavigator: {
      screen: MainCardNavigator,
      navigationOptions: {
        header: null,
      },
    },
    // here we add screens, which we would like to use as modal
    // ForgotPassword: { screen: ForgotPasswordScreen },
  },
  {
    mode: 'modal',
  },
);

type Props = {
  dispatch: any,
  nav: any
};

export class AppWithNavigationState extends React.Component<Props> {
  render() {
    const { dispatch, nav } = this.props;
    return (
      <MainModalNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
