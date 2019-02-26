import {
  REQUEST_GET_RANKING,
  REQUEST_GET_RANKING_SUCCESS,
  REQUEST_GET_RANKING_FAILURE,
} from 'ldmaapp/src/actions/actionTypes';

const ranking = (state = {}, action = {}) => {
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
    default:
      return state;
  }
};

export default ranking;
