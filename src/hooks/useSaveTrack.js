import { useContext } from "react";

import { Context as TracksContext } from "../context/TracksContext";
import { Context as LocationContext } from "../context/LocationContext";
import { navigate } from "../NavigationRef";

export default () => {
  const {
    state: { name, locations },
    reset,
  } = useContext(LocationContext);

  const { createTrack } = useContext(TracksContext);

  const saveTrack = async () => {
    await createTrack(name || "Untitled track", locations);
    navigate("TrackList");
    reset();
  };

  return [saveTrack];
};
