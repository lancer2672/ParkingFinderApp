import {FlatList, SafeAreaView, View, Text, Pressable} from 'react-native';
import ParkingHistoryItem from './component/ParkingHistoryItem.component';
import Material from 'react-native-vector-icons/MaterialIcons';
import {goBack} from '@src/navigation/NavigationController';

const ParkingHistory = () => {
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

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingVertical: 12,
          marginBottom: 24,
          alignItems: 'center',
          gap: 18,
          paddingHorizontal: 12,
          backgroundColor: 'white',
        }}>
        <Pressable onPress={() => goBack()}>
          <Material name="arrow-back" size={24} />
        </Pressable>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '600',
            alignSelf: 'center',
          }}>
          Lịch sử đỗ xe
        </Text>
      </View>

      <SafeAreaView>
        <FlatList
          data={activeData}
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
          data={completedData}
          renderItem={({item}) => <ParkingHistoryItem {...item} />}
          keyExtractor={(item, index) => index}
        />
      </SafeAreaView>
    </View>
  );
};

export default ParkingHistory;
