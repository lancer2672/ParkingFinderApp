import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { parkingslotsMock } from '@src/mock/mock'; // Ensure correct import
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import ReactNativeModal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';

const Booking = ({ route, isVisible, onClose }) => {
  const { parkingslot } = route.params || {};
  const [duration, setDuration] = useState(0);
  const [checkinTime, setCheckinTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || checkinTime;
    setShowTimePicker(false);
    setCheckinTime(currentTime);
  };

  const handleBooking = () => {
    setShowQRCode(true);
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
        <Text style={styles.title}>{parkingslot.name}</Text>
        <Text style={styles.address}>{parkingslot.address}</Text>
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
            <Button title="Select Check-in Time" onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
              <DateTimePicker
                value={checkinTime}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
        </View>
        <Button title="Booking" onPress={handleBooking} />
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
        <Button title="Close" onPress={onClose} />
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
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
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