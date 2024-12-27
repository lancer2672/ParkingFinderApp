import { useNavigation } from '@react-navigation/native';
import ButtonComponent from '@src/components/Button';
import { generalColor } from '@src/theme/color';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import QRCode from 'react-native-qrcode-svg';
const QrcodeScreen = ({route}) => {
  const {qrData} = route.params;
  const {parkingslot, reservation, duration, checkinTime} = JSON.parse(qrData);
  console.log('->>> qrData', qrData);
  const navigation = useNavigation();
  const handleBackToParkingLot = () => {
    navigation.navigate('Tabs');
  };
  useEffect(() => {
    if (qrData) {
      showMessage({
        message: 'Đặt chỗ thành công',
        type: 'success',
      });
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Đặt Chỗ</Text>
      <View style={styles.floatingContainer}>
        <Text style={styles.name}>{parkingslot.name}</Text>
        <Text style={styles.address}>{parkingslot.address}</Text>
      </View>
      <QRCode value={qrData} size={200} />
      {/* <View style={styles.floatingContainer}>
        <Text style={styles.infoLabel1}>Thông tin đặt chỗ</Text>
        <Text style={styles.infoLabel}>
          Thời gian Check-in: {new Date(checkinTime).toLocaleString()}
        </Text>
        {duration > 0 && (
          <Text style={styles.infoLabel}>Duration: {duration} minutes</Text>
        )}
      </View> */}
      <ButtonComponent
        onPress={handleBackToParkingLot}
        color={generalColor.other.bluepurple}
        style={{marginVertical: 24, marginTop: 40, borderRadius: 12}}
        text={'Quay về màn hình chính'}

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
    color: '#000',

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
    color: '#091E3D',
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

export default QrcodeScreen;
