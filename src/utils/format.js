export const formatToTwoDecimals = value => {
  if (!value) {
    return false;
  }
  return Number.parseFloat(value).toFixed(2);
};
