import Geolocation from '@react-native-community/geolocation';
import textStyle from '@src/theme/text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { API_KEY } from 'react-native-dotenv';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import parkingLotAPI from '@src/api/parkingLot.api';
import { Image } from 'react-native';
import ParkingLotModal from './components/ParkingLotModal';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
});

const RADIUS_KM = 3;

const ParkingLotsMap = ({initialLocation}) => {
  const [region, setRegion] = useState(null);
  const [parkingslots, setParkingslots] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedParkingslot, setSelectedParkingslot] = useState(null);
  const mapRef = useRef(null);
  const lastFetchedLocation = useRef(null);
  const [fetchError, setFetchError] = useState(false);

  const fetchParkingSlots = useCallback(
    async (latitude, longitude) => {
      if (fetchError) return;
      try {
        const response = await parkingLotAPI.getParkingLotsInRegion({
          latitude,
          longitude,
          radius: RADIUS_KM,
        });
        lastFetchedLocation.current = {latitude, longitude};
        setParkingslots(response);
      } catch (error) {
        console.error('Error fetching parking slots:', error);
        setFetchError(true);
        Alert.alert('Lỗi', 'Không thể tải dữ liệu bãi đỗ xe');
      }
    },
    [fetchError],
  );

  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          resolve({latitude: 10.87061180891543, longitude: 106.8022367824454});
        },
        error => reject(error),
        {enableHighAccuracy: false, timeout: 20000},
      );
    });
  }, []);

  useEffect(() => {
    const setupLocation = async () => {
      try {
        const location = initialLocation || (await getCurrentLocation());
        const newRegion = {
          ...location,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        setMarkerPosition(location);
        fetchParkingSlots(location.latitude, location.longitude);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại');
      }
    };
    setupLocation();
  }, [initialLocation, getCurrentLocation, fetchParkingSlots]);

  // const handleRegionChangeComplete = useMemo(() => debounce(async (newRegion) => {
  //   if (fetchError) return;
  //   setRegion(newRegion);
  //   if (!lastFetchedLocation.current) {
  //     await fetchParkingSlots(newRegion.latitude, newRegion.longitude);
  //     return;
  //   }
  //   const latChange = Math.abs(newRegion.latitude - lastFetchedLocation.current.latitude);
  //   const lonChange = Math.abs(newRegion.longitude - lastFetchedLocation.current.longitude);
  //   if (latChange > SIGNIFICANT_CHANGE || lonChange > SIGNIFICANT_CHANGE) {
  //     await fetchParkingSlots(newRegion.latitude, newRegion.longitude);
  //   }
  // }, 300), [fetchError, fetchParkingSlots]);

  const handlePress = useCallback(
    (data, details = null) => {
      if (fetchError) return;
      const {location} = details.geometry;
      const newRegion = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0621,
      };
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
      fetchParkingSlots(location.lat, location.lng);
    },
    [fetchError, fetchParkingSlots],
  );

  if (!region || !markerPosition) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        region={region}>
        {parkingslots.map((parkingslot, index) => (
          <Marker
            key={index}
            onPress={() => {
              setSelectedParkingslot(selectedParkingslot ? null : parkingslot);
            }}
            coordinate={{
              latitude: parkingslot.latitude,
              longitude: parkingslot.longitude,
            }}>
            <View style={styles.markerContainer}>
              <Text numberOfLines={2} style={styles.markerText}>
                {parkingslot.name}
              </Text>
              <View
                style={[
                  styles.markerAvatar,
                  {
                    borderWidth: 6,
                    width: 36,
                    height: 36,
                    backgroundColor: 'red',
                  },
                ]}>
                <Image
                  source={require('../../assets/imgs/Parking.png')}
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                />
              </View>
            </View>
          </Marker>
        ))}
        <Marker coordinate={markerPosition} />
        {selectedParkingslot && (
          <MapViewDirections
            origin={region}
            destination={selectedParkingslot.location}
            apikey={API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )}
      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Tìm kiếm"
          onPress={handlePress}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          onFail={error => console.log('Find place error', error)}
        />
      </View>
      {selectedParkingslot && (
        <ParkingLotModal
          parkingslot={selectedParkingslot}
          handleContinue={() => {}}
          isVisible={selectedParkingslot != null}
          onClose={() => {
            setSelectedParkingslot(null);
          }}></ParkingLotModal>
      )}
    </View>
  );
};

export default ParkingLotsMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerText: {
    ...textStyle.h[5],
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    width: 80,
    borderRadius: 6,
    paddingHorizontal: 4,
    backgroundColor: 'tomato',
    textShadowRadius: 10,
    color: 'white',
    textAlign: 'center',
  },
  markerAvatar: {
    borderColor: 'white',
  },
  searchContainer: {
    height: 48,
    width: '100%',
  },
  seperator: {
    width: 3,
    borderRadius: 24,
    height: 32,
    marginHorizontal: 8,
    backgroundColor: 'gray',
  },
});
