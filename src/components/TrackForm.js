import React, { useContext } from "react";
import { ActivityIndicator } from "react-native";
import { Input, Button } from "react-native-elements";

import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";
import Spacer from "./Spacer";

export default function TrackForm() {
  const [saveTrack] = useSaveTrack();

  const {
    state: { recording, name, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);

  return (
    <React.Fragment>
      <Spacer>
        <Input
          placeholder="Track name"
          value={name}
          onChangeText={changeName}
        />
      </Spacer>

      <Spacer>
        {recording ? (
          <Button title="Stop" onPress={stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={startRecording} />
        )}
      </Spacer>

      <Spacer>
        {!recording && locations.length ? (
          <Button title="Save Recording" onPress={saveTrack} />
        ) : null}
      </Spacer>
    </React.Fragment>
  );
}
