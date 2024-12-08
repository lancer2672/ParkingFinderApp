import Divider from '@src/components/Divider';
import { RES_STATUS } from '@src/utils/constant';
import { StyleSheet, Text, View } from 'react-native';

const ParkingHistoryItem = ({
  active,
  parkingName,
  cost,
  address,
  startTime,
  endTime,
  totalCost,
  ...props
}) => {

  const timeBetween = new Date(endTime).getTime() - new Date(startTime).getTime();
  const minuteBetween = Math.floor(timeBetween / (60 * 1000));
  console.log(">>>>>parsedEndTime",props,timeBetween,minuteBetween);

  const getTextColor = (status) => {
    switch (status) {
      case RES_STATUS.CHECKED_OUT:
        return '#34A853'; // Dark green
      case RES_STATUS.CANCELLED:
        return '#EA4335'; // Dark red  
      case RES_STATUS.PENDING:
        return '#5F6368'; // Dark gray
      default:
        return '#1976D2'; // Dark blue
    }
  }
  const getStatusStyles = (status) => {
    switch (status) {
      case RES_STATUS.CHECKED_OUT:
        return {
          backgroundColor: '#E6F4EA', // Light green
          color: '#34A853',       // Dark green
          padding:8,
          borderRadius: 6,
          borderColor: '#34A853'
        };
      case RES_STATUS.CANCELLED:
        return {
          backgroundColor: '#FDE7E9', // Light red
          color: '#EA4335',       // Dark red
          padding:8,
          borderRadius: 6,
          borderColor: '#EA4335'
        };
      case RES_STATUS.PENDING:
        return {
          backgroundColor: '#F1F3F4', // Light gray
          color: '#5F6368',       // Dark gray
          padding:8,
      borderRadius: 6,
          borderColor: '#5F6368'
        };
      default:
        return {
          backgroundColor: '#E3F2FD', // Light blue
          color: '#1976D2',       // Dark blue
          padding:8,
      borderRadius: 6,
          borderColor: '#1976D2'
        };
    }
  };

  
  const StatusBadge = ( status ) => {

    console.log("status",status);
    return (
      <View 
        style={[{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 6,
          alignSelf: 'flex-start'
        }, getStatusStyles(props.status)]}
      >
        <Text 
          style={{ 
            fontWeight: '600',
            fontSize: 12,
            color :getTextColor(status)
          }}
        > 
           {status}
        </Text>
      </View>
    );
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.mainInformation}>
         {StatusBadge(props.status)}
    

        <View
          style={{
            marginLeft:"auto",
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
            <Text style={styles.personalInformationSubText}>Đang đỗ xe</Text>
     
            <Text style={styles.personalInformationMainText}>
              {minuteBetween} phút
            </Text>
          
          </>
        ) : (
          <>
            <Text style={styles.personalInformationSubText}>
              {new Date(startTime).toLocaleString()}
            </Text>
            {
              props.status == RES_STATUS.CHECKED_OUT && (
                <Text style={styles.personalInformationMainText}>
                  {minuteBetween} phút
                </Text>)
            }
            {
              props.payment  && 

            <Text style={styles.personalInformationMainText}>
              {totalCost}k VNĐ
            </Text>
            }
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
