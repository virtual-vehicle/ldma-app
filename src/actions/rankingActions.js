import {
  REQUEST_GET_RANKING,
  REQUEST_GET_RANKING_SUCCESS,
  REQUEST_GET_RANKING_FAILURE,
} from 'ldmaapp/src/actions/actionTypes';
import { rankingService } from 'ldmaapp/src/services/rankingService';

export const getRanking = (auth_token) => {
  return dispatch => {
    dispatch(request());

    return rankingService.getRanking(auth_token)
      .then(
        rankingList => {
          dispatch(success(rankingList));
        },
        error => {
          dispatch(failure(error));
        },
      );
  };

  function request() { return { type: REQUEST_GET_RANKING }; }
  function success(rankingList) { return { type: REQUEST_GET_RANKING_SUCCESS, rankingList }; }
  function failure(error) { return { type: REQUEST_GET_RANKING_FAILURE, error }; }
};
