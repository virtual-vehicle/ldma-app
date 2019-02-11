import { combineReducers } from 'redux';
import nav from './navReducer';
import ui from './uiReducer';
import auth from './authReducer';
import loading from './loadingReducer';
import ranking from './rankingReducer';
import event from './eventReducer';
import trip from './tripReducer';
import tripsInfo from './tripsInfoReducer';

const ldmaApp = combineReducers({
  nav,
  ui,
  auth,
  loading,
  ranking,
  event,
  trip,
  tripsInfo,
});

export default ldmaApp;
