import {FlatList, SafeAreaView, View, Text, StyleSheet} from 'react-native';
import ParkingHistoryItem from './component/ParkingHistoryItem.component';

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
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={activeData}
          ListHeaderComponent={() => (
            <Text
              style={{
                paddingHorizontal: 20,
                marginBottom: 8,
                color: 'rgba(117, 127, 140, 1)',
                fontSize: 16,
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
                paddingHorizontal: 20,
                marginBottom: 8,
                color: 'rgba(117, 127, 140, 1)',
                fontSize: 16,
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

const styles = StyleSheet.create({
  container: {
    padding: '',
  },
});

export default ParkingHistory;
