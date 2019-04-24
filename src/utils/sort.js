export const driverScoreComparator = (a, b) => {
    // Use toUpperCase() to ignore character casing
  const driver_scoreA = Number(a.driver_score);
  const driver_scoreB = Number(b.driver_score);

  let comparison = 0;
  if (driver_scoreA > driver_scoreB) {
    comparison = 1;
  } else if (driver_scoreA < driver_scoreB) {
    comparison = -1;
  }
  return comparison;
}