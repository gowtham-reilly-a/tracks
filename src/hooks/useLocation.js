import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useLocation = (tracking, callback) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    let recentLocation;
    const startLocation = async () => {
      try {
        const { granted } = await Location.requestForegroundPermissionsAsync();

        if (!granted) setError("denied");

        recentLocation = await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );

        setError(null);
      } catch (err) {
        console.log(err);
      }
    };

    if (tracking) startLocation();

    if (!tracking) {
      recentLocation && recentLocation.remove();
      recentLocation = null;
    }

    return () => {
      recentLocation && recentLocation.remove();
    };
  }, [tracking, callback]);

  return [error];
};

export default useLocation;
