import parkingLotAPI from '@src/api/parkingLot.api';
import ButtonComponent from '@src/components/Button';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import { navigate } from '@src/navigation/NavigationController';
import { generalColor } from '@src/theme/color';
import { center, row, rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';

import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import ReactNativeModal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import axiosClient from '@src/api/axiosClient';
import reservationAPI from '@src/api/reservation.api';
import useUserStore from '@src/store/userStore';
import { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Booking from './Booking';

const ParkingLotModal = ({
  parkingslot,
  isVisible,
  carType,
  handleContinue,
  onClose,
  navigation,
}) => {
  const [isBookingVisible, setIsBookingVisible] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [existingReservation, setExistingReservation] = useState(null);
  const [vehicleInfo, setParkingLotVehicleInfo] = useState();
  const user = useUserStore(state => state.user);
  const userId = user.id

  useEffect(() => {
       ( ()=>{
         axiosClient.get(`api/parking-lots/${parkingslot.id}/vehicles`).then((res)=>{
           const data = res.data.find((item)=>item.type == carType)
           if (data) {
            setParkingLotVehicleInfo(data)
           }
        }).catch((err)=>{
          console.log(err)
        }
        )
       })() 
    
  },[])
  useEffect(() => {
    const checkExistingReservation = async () => {
      try {
        console.log('Fetching reservations for user ID:', userId);
        const response = await reservationAPI.getReservationsByUserId(userId);
        console.log('Reservations fetched:', response.reservations);
        const reservation = response.find(
          (res) => res.parkingLotId === parkingslot.id && res.status === 'PENDING'
        );
        if (reservation) {
          console.log('Existing reservation found:', reservation);
          setExistingReservation(reservation);
          setBookingSuccess(true);
          setQrData(JSON.stringify(reservation));
          console.log('Existing reservation:', reservation);
          console.log('bookingSuccess:', bookingSuccess);
          console.log('Current parkingLot ID:', parkingslot.id);
          response.reservations.forEach((res) => {
            console.log('Reservation ID:', res.parkingLotId, 'Status:', res.status);
          });
        } else {
          console.log('No matching reservation found.');
          setExistingReservation(null);
          setBookingSuccess(false); // Không có reservation
          setQrData(null);
        }
      } catch (error) {
        console.error('Error checking existing reservation:', error);
      }
    };

    if (isVisible) {
      checkExistingReservation();
    }
  }, [isVisible, parkingslot.id, userId]);
  useEffect(() => {
    console.log('isVisible:', isVisible, 'bookingSuccess:', bookingSuccess);
  }, [isVisible, bookingSuccess]);
  const [freeSlot, setFreeSlot] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const callAgent = (phoneNumber = '0846303261') => {
    Linking.openURL(`tel:${parkingslot.agent?.phoneNumber}`);
  };

  const onContinue = () => {
    // onClose();
    if (freeSlot == 0) {
      showMessage({
        message: 'Không đủ chỗ trống',
        type: 'error',
      });
      return
    }
    handleContinue();
    setIsBookingVisible(true);
  };

  const fetchFreeSlots = async () => {
    try {
      setIsLoading(true);
      const data = await parkingLotAPI.getFreeSlots({
        parkingLotId: parkingslot.id,// this is error typo
        //checkInTime=2024-10-23T10:03:00
        checkIn: new Date().toISOString(),
        carType: carType,
      })
      if (data) {
        setFreeSlot(data);
      }

    } catch (er) {
      showMessage({
        message: 'Đã có lỗi xảy ra',
        type: 'error',
      });
    }
    finally {
      setIsLoading(false);
    }
  }
  const goToQRScreen = () => {
    navigation.navigate('DetailQr', { qrData });
  };
  const handleBookingSuccess = (qrData) => {
    setBookingSuccess(true);
    setQrData(qrData);
    setIsBookingVisible(false);
  };
  console.log('ParkingLotModal props:', parkingslot.imageUrls);
  useEffect(() => {
    if (isVisible) {
      fetchFreeSlots()
    }
  }, [isVisible]);


  return (
    <>
      <ReactNativeModal
        isVisible={isVisible}
        animationIn="slideInUp"
        backdropOpacity={0.5}
        useNativeDriver={true}
        animationOut="slideOutDown"
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        style={{ margin: 0 }}>
        <View style={styles.container}>
          {loading && <LoadingModal visible={true} onClose={() => { }}></LoadingModal>}
          {
            !loading &&
            <>

              <View style={row}>
                <View>
                  <Image
                    source={{ uri: parkingslot.imageUrls }}
                    style={styles.img}></Image>
                </View>
                <View
                  style={{
                    marginLeft: 12,
                    flex: 1,
                    justifyContent: 'flex-start',
                  }}>
                  <Text
                    style={{
                      ...textStyle.content.medium,
                      fontWeight: '500',
                      marginBottom: 8,
                      color: generalColor.primary,
                    }}>
                    {parkingslot.name} ({freeSlot} chỗ trống)
                  </Text>

                  <View style={{ ...row }}>
                    <Entypo name="location-pin" size={20}></Entypo>

                    <Text
                      numberOfLines={2}
                      style={{
                        ...textStyle.content.small,

                        flex: 1,
                      }}>
                      {parkingslot.address}
                    </Text>
                  </View>
                  {/* <Text
                    style={{
                      ...textStyle.content.small,
                      color: generalColor.strongprimary,
                      flex: 1,
                    }}>
                    4.3 (120 lượt đánh giá)
                  </Text> */}
                </View>
              </View>

              <View style={rowCenter}>
                <FontAwesome5 name="money-bill-wave" color="black" size={20}></FontAwesome5>
                <Text style={styles.txt}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vehicleInfo?.price || 0)} / giờ</Text>

                <TouchableOpacity
                  style={{
                    ...center,
                    marginLeft: 'auto',
                    borderRadius: 25,
                    backgroundColor: generalColor.primary,
                    width: 50,
                    height: 50,
                  }}
                  onPress={callAgent}>
                  <Feather name="phone-call" color="white" size={20}></Feather>
                </TouchableOpacity>
              </View>
              <ButtonComponent
                leftIcon={
                  <FontAwesome
                    name="commenting-o"
                    color={generalColor.white[100]}
                    size={24}></FontAwesome>
                }
                onPress={() => {
                  navigate('Review');
                  onClose();
                }}
                color={generalColor.other.bluepurple}
                style={{ marginVertical: 24, marginTop: 40, borderRadius: 12 }}
                text={'Xem đánh giá'}></ButtonComponent>
              <ButtonComponent
                onPress={bookingSuccess ? goToQRScreen : onContinue}
                color={generalColor.other.bluepurple}
                style={{ marginVertical: 24, marginTop: 0, borderRadius: 12 }}
                text={bookingSuccess ? 'Xem chi tiết' : 'Tiếp tục'}
              />
            </>
          }
        </View>


      </ReactNativeModal>

      <Booking
        isVisible={isBookingVisible}
        onClose={() => setIsBookingVisible(false)}
        route={{ params: { parkingslot, carType } }}

      />
    </>
  );
};

export default ParkingLotModal;

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    height: 340,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  txt: {
    ...textStyle.content.medium,
    color: 'black',
    marginLeft: 4,
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
});