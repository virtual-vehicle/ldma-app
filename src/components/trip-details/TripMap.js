import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native'
import MapView, { Polyline, Marker, Callout } from 'react-native-maps';
import { formatCoordinates } from 'ldmaapp/src/utils/format';
import { COLORS } from 'ldmaapp/src/constants/colors';

class TripMap extends Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const { trip, style } = this.props;
    const coordinates = trip.gps_track.coordinates;
    return (
      <MapView
        ref={ref => { this._map = ref; }}
        onLayout={() => this._map.fitToCoordinates(formatCoordinates(coordinates), {
          edgePadding: { top: 75, right: 75, bottom: 75, left: 75 },
          animated: true,
        })}
        style={style}
        region={{
          latitude: coordinates[0].lat,
          longitude: coordinates[0].lon,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Route */}
        <Polyline
          coordinates={formatCoordinates(coordinates)}
          strokeColor="#0000ff" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={6}
        />

        {/* Start marker */}
        <Marker
          coordinate={{ latitude: coordinates[0].lat, longitude: coordinates[0].lon }}
          pinColor={COLORS.GREEN}
        >
          <Callout><Text>{trip.start_position_name}</Text></Callout>
        </Marker>

        {/* End marker */}
        <Marker
          coordinate={{ latitude: coordinates[coordinates.length -1].lat, longitude: coordinates[coordinates.length -1].lon }}
          pinColor={COLORS.RED}
        >
          <Callout><Text>{trip.end_position_name}</Text></Callout>
        </Marker>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
});

export default TripMap;
