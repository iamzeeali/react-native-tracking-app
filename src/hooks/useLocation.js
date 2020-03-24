import { useState, useEffect } from "react";
import { Alert } from "react-native";

import { watchPositionAsync, Accuracy } from "expo-location";
import * as Permissions from "expo-permissions";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );
        if (result.status !== "granted") {
          Alert.alert(
            "Insufficient permissions!",
            "You need to grant location permissions to use this app.",
            [{ text: "Okay" }]
          );
          return false;
        }
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      //stop watching
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
