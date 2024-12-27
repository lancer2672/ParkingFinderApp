import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ParkingInfo = ({ parkingData, onCancel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parkingData?.parkingLot?.name}</Text>
      <Text style={styles.address}>{parkingData?.parkingLot?.address}</Text>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Thời gian: </Text>
        <Text>{new Date(parkingData?.startTime).toLocaleString()}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.label}>Giá: </Text>
        <Text>{parkingData?.totalPrice?.toLocaleString()}đ / ngày</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    color: '#091E3D',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    color: '#666',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  label: {
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    textAlign: 'center',
  }
});

export default ParkingInfo;