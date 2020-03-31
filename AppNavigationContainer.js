import { createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from 'ldmaapp/src/components/auth-loading/AuthLoadingScreen';
import LoginScreen from 'ldmaapp/src/components/login/LoginScreen';
import HomeScreen from 'ldmaapp/src/components/home/HomeScreen';
import MyTripsScreen from 'ldmaapp/src/components/my-trips/MyTripsScreen';
import TripDetailsScreen from 'ldmaapp/src/components/trip-details/TripDetailsScreen';
import RankingsScreen from 'ldmaapp/src/components/rankings/RankingsScreen';
import LoggerScreen from   'ldmaapp/src/components/logger/LoggerScreen';

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
  Home: {
    screen: HomeScreen,
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
  TripDetails: {
    screen: TripDetailsScreen,
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
  Logger: {
    screen: LoggerScreen,
    navigationOptions: {
      header: null,
    },
  },
}, {
  initialRouteName: 'Logger',
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