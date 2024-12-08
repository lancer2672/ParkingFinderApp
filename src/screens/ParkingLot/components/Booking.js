import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import reservationAPI from '@src/api/reservation.api';
import ButtonComponent from '@src/components/Button';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import ReactNativeModal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
const Booking = ({ route, isVisible, onClose }) => {
  const { parkingslot, carType } = route.params || {};
  const [duration, setDuration] = useState(0);
  const [checkinTime, setCheckinTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const  user = useUserStore(state => state.user);
  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || checkinTime;
    setShowTimePicker(false);
    setCheckinTime(currentTime);
  };

  
  const handleBooking =async () => {
    try{
      //  userId, parkingLotId, startTime, vehicleType
      setLoading(true);
      const res = await reservationAPI.createReservation({
        userId: user?.id ,
        parkingLotId: parkingslot.id,
        startTime: checkinTime.toISOString(),
        vehicleType: carType,
      })
      const qrData = JSON.stringify({
        parkingslot,
        reservation: res,
      });
      navigation.navigate('QrcodeScreen', { qrData });
    }
    catch(er){
       showMessage({
        message: "Đã có lỗi xảy ra",

        type: 'error',
      });
    } finally{
      setLoading(false);
    }
  };

  if (!parkingslot) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No parking slot selected.</Text>
      </View>
    );
  }

  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationIn="slideInUp"
      backdropOpacity={0.5}
      useNativeDriver={true}
      animationOut="slideOutDown"
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.floatingContainer}>
          <Text style={styles.title}>{parkingslot.name}</Text>
          <Text style={styles.address}>{parkingslot.address}</Text>
        </View>
        <View style={styles.floatingContainer}>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Estimation Duration Time: {duration} hours</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={12}
              step={0.5}
              value={duration}
              onValueChange={setDuration}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#1EB1FC"
            />
          </View>

          <View style={styles.timePickerContainer}>
            <Text style={styles.timePickerLabel}>Check-in Time: {checkinTime.toLocaleTimeString()}</Text>
            <TouchableOpacity onPress={() => setShowTimePicker(true)}>
              <Icon name="edit" size={30} color="#1EB1FC" />
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={checkinTime}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
          <Text>*Lưu ý booking sẽ tự động hủy sau 30s </Text>

        </View>
        <View style={{flexDirection:"row",marginVertical: 24, marginTop: 40, justifyContent:"flex-end" }}>

          <ButtonComponent
           onPress={onClose}
           color={generalColor.other.bluepurple}
           style={{ borderRadius: 12 }}
           text={'Close'}
         />
        <ButtonComponent
          onPress={handleBooking}
          color={generalColor.other.bluepurple}
          style={{ marginLeft:12, borderRadius: 12 }}
          text={'Booking'}
        />
        </View>
        {loading && <LoadingModal />}
        {showQRCode && (
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={JSON.stringify({
                parkingslot,
                duration,
                checkinTime: checkinTime.toISOString(),
              })}
              size={200}
            />
          </View>
        )}
      
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContainer: {
    width: 340,
  
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: 'gray',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  floatingContainer: {
    marginTop: 16,
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timePickerContainer: {
    alignItems: 'center',
  },
  timePickerLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  qrCodeContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});

export default Booking;