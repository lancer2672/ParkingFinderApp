import reservationAPI from '@src/api/reservation.api';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import Header from '@src/components/ModalHeader';
import useUserStore from '@src/store/userStore';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import ParkingHistoryItem from './component/ParkingHistoryItem.component';

const ParkingHistory = () => {
  const user = useUserStore(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [parkingHistoryItem, setParkingHistoryItem] = useState([]);
  const [parkingActiveHistoryItem, setActiveParkingHistoryItem] = useState([]);

  const fetchHistory = async(userId )=>{
    setIsLoading(true);
    const data =await reservationAPI.getUserRevations({userId});
    
    console.log("data",data);
      const mappedHistoryItems = mapReservationsToHistoryItems(data);
      const activeData = mappedHistoryItems.filter(
        item => item.status === 'PENDING' || item.endTime === null
      );
    console.log("activeData",activeData);
      
      const completedData = mappedHistoryItems.filter(
        item => item.status !== 'PENDING' && item.endTime !== null
      );
      setActiveParkingHistoryItem(activeData)
      setParkingHistoryItem(completedData)
      setIsLoading(false);
  }
  console.log("useR",user);
  useEffect(()=>{
    if (user){
      fetchHistory(user.id);
    }
  },[user])
  const activeData = [
    {
      parkingName: 'Abc',
      cost: 12,
      address: '123 Hoà hưng, phú nhuận, hcm',
      startTime: new Date('2024-11-05T13:12:05.000Z').toISOString(),
      endTime: null,
    },
  ];
  const completedData = new Array(4).fill({
    parkingName: 'Abc',
    cost: 12,
    address: '123 Hoà hưng, phú nhuận, hcm',
    startTime: new Date('2003-05-10T00:00:00.000Z').toISOString(),
    endTime: new Date('2003-05-10T07:12:05.000Z').toISOString(),
    totalCost: 12 * 24,
  });
  const mapReservationsToHistoryItems = (reservations) => {
    if (!reservations || !Array.isArray(reservations)) return [];
  
    return reservations.map(reservation => ({
      id: reservation.id,
      parkingName: reservation.parkingLot?.name || 'Unknown Parking Lot',
      cost: reservation.totalPrice || 0,
      address: reservation.parkingLot?.address || 'Unknown Address',
      startTime: reservation.startTime,
      endTime: reservation.status === 'PENDING' ? null : reservation.endTime,
      totalCost: reservation.totalPrice || 0,
      status: reservation.status,
      paymentMethod: reservation.payment?.paymentMethod || null,
      paymentStatus: reservation.payment?.paymentStatus || 'UNPAID',
      vehicleType: reservation.vehicleType || 'Unknown'
    }));
  };
  return (
    <View>
      <Header title={"Lịch sử đỗ xe"}></Header>

      {
        isLoading && <LoadingModal visible={true} onClose={()=>{}}></LoadingModal>
      }
      {
        !isLoading  &&
        (
 <>
      <SafeAreaView>
        <FlatList
          data={parkingActiveHistoryItem}
          ListHeaderComponent={() => (
            <Text
              style={{
                paddingHorizontal: 8,
                color: 'rgba(117, 127, 140, 1)',
                fontSize: 24,
                fontWeight: '600',
              }}>
              Bãi xe đang đỗ
            </Text>
          )}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          renderItem={({item}) => <ParkingHistoryItem active {...item} />}
          keyExtractor={(item, index) => index}
          ListFooterComponent={() => <View style={{height: 22}} />}
        />
      </SafeAreaView>
      <SafeAreaView>
        <FlatList
          ListHeaderComponent={() => (
            <Text
              style={{
                paddingHorizontal: 8,
                color: 'rgba(117, 127, 140, 1)',
                fontSize: 24,
                fontWeight: '600',
              }}>
              Bãi xe đã đỗ
            </Text>
          )}
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          data={parkingHistoryItem}
          renderItem={({item}) => <ParkingHistoryItem {...item} />}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
 </>
        )
      }
    </View>
  );
};

export default ParkingHistory;
