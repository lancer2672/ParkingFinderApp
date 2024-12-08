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
    const parsedEndTime = endTime
      ? new Date(endTime)
      : new Date();
  const parsedStartTime = startTime
      ? new Date(startTime)
      : new Date();
  const timeBetween = new Date(parsedEndTime).getTime() - new Date(parsedStartTime).getTime();
  const minuteBetween = Math.floor(timeBetween / (60 * 1000));
  console.log(">>>>>parsedEndTime",parsedEndTime, parsedStartTime,timeBetween,minuteBetween);


  const getPaymentStatusStyles = (status) => {
    switch (status) {
      case 'COMPLETED':
        return {
          backgroundColor: '#E6F4EA', // Light green
          color: '#34A853',       // Dark green
          padding:8,
          borderRadius: 6,
          borderColor: '#34A853'
        };
      case 'FAILED':
        return {
          backgroundColor: '#FDE7E9', // Light red
          color: '#EA4335',       // Dark red
          padding:8,
          borderRadius: 6,
          borderColor: '#EA4335'
        };
      case 'CANCELLED':
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
  const getTextPaymentStatusStyles = (status) => {
    switch (status) {
      case 'COMPLETED':
        return {
        
          color: '#34A853',       // Dark green
      
        };
      case 'FAILED':
        return {
          color: '#EA4335',       // Dark red
        
        };
      case 'CANCELLED':
        return {
          color: '#5F6368',       // Dark gray
       
        };
      default:
        return {
      
          color: '#1976D2',       // Dark blue
         
        };
    }
  };
  
  const PaymentStatusBadge = ({ status }) => {
    const { 
      backgroundColor, 
      color, 
      icon, 
      borderColor 
    } = getPaymentStatusStyles(status);
  
    return (
      <View 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 6,
          borderWidth: 1,
          borderColor,
          alignSelf: 'flex-start'
        }}
      >
        <Feather 
          name={icon} 
          size={16} 
          color={color} 
          style={{ marginRight: 4 }}
        />
        <Text 
          style={{ 
            color: color, 
            fontWeight: '600',
            fontSize: 12
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
        </Text>
      </View>
    );
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.mainInformation}>
        {
          props.payment &&

        <View
          style={getPaymentStatusStyles(props.paymentStatus)}>
          <Text
            style={[{
              // color: 'rgba(255, 255, 255, 1)',
              fontSize: 16,
              fontWeight: '500',
             
            }, getTextPaymentStatusStyles(props.paymentStatus)]}>
            {cost}k VND/g  iờ
          </Text>
        </View>
        }
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
              {parsedStartTime.toLocaleString()}
            </Text>
            {
              props.status == RES_STATUS.CHECKED_OUT && (
                <Text style={styles.personalInformationMainText}>
                  {minuteBetween} phút
                </Text>)
            }
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
