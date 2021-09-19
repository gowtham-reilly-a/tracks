import "../_mockLocation";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";

import Map from "../components/Map";
import Spacer from "../components/Spacer";
import TrackForm from "../components/TrackForm";

const TrackCreateScreen = ({ navigation }) => {
  const [isFocused, setIsFocused] = useState(null);

  const {
    addLocation,
    state: { recording },
  } = useContext(LocationContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsFocused(true);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setIsFocused(false);
    });

    return unsubscribe;
  }, [navigation]);

  const addLocationCallback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [error] = useLocation(isFocused || recording, addLocationCallback);

  return (
    <ScrollView style={styles.container}>
      <Spacer>
        <Text h3>Create Tracking</Text>
      </Spacer>
      <Map />

      {error ? (
        <Text style={{ color: "red" }}>Enable location services</Text>
      ) : null}
      <TrackForm />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
});

export default TrackCreateScreen;
