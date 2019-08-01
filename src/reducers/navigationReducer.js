import {
    SELECT_NAVIGATION_ITEM,
} from 'ldmaapp/src/actions/actionTypes';

const initialState = {
    selected_navigation_item: 'Home',
  };

const navigation = (state = initialState, action = {}) => {
    switch (action.type) {
        case SELECT_NAVIGATION_ITEM:
            return {
                ...state,
                selected_navigation_item: action.navItem,
            }
      default:
        return state;
    }
  };
  
  export default navigation;