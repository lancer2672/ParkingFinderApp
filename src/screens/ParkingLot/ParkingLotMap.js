import Geolocation from '@react-native-community/geolocation';
import parkingLotAPI from '@src/api/parkingLot.api';
import { generalColor } from '@src/theme/color';
import textStyle from '@src/theme/text';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_KEY } from 'react-native-dotenv';
import { SelectCountry } from 'react-native-element-dropdown';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import ParkingLotModal from './components/ParkingLotModal';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
});

const RADIUS_KM = 3;
const local_data = [
  {
    value: 'CAR',
    label: 'Ô tô',
    image: require("../../assets/icons/car.png"),
  },
  {
    value: 'MOTORCYCLE',
    label: 'Xe máy',
    image: require("../../assets/icons/motorbike.png"),
  },
];

const ParkingLotsMap = ({ initialLocation, navigation }) => {
  const [parkingslots, setParkingslots] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [selectedParkingslot, setSelectedParkingslot] = useState(null);
  const [isMapMoved, setIsMapMoved] = useState(false);
  const [vehicleType, setVehicleType] = useState('CAR');
  const [currentRegion, setCurrentRegion] = useState(null);
  const mapRef = useRef(null);
  const lastFetchedLocation = useRef(null);
  const [fetchError, setFetchError] = useState(false);

  const fetchParkingLots = useCallback(
    async (latitude, longitude, type) => {
      if (fetchError) return;
      try {
        const response = await parkingLotAPI.getParkingLotsInRegion({
          latitude,
          longitude,
          radius: RADIUS_KM,
          type,
        });
        lastFetchedLocation.current = { latitude, longitude };
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
          const { latitude, longitude } = position.coords;
          resolve({ latitude: 10.87061180891543, longitude: 106.8022367824454 });
        },
        error => reject(error),
        { enableHighAccuracy: false, timeout: 20000 },
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
        setCurrentRegion(newRegion);
        setMarkerPosition(location);
        fetchParkingLots(location.latitude, location.longitude, vehicleType);
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại');
      }
    };
    setupLocation();
  }, [initialLocation, getCurrentLocation, fetchParkingLots]);

  const handleSearchThisArea = () => {
    if (currentRegion) {
      fetchParkingLots(currentRegion.latitude, currentRegion.longitude, vehicleType);
    }
  };

  const handlePress = useCallback(
    (data, details = null) => {
      if (fetchError) return;
      const { location } = details.geometry;
      const newRegion = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0621,
      };
      setCurrentRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
      fetchParkingLots(location.lat, location.lng);
    },
    [fetchError, fetchParkingLots],
  );

  if (!currentRegion || !markerPosition) {
    return null;
  }

  const handleRegionChange = (newRegion, details) => {
    if (!details.isGesture) {
      return;
    }
    if (Math.abs(newRegion.latitude - currentRegion.latitude) < 0.0001 && Math.abs(newRegion.longitude - currentRegion.longitude) < 0.0001) {
      return;
    }
    if (selectedParkingslot == null) {
      return;
    }
    setCurrentRegion(() => newRegion);
    setIsMapMoved(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        onRegionChangeComplete={handleRegionChange}
        region={currentRegion}
      >
        {parkingslots.map((parkingslot, index) => (
          <Marker
            key={index}
            onPress={() => {
              if (selectedParkingslot == null) {
                setCurrentRegion({
                  ...currentRegion,
                  latitude: parkingslot.latitude,
                  longitude: parkingslot.longitude,
                });
                setSelectedParkingslot(parkingslot);
              } else {
                setSelectedParkingslot(null);
              }
            }}
            coordinate={{
              latitude: parkingslot.latitude,
              longitude: parkingslot.longitude,
            }}
          >
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
                ]}
              >
                <Image
                  source={require('../../assets/imgs/Parking.png')}
                  style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
              </View>
            </View>
          </Marker>
        ))}
        <Marker coordinate={markerPosition} />
        {selectedParkingslot && (
          <MapViewDirections
            origin={currentRegion}
            destination={{
              latitude: selectedParkingslot.latitude,
              longitude: selectedParkingslot.longitude,
            }}
            apikey={API_KEY}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        )}
      </MapView>

      <View style={[styles.searchContainer, { position: 'absolute', top: 40, left: 24, right: 24 }]}>
        <GooglePlacesAutocomplete
          placeholder="Tìm kiếm"
          onPress={handlePress}
          query={{
            key: API_KEY,
            language: 'en',
          }}
          onFail={error => console.log('Find place error', error)}
        />
        {isMapMoved && (
          <TouchableOpacity
            style={styles.searchAreaButton}
            onPress={handleSearchThisArea}
          >
            <Text style={styles.searchAreaButtonText}>
              Tìm kiếm khu vực này
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ width: 120, right: 24, backgroundColor: generalColor.other.bluepurple, borderRadius: 8, padding: 3, position: "absolute", bottom: 130 }}>
        <SelectCountry
          style={styles.dropdown(generalColor)}
          selectedTextStyle={styles.selectedTextStyle(generalColor)}
          placeholderStyle={styles.placeholderStyle}
          imageStyle={styles.imageStyle}
          iconStyle={styles.iconStyle}
          maxHeight={200}
          value={vehicleType}
          data={local_data}
          valueField="value"
          itemTextStyle={{ color: generalColor.other.white }}
          activeColor={generalColor.other.bluepurple}
          itemContainerStyle={{ backgroundColor: generalColor.other.bluepurple }}
          labelField="label"
          imageField="image"
          onChange={async (e) => {
            setVehicleType(e.value);
            await fetchParkingLots(currentRegion.latitude, currentRegion.longitude, e.value);
          }}
        />
      </View>
      {selectedParkingslot && (
        <ParkingLotModal
          parkingslot={selectedParkingslot}
          handleContinue={() => { }}
          isVisible={selectedParkingslot != null}
          onClose={() => {
            setSelectedParkingslot(null);
          }}
          navigation={navigation} 
        ></ParkingLotModal>
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
    textShadowOffset: { width: -1, height: 1 },
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
  },
  seperator: {
    width: 3,
    borderRadius: 24,
    height: 32,
    marginHorizontal: 8,
    backgroundColor: 'gray',
  },
  searchAreaButton: {
    position: 'absolute',
    top: 100,
    left: '50%',
    transform: [{ translateX: -75 }],
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchAreaButtonText: {
    color: '#4A55A2',
    fontSize: 14,
    fontWeight: '600',
  },
  dropdown: (generalColor) => ({
    backgroundColor: "blue",
  }),
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: (generalColor) => ({
    fontSize: 16,
    marginLeft: 8,
    color: "white",
  }),
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});