import Divider from '@src/components/Divider';
import {Text, View, StyleSheet} from 'react-native';

const ParkingHistoryItem = ({
  active,
  parkingName,
  cost,
  address,
  startTime,
  endTime,
  totalCost,
}) => {
  const parsedStartTime = startTime ? new Date(startTime) : new Date();
  const parsedEndTime = endTime ? new Date(endTime) : new Date();

  const timeBetween = parsedEndTime.getTime() - parsedStartTime.getTime();
  const hourBetween = Math.floor(timeBetween / (3600 * 1000));
  const minuteBetween = Math.floor(
    (timeBetween - hourBetween * 3600 * 1000) / (60 * 1000),
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainInformation}>
        <View
          style={{
            backgroundColor: 'rgba(97, 62, 234, 1)',
            height: 'fit-content',
            padding: 4,
            borderRadius: 6,
          }}>
          <Text
            style={{
              color: 'rgba(255, 255, 255, 1)',
              fontSize: 16,
              fontWeight: '500',
            }}>
            {cost}k VND/giờ
          </Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: 'rgba(59, 65, 75, 1)',
              fontWeight: '500',
            }}>
            {parkingName}
          </Text>
          <Text
            style={{
              color: 'rgba(117, 127, 140, 1)',
              fontWeight: '400',
            }}>
            {address}
          </Text>
        </View>
      </View>
      <Divider />
      <View style={styles.personalInformation}>
        {active ? (
          <>
            <Text style={styles.personalInformationSubText}>Đã đỗ xe</Text>
            <Text style={styles.personalInformationMainText}>
              {hourBetween} giờ : {minuteBetween} phút
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.personalInformationSubText}>
              {parsedEndTime.toLocaleDateString()}
            </Text>
            <Text style={styles.personalInformationSubText}>
              {hourBetween} giờ : {minuteBetween} phút
            </Text>
            <Text style={styles.personalInformationMainText}>
              {totalCost}k VNĐ
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ParkingHistoryItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    rowGap: 8,
    boxShadow: '0px 8px 20px 0px rgba(122, 122, 123, 0.32)',
    backgroundColor: 'rgba(252, 252, 255, 1)',
    marginVertical: 10,
  },
  personalInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personalInformationSubText: {
    color: 'rgba(117, 127, 140, 1)',
  },
  personalInformationMainText: {
    color: 'rgba(117, 127, 140, 1)',
    fontWeight: 'bold',
  },
  mainInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
