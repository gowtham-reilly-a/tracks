import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Circle, Polyline } from "react-native-maps";

import { Context as LocationContext } from "../context/LocationContext";

export default function Map() {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) return <ActivityIndicator size="large" />;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={200}
        strokeColor="rgba(0,0,255,1.0)"
        fillColor="rgba(0,0,255,0.3)"
      />
      <Polyline
        lineDashPattern={[0.1]}
        lineCap="butt"
        strokeColor="rgba(150,255,150,1)"
        coordinates={locations.map((loc) => loc.coords)}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
