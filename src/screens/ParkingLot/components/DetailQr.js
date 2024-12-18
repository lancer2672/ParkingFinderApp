import { useNavigation } from '@react-navigation/native';
import ButtonComponent from '@src/components/Button';
import { generalColor } from '@src/theme/color';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import QRCode from 'react-native-qrcode-svg';
import reservationAPI from '@src/api/reservation.api';

const DetailQr = ({ route }) => {
  const userId = 6;
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await reservationAPI.getReservationsByUserId(userId);
        const reservations = response || [];
        const reservation = reservations.find(
          (res) => res.status === 'PENDING'
        );
        if (reservation) {
          setQrData(JSON.stringify(reservation));
          showMessage({
            message: 'Đặt chỗ thành công',
            type: 'success',
          });
        } else {
          showMessage({
            message: 'No pending reservations found',
            type: 'warning',
          });
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
        showMessage({
          message: 'Error fetching reservations',
          type: 'danger',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleBackToParkingLot = () => {
    navigation.navigate('Tabs');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!qrData) {
    return (
      <View style={styles.container}>
        <Text>No QR data available</Text>
        <ButtonComponent
          onPress={handleBackToParkingLot}
          color={generalColor.other.bluepurple}
          style={{ marginVertical: 24, marginTop: 40, borderRadius: 12 }}
          text={'Back to Parking Lot'}
        />
      </View>
    );
  }

  const parsedQrData = JSON.parse(qrData);
  const { parkingLot, startTime, vehicleType, totalPrice } = parsedQrData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your QR Code</Text>
      <View style={styles.floatingContainer}>
        <Text style={styles.name}>{parkingLot.name}</Text>
        <Text style={styles.address}>{parkingLot.address}</Text>
      </View>
      <QRCode value={qrData} size={200} />
      <View style={styles.floatingContainer}>
        <Text style={styles.infoLabel1}> Booking Detail</Text>
        <Text style={styles.infoLabel}>
          Check-in Time: {new Date(startTime).toLocaleString()}
        </Text>
        <Text style={styles.infoLabel}>Vehicle Type: {vehicleType}</Text>
        <Text style={styles.infoLabel}>Total Price: {totalPrice}</Text>
      </View>
      <ButtonComponent
        onPress={handleBackToParkingLot}
        color={generalColor.other.bluepurple}
        style={{ marginVertical: 24, marginTop: 40, borderRadius: 12 }}
        text={'Back to Parking Lot'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  floatingContainer: {
    marginTop: 16,
    width: '80%',
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
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: 'gray',
  },
  infoLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  infoLabel1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DetailQr;