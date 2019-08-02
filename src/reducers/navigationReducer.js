import {
    SELECT_NAVIGATION_ITEM,
} from 'ldmaapp/src/actions/actionTypes';

const initialState = {
    selectedNavigationItem: 'Home',
  };

const navigation = (state = initialState, action = {}) => {
    switch (action.type) {
        case SELECT_NAVIGATION_ITEM:
            return {
                ...state,
                selectedNavigationItem: action.navItem,
            }
      default:
        return state;
    }
  };

  export default navigation;