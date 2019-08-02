import { combineReducers } from 'redux';
import ui from './uiReducer';
import auth from './authReducer';
import loading from './loadingReducer';
import ranking from './rankingReducer';
import trip from './tripReducer';
import tripsInfo from './tripsInfoReducer';
import graphTripscore from './graphTripscoreReducer';
import navigation from './navigationReducer';

const ldmaApp = combineReducers({
  ui,
  auth,
  loading,
  ranking,
  trip,
  tripsInfo,
  graphTripscore,
  navigation,
});

export default ldmaApp;
