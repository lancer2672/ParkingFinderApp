import Geolocation from '@react-native-community/geolocation';
import parkingLotAPI from '@src/api/parkingLot.api';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import useParkingLotStore from '@src/store/useParkinglotStore';
import { generalColor } from '@src/theme/color';
import textStyle from '@src/theme/text';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
    image: require('../../assets/icons/car.png'),
  },
  {
    value: 'MOTORCYCLE',
    label: 'Xe máy',
    image: require('../../assets/icons/motorbike.png'),
  },
];

const ParkingLotsMap = ({initialLocation, navigation}) => {
  const [parkingslots, setParkingslots] = useState([]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [loading,setLoading] = useState(false);
  const [selectedParkingslot, setSelectedParkingslot] = useState(null);
  const [isMapMoved, setIsMapMoved] = useState(false);
  const [vehicleType, setVehicleType] = useState('CAR');
  const [currentRegion, setCurrentRegion] = useState(null);
  const mapRef = useRef(null);
  const lastFetchedLocation = useRef(null);
  const [fetchError, setFetchError] = useState(false);
  const [showVNPay, setShowVNPay] = useState(false);
  const setParkingLot = useParkingLotStore(state => state.setParkingLot);

  const paymentUrl =
    'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?vnp_Amount=23700000&vnp_BankCode=NCB&vnp_Command=pay&vnp_CreateDate=20241118002952&vnp_CurrCode=VND&vnp_ExpireDate=20241118004452&vnp_IpAddr=0%3A0%3A0%3A0%3A0%3A0%3A0%3A1&vnp_Locale=vn&vnp_OrderInfo=Thanh+toan+don+hang%3A44246705&vnp_OrderType=other&vnp_ReturnUrl=http%3A%2F%2F192.168.150.104%3A8080%2Fapi%2Fv1%2Fpayment%2Fvn-pay-callback&vnp_TmnCode=58X4B4HP&vnp_TxnRef=62075358&vnp_Version=2.1.0&vnp_SecureHash=637d369f7eb2e2e21f5aa0b0c9d98e07b0f87323687121291038b7594a2b0b4ac0f40e134f3cd565eb1eb321ea123869b2be1d4bdf9bb6e778be2250be4d868f';

  const fetchParkingLots = useCallback(
    async (latitude, longitude, type) => {
      setLoading(true)
      if (fetchError) return;
      try {
        const response = await parkingLotAPI.getParkingLotsInRegion({
          latitude,
          longitude,
          radius: RADIUS_KM,
          type,
        });
        lastFetchedLocation.current = {latitude, longitude};
        setParkingslots(response);
      } catch (error) {
        console.error('Error fetching parking slots:', error);
        setFetchError(true);
        Alert.alert('Lỗi', 'Không thể tải dữ liệu bãi đỗ xe');
      } finally {
        setLoading(false);
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
      fetchParkingLots(
        currentRegion.latitude,
        currentRegion.longitude,
        vehicleType,
      );
    }
  };

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
    // if (!details.isGesture) {
    //   return;
    // }
    // if (
    //   Math.abs(newRegion.latitude - currentRegion.latitude) < 0.0001 &&
    //   Math.abs(newRegion.longitude - currentRegion.longitude) < 0.0001
    // ) {
    //   return;
    // }
    // console.log('selected parkingslot', selectedParkingslot == null);
    // if (selectedParkingslot == null) {
    //   return;
    // }
    // setCurrentRegion(() => newRegion);
    // setIsMapMoved(true);
  };
  console.log('parkingslots', selectedParkingslot == null);
  return (
    <View style={styles.container}>
       {loading && <LoadingModal />}
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        style={styles.map}
        onRegionChangeComplete={handleRegionChange}
        region={currentRegion}>
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
              setParkingLot(parkingslot);
              setShowVNPay(true);
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

      <View
        style={[
          styles.searchContainer,
          {position: 'absolute', top: 40, left: 24, right: 24},
        ]}>
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
            onPress={handleSearchThisArea}>
            <Text style={styles.searchAreaButtonText}>
              Tìm kiếm khu vực này
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{
          width: 120,
          right: 24,
          backgroundColor: generalColor.other.bluepurple,
          borderRadius: 8,
          padding: 3,
          position: 'absolute',
          bottom: 130,
        }}>
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
          itemTextStyle={{color: generalColor.other.white}}
          activeColor={generalColor.other.bluepurple}
          itemContainerStyle={{backgroundColor: generalColor.other.bluepurple}}
          labelField="label"
          imageField="image"
          onChange={async e => {
            console.log('value', e);
            setVehicleType(e.value);
            await fetchParkingLots(
              currentRegion.latitude,
              currentRegion.longitude,
              e.value,
            );
          }}
        />
      </View>
      {selectedParkingslot && (
        <ParkingLotModal
          parkingslot={selectedParkingslot}
          carType={vehicleType}
          handleContinue={() => {}}
          isVisible={selectedParkingslot != null}
          onClose={() => {
            setSelectedParkingslot(null);
          }}
          navigation={navigation}></ParkingLotModal>
      )}

      {/* <VNPayModal
        visible={showVNPay}
        paymentUrl={paymentUrl}
        onPaymentFailure={() => {}}
        onPaymentSuccess={() => {
          Alert.alert('Thành công', 'Thanh toán thành công');
        }}
        onClose={() => {
          console.log(':D');
          setShowVNPay(false);
        }}></VNPayModal> */}
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
    transform: [{translateX: -75}],
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
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 24,
    right: 24,
    height: 48,
  },
  dropdown: generalColor => {
    // height: 50,
    backgroundColor: 'blue';
  },
  imageStyle: {
    width: 24,
    height: 24,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: generalColor => ({
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
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
