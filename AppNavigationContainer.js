import { createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from 'ldmaapp/src/components/auth-loading/AuthLoadingScreen';
import LoginScreen from 'ldmaapp/src/components/login/LoginScreen';
import MainScreen from 'ldmaapp/src/components/main/MainScreen';
import MyTripsScreen from 'ldmaapp/src/components/my-trips/MyTripsScreen';
import SafeDrivingScreen from 'ldmaapp/src/components/safe-driving/SafeDrivingScreen';
import RankingsScreen from 'ldmaapp/src/components/rankings/RankingsScreen';


// used config from here: https://github.com/react-navigation/react-navigation/issues/707#issuecomment-299859578
const MainCardNavigator = createStackNavigator({
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

export const MainModalNavigator = createStackNavigator(
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

export const AppNavigationContainer = createAppContainer(MainModalNavigator);