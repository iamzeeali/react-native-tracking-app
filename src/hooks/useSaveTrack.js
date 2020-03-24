import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { Context as LocationContext } from "../context/LocationContext";
import * as navigation from "../navigationRef";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { locations, name },
    reset
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigation.navigate("TrackList");
  };

  return [saveTrack];
};
