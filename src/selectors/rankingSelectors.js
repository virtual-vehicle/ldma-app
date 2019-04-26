import { createSelector } from 'reselect';
import { get, orderBy } from 'lodash';

const rankingListSelector = state => state.ranking && state.ranking.rankingList;
export const rankingListSortSelector = state => state.ranking && state.ranking.sortParams;

function orderByType(data, type) {
    switch (type) {
      case 'float':
        return parseFloat(data);
      default:
        return data;
    }
}

export const getSortedRankingListCollection = createSelector(
  rankingListSelector,
  rankingListSortSelector,
  (rankingListCollection, sort) => {
    if (sort) {
      return orderBy(
        rankingListCollection,
        c => orderByType(get(c, sort.key), sort.type),
        [sort.order || "desc"]
      )
    }
    return rankingListCollection;
  }
)

