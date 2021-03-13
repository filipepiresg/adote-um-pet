import React, { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

import Geolocation from '@react-native-community/geolocation';

import CustomMarker from './components/CustomMarker';
import MAP_STYLES from './map_style.json';
import REGION_DEFAULT from './region_default.json';
import Styles, { Container } from './styles';

const LOCATIONS = [
  {
    title: 'ONG',
    phone: '(83) 98729-3710',
    description:
      'ola, somos uma ong que tenta o resgate de todos os animais, e iniciamos para adoção ',
    coordinate: REGION_DEFAULT,
  },
];

const Map = () => {
  const [location, setLocation] = useState({
    latitude: REGION_DEFAULT.latitude,
    longitude: REGION_DEFAULT.longitude,
    latitudeDelta: REGION_DEFAULT.latitudeDelta,
    longitudeDelta: REGION_DEFAULT.longitudeDelta,
  });

  const handleLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log('COORDS', coords);
        setLocation(REGION_DEFAULT);
        // setLocation({
        //   ...info.coords,
        //   latitude: info.coords.latitude,
        //   longitude: info.coords.longitude,
        // });
      },
      () => {},
      {
        enableHighAccuracy: true,
        timeout: 20 * 1000,
      }
    );
  }, []);

  const requestPermissionIOS = useCallback(async () => {
    try {
      const statuses = await requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS]);

      if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED) {
        handleLocation();
      } else {
        requestPermissionIOS();
      }
    } catch (err) {
      console.log('Error on request permissions', err);
    }
  }, [handleLocation]);

  const checkPermissionIOS = useCallback(async () => {
    try {
      const statuses = await checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]);

      if (statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED) {
        handleLocation();
      } else {
        requestPermissionIOS();
      }
    } catch (err) {
      console.log('Error on check permission', err);
      // return RESULTS.UNAVAILABLE;
    }
  }, [handleLocation, requestPermissionIOS]);

  const requestPermissionAndroid = useCallback(async () => {
    try {
      const statuses = await requestMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);

      if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
        handleLocation();
      } else {
        requestPermissionAndroid();
      }
    } catch (err) {
      console.log('Error on request permissions', err);
    }
  }, [handleLocation]);

  const checkPermissionAndroid = useCallback(async () => {
    try {
      const statuses = await checkMultiple([PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]);

      if (statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.GRANTED) {
        handleLocation();
      } else {
        requestPermissionAndroid();
      }
    } catch (err) {
      console.log('Error on check permission', err);
    }
  }, [handleLocation, requestPermissionAndroid]);

  useEffect(() => {
    async function checkPermission() {
      const callback = Platform.select({
        android: checkPermissionAndroid,
        ios: checkPermissionIOS,
        default: () => {},
      });

      const permission = await callback();
      return permission;
    }

    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={Styles.map}
        customMapStyle={MAP_STYLES}
        region={location}
      >
        {LOCATIONS.map((mark, index) => (
          <CustomMarker mark={mark} key={String(index)} />
        ))}
      </MapView>
    </Container>
  );
};

export default Map;
