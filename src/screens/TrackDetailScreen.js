import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = props => {
  const { state } = useContext(TrackContext);
  const _id = props.route.params._id;

  const track = state.find(t => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <View>
      <Text style={{ fontSize: 48 }}>{track.name}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
      >
        <Polyline coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  map: {
    height: 300
  }
});

export default TrackDetailScreen;
