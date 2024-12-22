
import reservationAPI from '@src/api/reservation.api';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import { goBack } from '@src/navigation/NavigationController';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { RES_STATUS } from '@src/utils/constant';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, IconButton, Surface, Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

const ReservationHistoryScreen = ({ }) => {
  const [reservations, setReservations ]  = useState([])
  const [loading,setLoading] = useState(false);
  const user = useUserStore(state => state.user);

  const fetchRes = async () =>{
    setLoading(true);
    try{
      const res = await reservationAPI.getReservationsByUserId(user.id);
      setReservations(res);
    }catch(er){
      console.log('ERROR FETCH RESERVATION', er);
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{

      fetchRes()
    


  },[])
  // Find pending reservation
  const pendingReservation = reservations.find(res => res.status === 'PENDING');
  const otherReservations = reservations.filter(res => res.status !== 'PENDING');

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return '#FFA500';
      case RES_STATUS.CHECKED_OUT: return '#4CAF50';
      case RES_STATUS.CANCELLED: return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return 'clock-outline';
      case RES_STATUS.CHECKED_OUT: return 'check-circle-outline';
      case RES_STATUS.CANCELLED: return 'close-circle-outline';
      default: return 'help-circle-outline';
    }
  };
  const getStatusText= (status) =>{
    switch (status) {
      case RES_STATUS.PENDING: return 'Đang đặt chỗ';
      case RES_STATUS.CHECKED_IN: return 'Đã check in';
      case RES_STATUS.CHECKED_OUT: return 'Đã check out';
      case RES_STATUS.CANCELLED: return 'Đã hủy';
      default: return 'Không xác định';
    }
  }
  const handleCancelReservation= async(id) =>{
    Alert.alert(
      "Xác nhận hủy đặt chỗ",
      "Bạn có chắc chắn muốn hủy đặt chỗ này?",
      [
        {
          text: "Quay lại",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Hủy", onPress: async () => {
          setLoading(true);
          try{
            const res = await reservationAPI.updateUserReservation({
              reservationId: id,
              status: RES_STATUS.CANCELLED
            });
            if(res){
              setReservations(reservations.filter(res => res.id !== id));
            }
            fetchRes();
          }catch(er){
            console.log('ERROR CANCEL RESERVATION', er);
          }finally{
            setLoading(false);
          }
        }}
      ],
      { cancelable: false }
    );
  }
  const renderPendingReservation = () => {
    if (!pendingReservation) return null;

    return (
      <Surface style={styles.pendingSection} elevation={2}>
        <Text style={styles.sectionTitle}>Đang đặt chỗ</Text>
        <Card style={styles.pendingCard}>
          <Card.Content>
          <View style={styles.headerRow}>

            <View style={styles.row}>
              <Icon name="parking" size={24} color="#091E3D" />
              <Text style={styles.parkingName}>{pendingReservation.parkingLot.name}</Text>
            </View>
            <IconButton
              icon="close-circle"
              color="#E53935"
              size={24}
              onPress={() => handleCancelReservation(pendingReservation.id)}
              style={styles.cancelButton}
            />
            
            </View>
            <Text style={styles.address}>{pendingReservation.parkingLot.address}</Text>

            <View style={styles.row}>
              <Icon name="calendar-clock" size={20} color="#666" />
              <Text style={styles.time}>
                {formatDateTime(pendingReservation.startTime)}
              </Text>
            </View>

            <View style={styles.row}>
              <Icon name="car" size={20} color="#666" />
              <Text style={styles.vehicleType}>{pendingReservation.vehicleType}</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatPrice(pendingReservation.totalPrice)}</Text>

              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(pendingReservation.status) }]}>
                <Icon name={getStatusIcon(pendingReservation.status)} size={16} color="white" />
                <Text style={styles.statusText}>{getStatusText(pendingReservation.status)}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </Surface>
    );
  };

  const renderOtherReservations = () => {
    return (
      <View style={styles.historySection}>
       
        <Text style={styles.sectionTitle}>Lịch sử đặt chỗ</Text>
        {otherReservations.map((reservation) => (
          <Card key={reservation.id} style={styles.historyCard}>
            <Card.Content>
              <View style={styles.row}>
                <Icon name="parking" size={24} color="#091E3D" />
                <Text style={styles.parkingName}>{reservation.parkingLot.name}</Text>
              </View>

              <Text style={styles.address}>{reservation.parkingLot.address}</Text>

              <View style={styles.row}>
                <Icon name="calendar-clock" size={20} color="#666" />
                <Text style={styles.time}>
                  Đặt vé: {formatDateTime(reservation.startTime)}
                </Text>
              </View>
              {
                reservation.checkInTime &&
                <View style={styles.row}>
                  <Icon name="calendar-clock" size={20} color="#666" />
                  <Text style={styles.time}>
                    Check in: {formatDateTime(reservation.checkInTime)}
                  </Text>
                </View>
              }
              {
                reservation.checkOutTime &&
                <View style={styles.row}>
                  <Icon name="calendar-clock" size={20} color="#666" />
                  <Text style={styles.time}>
                    Check out: {formatDateTime(reservation.checkOutTime)}
                  </Text>
                </View>
              }

              <View style={styles.priceRow}>
                
                  <Text style={styles.price}>
                    
                    {reservation.payment ? formatPrice(reservation.payment.amount) : "" }
                </Text>
                
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(reservation.status) }]}>
                  <Icon name={getStatusIcon(reservation.status)} size={16} color="white" />
                  <Text style={styles.statusText}>{getStatusText(reservation.status)}</Text>

                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          // borderBottomWidth: 2,
          borderBottomColor: generalColor.primary,
        }}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
          style={{

          }}>
          <AntDesign name="arrowleft" size={24} color={generalColor.primary} />
        </TouchableOpacity>
        <Heading style={{color: generalColor.primary}}>Lịch sử đặt chỗ</Heading>
      </View>
      <LoadingModal visible={loading} onClose={()=>{}}></LoadingModal>
      {renderPendingReservation()}
      {renderOtherReservations()}
    </ScrollView>
  );
};
const Heading = styled(Text)`
  font-weight: bold;
  padding-left:4px;
  font-size: 24px;
  color: black;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pendingSection: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  historySection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#091E3D',
  },
  pendingCard: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  historyCard: {
    marginBottom: 12,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  parkingName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#091E3D',
  },
  address: {
    marginLeft: 32,
    marginBottom: 8,
    color: '#666',
  },
  time: {
    marginLeft: 8,
    color: '#666',
  },
  vehicleType: {
    marginLeft: 8,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#091E3D',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    marginLeft: 4,
    fontSize: 12,
  },
});

export default ReservationHistoryScreen;