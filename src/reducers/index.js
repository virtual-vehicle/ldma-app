import { combineReducers } from 'redux';
import ui from './uiReducer';
import auth from './authReducer';
import loading from './loadingReducer';
import ranking from './rankingReducer';
import event from './eventReducer';
import trip from './tripReducer';
import tripsInfo from './tripsInfoReducer';

const ldmaApp = combineReducers({
  ui,
  auth,
  loading,
  ranking,
  event,
  trip,
  tripsInfo,
});

export default ldmaApp;
