export const driverScoreComparator = (a, b) => {
  const driver_scoreA = Number(a.driver_score);
  const driver_scoreB = Number(b.driver_score);

  let comparison = 0;
  if (driver_scoreA > driver_scoreB) {
    comparison = 1;
  } else if (driver_scoreA < driver_scoreB) {
    comparison = -1;
  }
  return comparison;
};

export const drivingTimeComparator = (a, b) => {
  const driving_timeA = Number(a.driving_time);
  const driving_timeB = Number(b.driving_time);

  let comparison = 0;
  if (driving_timeA > driving_timeB) {
    comparison = 1;
  } else if (driving_timeA < driving_timeB) {
    comparison = -1;
  }
  return comparison;
};

