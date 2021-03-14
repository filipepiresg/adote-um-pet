import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

import Geolocation from '@react-native-community/geolocation';

import { Colors, Metrics } from '~/src/utils';

import CustomMarker from './components/CustomMarker';
import EmptyMap from './components/EmptyMap';
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
  const [showMap, setShowMap] = useState({ loading: true, error: undefined });
  const [location, setLocation] = useState({
    latitude: REGION_DEFAULT.latitude,
    longitude: REGION_DEFAULT.longitude,
    latitudeDelta: REGION_DEFAULT.latitudeDelta,
    longitudeDelta: REGION_DEFAULT.longitudeDelta,
  });

  const handleLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        Geocoder.from({
          lat: coords.latitude,
          lng: coords.longitude,
        })
          .then(
            ({
              status,
              results: [
                {
                  geometry: { location: geoLocation, viewport: bounds },
                },
              ],
            }) => {
              if (status === 'OK') {
                const ASPECT_RATIO = Metrics.screenWidth / Metrics.screenHeight;

                const latitude = parseFloat(geoLocation.lat);
                const longitude = parseFloat(geoLocation.lng);
                const northeastLat = parseFloat(bounds.northeast.lat);
                const southwestLat = parseFloat(bounds.southwest.lat);
                const latitudeDelta = northeastLat - southwestLat;
                const longitudeDelta = latitudeDelta * ASPECT_RATIO;
                setLocation({
                  latitude,
                  longitude,
                  latitudeDelta,
                  longitudeDelta,
                });
                setShowMap({ ...showMap, loading: false });
              }
            }
          )
          .catch((err) => {
            setShowMap({
              loading: false,
              error: err,
            });
          });
      },
      ({ message }) => {
        setShowMap({
          loading: false,
          error: message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 20 * 1000,
      }
    );
  }, [showMap]);

  const requestPermissionIOS = useCallback(async () => {
    try {
      const statuses = await requestMultiple([PERMISSIONS.IOS.LOCATION_ALWAYS]);

      if (statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED) {
        handleLocation();
      } else {
        Alert.alert(
          'Permissão negada',
          'É necessário permissão para determinar a sua localização no mapa',
          [
            {
              onPress: requestPermissionIOS,
              text: 'Pedir permissão',
            },
            {
              onPress: () => {
                setShowMap({
                  loading: false,
                  error: 'Permissão negada',
                });
              },
              text: 'Cancelar',
              style: 'cancel',
            },
          ]
        );
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
        Alert.alert(
          'Permissão negada',
          'É necessário permissão para determinar a sua localização no mapa',
          [
            {
              onPress: requestPermissionAndroid,
              text: 'Pedir permissão',
            },
            {
              onPress: () => {
                setShowMap({
                  loading: false,
                  error: 'Permissão negada',
                });
              },
              text: 'Cancelar',
              style: 'cancel',
            },
          ]
        );
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
      {!showMap.loading && !showMap.error ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={Styles.map}
          customMapStyle={MAP_STYLES}
          region={location}
          initialRegion={REGION_DEFAULT}
          loadingBackgroundColor={Colors.BACKGROUND}
          loadingEnabled
          loadingIndicatorColor={Colors.BLACK}
        >
          {LOCATIONS.map((mark, index) => (
            <CustomMarker mark={mark} key={String(index)} />
          ))}
        </MapView>
      ) : (
        <EmptyMap data={showMap} />
      )}
    </Container>
  );
};

export default Map;
