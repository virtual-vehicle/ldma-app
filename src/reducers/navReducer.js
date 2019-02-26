
import { NavigationActions } from 'react-navigation';
import { MainModalNavigator } from '../../AppNavigator';
import {
  GO_BACK,
  GO_TO_LOGIN,
  GO_TO_MAIN,
  GO_TO_SAFE_DRIVING,
  GO_TO_MY_TRIPS,
  GO_TO_RANKINGS,
} from '../actions/actionTypes';

// Start with two routes: The Main screen, with the Login screen on top.
const { router } = MainModalNavigator;
const mainNavAction = router.getActionForPathAndParams('AppNavigator');
const initialNavState = router.getStateForAction(mainNavAction);

// we add helper for the actions in the main modal navigator
function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case GO_BACK:
      nextState = MainModalNavigator.router.getStateForAction(
        NavigationActions.back(),
        state,
      );
      break;
    case GO_TO_LOGIN:
      nextState = MainModalNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state,
      );
      break;
    case GO_TO_MAIN:
      nextState = MainModalNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state,
      );
      break;
    case GO_TO_SAFE_DRIVING:
      nextState = MainModalNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'SafeDriving' }),
        state,
      );
      break;
    case GO_TO_MY_TRIPS:
      nextState = MainModalNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MyTrips' }),
        state,
      );
      break;
    case GO_TO_RANKINGS:
      nextState = MainModalNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Rankings' }),
        state,
      );
      break;
    default:
      nextState = MainModalNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;
