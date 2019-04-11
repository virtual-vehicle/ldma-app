export const formatToTwoDecimals = value => {
  if (!value) {
    return false;
  }
  return Number.parseFloat(value).toFixed(2);
};

export const getTimeOutOfWholeDate = value=> {
  if (!value) {
    return '';
  }
  const time = value.split("T")[1];
  return time;
}

export const getDateOutOfWholeDate = value => {
  if (!value) {
    return '';
  }
  const date = value.split("T")[0];
  return date;
}