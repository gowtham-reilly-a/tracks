import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import { Context as TracksContext } from "../context/TracksContext";

import MapView, { Polyline } from "react-native-maps";

const TrackDetailScreen = ({ route, navigation }) => {
  const { state } = useContext(TracksContext);

  const track = state.find((t) => t._id === route.params._id);

  const initialCoords = track.locations[0].coords;

  useEffect(() => {
    navigation.setOptions({
      title: track.name || "Untitled track",
    });
  }, [navigation]);

  return (
    <View>
      <MapView
        initialRegion={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          ...initialCoords,
        }}
        style={styles.map}
      >
        <Polyline
          lineDashPattern={[0.1]}
          coordinates={track.locations.map((loc) => loc.coords)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("window").height / 2,
  },
});

export default TrackDetailScreen;
