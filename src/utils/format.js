import { COLORS } from 'ldmaapp/src/constants/colors';

export const formatToZeroDecimals = value => {
  if (!value) {
    return false;
  }
  return Number.parseFloat(value).toFixed(0);
};

export const getTimeOutOfWholeDate = value => {
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

export const formatCoordinates = coordinatesArray => {
  if (!coordinatesArray) {
    return [];
  }
  const newCoordinatesArray = coordinatesArray.map(elm => ({ latitude: elm.lat, longitude: elm.lon }));
  return newCoordinatesArray;
}

export const convertMinutesToHoursMinutes = minutes => {
  if (!minutes) {
    return `0 min`;
  }
  if (minutes < 60) {
    return `${minutes}\nmin`;
  }

  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  return `${hours} h\n${remainMinutes} min`;
}

export const getRiskScoreColor = risk_score => {
  if (risk_score < 25)
    return COLORS.RED;
  else if (risk_score < 50)
    return COLORS.ORANGE;
  else if (risk_score < 75)
    return COLORS.BLUE;
  else
    return COLORS.GREEN4;
}