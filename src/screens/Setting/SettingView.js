import reservationAPI from '@src/api/reservation.api';
import { navigate } from '@src/navigation/NavigationController';
import useUserStore from '@src/store/userStore';
import { generalColor } from '@src/theme/color';
import { useEffect, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { PaymentItem } from '../PaymentHistory/PaymentHistory';

const SettingView = () => {
  const resetUser = useUserStore(state => state.resetUser);
  const [payments,setPayments ] = useState([]);
  const user = useUserStore(state => state.user);
  const fetchPayments = async () => {
      try {
          const reservations = await reservationAPI.getReservationsByUserId(user.id);
          const payments = reservations.filter(t => t.payment != null).map(t => t.payment).slice(0, 3); // Limit to 3 payments
          setPayments(payments);
      } catch (error) {
          console.error("Failed to fetch payments", error);
      } 
  };
  useEffect(() => {
      fetchPayments();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        paddingTop: 8,
        gap: 8,
      }}>
                <Heading style={{color: generalColor.primary}}>Thanh toán</Heading>

      <View
        style={{
          flex: 1,
          marginTop: 12,
        }}>
        <TouchableHighlight
          onPress={() => {
            navigate('AddCardView');
          }}
          style={{
            borderRadius: 6,
          }}
          underlayColor={'#4f4e4e'}>
          <View
            style={{
              padding: 12,
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: '#333333',
            }}>
            <Material size={28} name="payment" color={generalColor.primary} />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '600',
                color: generalColor.primary,
              }}>
              Phương thức thanh toán
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => {
            navigate('PaymentHistory');
          }}
          style={{
            borderRadius: 6,
            marginBottom:12,
          }}
          underlayColor={'#4f4e4e'}>
          <View
            style={{
              padding: 12,
              borderRadius: 6,
              display: 'flex',
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
              backgroundColor: 'white',
              borderColor: '#333333',
            }}>
            <Material size={28} name="history" color={generalColor.primary} />
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                fontWeight: '600',
                color: generalColor.primary,
              }}>
              Lịch sử thanh toán
            </Text>
          </View>
        </TouchableHighlight>

              <View>
                <Text
                style={{
                  fontSize: 16,
                  textAlign: 'left',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  fontWeight: '600',
                  color: generalColor.primary,
                }}>
                Giao dịch gần đây
              </Text>
              </View>
        {
          payments.map((payment, index) => <PaymentItem key={index} payment={payment}> </PaymentItem>)
        }
      </View>
    </View>
  );
};

export default SettingView;
const Heading = styled(Text)`
  font-weight: bold;
  padding-top:12px;
  padding-left:12px;
  font-size: 24px;
  color: black;
`;