import {
  REQUEST_GET_RANKING,
  REQUEST_GET_RANKING_SUCCESS,
  REQUEST_GET_RANKING_FAILURE,
  SET_RANKING_LIST_SORT_PARAMS,
} from 'ldmaapp/src/actions/actionTypes';

const initialState = {
  sortParams: {
    key: 'driver_id',
    order: 'desc',
    type: null,
  },
};

const ranking = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_GET_RANKING:
      return {
        rankingList: [],
      };
    case REQUEST_GET_RANKING_SUCCESS:
      return {
        rankingList: action.rankingList,
      };
    case REQUEST_GET_RANKING_FAILURE:
      return {
        error: action.error,
      };
    case SET_RANKING_LIST_SORT_PARAMS:
      return {
        ...state,
        sortParams: action.payload.data,
      }
    default:
      return state;
  }
};

export default ranking;
