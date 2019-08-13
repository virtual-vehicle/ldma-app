import {
    SELECT_NAVIGATION_ITEM,
} from './actionTypes';
  
export const selectNavigationItem = (navItem) => ({
    type: SELECT_NAVIGATION_ITEM,
    navItem: navItem,
  });
